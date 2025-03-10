import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface DialogProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   children: React.ReactNode;
   autoCloseTime?: number;
}

const Dialog: React.FC<DialogProps> = ({
   isOpen,
   onClose,
   title,
   children,
   autoCloseTime,
}) => {
   const dialogRef = useRef<HTMLDivElement>(null);
   const timerRef = useRef<number | null>(null);

   useEffect(() => {
      if (isOpen && autoCloseTime) {
         timerRef.current = window.setTimeout(() => {
            onClose();
         }, autoCloseTime);
      }

      return () => {
         if (timerRef.current) {
            clearTimeout(timerRef.current);
         }
      };
   }, [isOpen, autoCloseTime, onClose]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
            onClose();
         }
      };

      if (isOpen) {
         document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isOpen, onClose]);

   useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            onClose();
         }
      };

      if (isOpen) {
         document.addEventListener('keydown', handleEscapeKey);
      }

      return () => {
         document.removeEventListener('keydown', handleEscapeKey);
      };
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div ref={dialogRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 mx-4 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
               <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <X className="w-5 h-5" />
               </button>
            </div>

            {autoCloseTime && (
               <div className="mb-4">
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 shrink-animation" style={{animationDuration: `${autoCloseTime}ms`}}></div>
                  </div>
               </div>
            )}
            <div>{ children }</div>
         </div>
      </div>
   )
}

export default Dialog;