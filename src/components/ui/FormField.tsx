import { forwardRef, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, useEffect, useState } from "react";
import { FieldError } from "./Form";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type InputSelectAttributes = Partial<InputHTMLAttributes<HTMLInputElement>> &
   Partial<SelectHTMLAttributes<HTMLSelectElement>> & {
      label: string;
      name: string;
      error?: FieldError;
      required?: boolean;
      showPasswordToggle?: boolean;
      as?: 'input' | 'select';
      children?: ReactNode;
   }

const FormField = forwardRef<HTMLInputElement | HTMLSelectElement, InputSelectAttributes>(
   ({ label, name, error, required, type = 'text', className = '', showPasswordToggle = false, as = 'input', children, onChange, onBlur, ...props }, ref) => {
      const [showPassword, setShowPassword] = useState(false);
      const [localError, setLocalError] = useState<FieldError | undefined>(error);
      const [touched, setTouched] = useState(false);

      const isPasswordField = type === 'password' && showPasswordToggle;

      const toggleVisibility = () => {
         setShowPassword((showPassword) => !showPassword);
      };

      const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

      useEffect(() => {
         setLocalError(error);
      }, [error]);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         if (touched && localError) {
            setLocalError(undefined);
         }

         if (onChange) {
            onChange(e);
         }
      };

      const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
         if (touched && localError) {
           setLocalError(undefined);
         }
         if (onChange) {
           onChange(e);
         }
       };

      const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
         setTouched(true);

         if (onBlur) {
            onBlur(e);
         }
      };

      const handleSelectBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
         setTouched(true);

         if (onBlur) {
            onBlur(e);
         }
      };

      const baseInputClass = `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
         ${localError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
         }
         ${isPasswordField ? 'pr-10' : ''}
         ${className}
         dark:bg-gray-800 dark:text-white`;

      return (
         <div className="mb-4">
            <label
               htmlFor={name}
               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
               {label}{required && <span className="text-red-500"> * </span>}
            </label>
            <div className={`relative ${isPasswordField ? 'flex items-center' : ''}`}>
               {as === 'input' ? (
                  <input
                     ref={ref as React.ForwardedRef<HTMLInputElement>}
                     id={name}
                     name={name}
                     type={inputType}
                     className={baseInputClass}
                     onChange={handleInputChange}
                     onBlur={handleInputBlur}
                     {...props as InputHTMLAttributes<HTMLInputElement>}
                  />
               ) : (
                  <select
                     ref={ref as React.ForwardedRef<HTMLSelectElement>}
                     id={name}
                     name={name}
                     className={baseInputClass}
                     onChange={handleSelectChange}
                     onBlur={handleSelectBlur}
                     {...props as SelectHTMLAttributes<HTMLSelectElement>}
                  >
                     {children}
                  </select>
               )}

               {isPasswordField && (
                  <button
                     type="button"
                     onClick={toggleVisibility}
                     className="absolute right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                     tabIndex={-1}
                  >
                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
               )}
            </div>
            {localError && (
               <p className="mt-1 text-sm text-red-600 dark:text-red-400">{localError.message}</p>
            )}
         </div>
      );
   }
);

FormField.displayName = 'FormField';
export default FormField;