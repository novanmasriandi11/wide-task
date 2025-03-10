interface CardProps { 
   children: React.ReactNode;
   className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => { 
   return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
         {children}
      </div>
   )
}

interface CardHeaderProps { 
   children: React.ReactNode;
   className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
   return (
      <div className={`px-4 py-3 border-b border-gray-200 dark:border-gray-700 ${className}`}>
         {children}
      </div>
   )
}

interface CardTitleProps {
   children: React.ReactNode;
   className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => { 
   return (
      <h3 className={`text-lg font-medium text-gray-900 dark:text-white ${className}`}>
         {children}
      </h3>
   )
}

interface CardContentProps {
   children: React.ReactNode;
   className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
   return (
      <div className={`p-4 ${className}`}>
         {children}
      </div>
   )
}

interface CardFooterProps {
   children: React.ReactNode;
   className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
   return (
      <div className={`px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 ${className}`}>
         {children}
      </div>
   )
}