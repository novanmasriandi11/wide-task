import { RefreshCcw } from "lucide-react";

type FilterType = 'all' | 'completed' | 'pending';

interface TodoFilterProps {
   currentFilter : FilterType;
   onFilterChange: (filter: FilterType) => void;
   onRefresh     : () => void;
   isLoading     : boolean;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
   currentFilter,
   onFilterChange,
   onRefresh,
   isLoading
}) => { 
   const filters: { label: string, value: FilterType }[] = [
      { label: 'All', value: 'all' },
      { label: 'Completed', value: 'completed' },
      { label: 'Pending', value: 'pending' }
   ];

   return (
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
         <div className="flex items-center space-x-2">
            {filters.map((filter) => (
               <button
                  key={filter.value}
                  onClick={() => onFilterChange(filter.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                     currentFilter === filter.value
                     ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
               >
                  {filter.label}
               </button>
            ))}
         </div>
         <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
         >
            <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
         </button>
      </div>
   )
}

export default TodoFilter;