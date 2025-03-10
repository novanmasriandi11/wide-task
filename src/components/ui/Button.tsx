import { Loader2 } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
   size?: 'sm' | 'md' | 'lg';
   fullWidth?: boolean;
   isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
   children,
   variant = 'primary',
   size = 'md',
   fullWidth = false,
   isLoading = false,
   className = '',
   disabled,
   ...props
}) => {
   const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50';
   const variantClasses = {
      primary  : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
      outline  : 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800',
      danger   : 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800',
      success  : 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
   };

   const sizeClasses = {
      sm: 'text-xs px-2 py-1',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3'
   }

   const widthClasses = fullWidth ? 'w-full' : '';

   const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`;

   return (
      <button
         className={combinedClasses}
         disabled = {disabled || isLoading}
         {...props}
      >
         {isLoading ? (
            <>
               <Loader2 className="animate-spin mr-2 h-6 w-6" /> Processing...
            </>
         ): (
            children 
         )}
      </button>
   )
}

export default Button;