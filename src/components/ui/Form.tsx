import React, { FormHTMLAttributes, ReactNode, useState } from "react";
import { ZodError, ZodSchema } from "zod";

export interface FieldError {
   message: string;
}

export interface FormErrors{
   [key: string]: FieldError;
}

interface FormProps<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>{
   children: ReactNode;
   onSubmit: (data: T) => void;
   schema?: ZodSchema<T>;
   className?: string;
}

export const Form = <T extends Record<string, unknown>> ({
   children,
   onSubmit,
   schema,
   className = '',
   ...props
}:FormProps<T>) => { 
   const [errors, setErrors] = useState<FormErrors>({});

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrors({});
      
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries()) as unknown as T;
      
      if (schema) {
         try {
            const validateData = schema.parse(data);
            onSubmit(validateData);
         } catch (error: unknown) {
            if (error instanceof ZodError) {
               const zodErrors: FormErrors = {};
               error.errors.forEach((err) => {
                  if (err.path && err.path.length > 0) {
                     const field = err.path[0].toString();
                     zodErrors[field] = { message: err.message };
                  }
               });
               setErrors(zodErrors);
            }
         }
      } else {
         onSubmit(data);
      }
   };

   const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
         const childProps = child.props as { name?: string };
         if (childProps.name && errors[childProps.name]) {
            return React.cloneElement(child, {
               error: errors[childProps.name],
            } as React.JSX.IntrinsicAttributes & { error?: FieldError});
         }
      }
      return child;
   });

   return (
      <form
         className={`space-y-4 ${className}`}
         onSubmit={handleSubmit}
         noValidate
         {...props}
      >
         {childrenWithProps}
      </form>
   )
}

export default Form;