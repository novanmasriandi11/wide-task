import { Loader2 } from "lucide-react";
import { Todo } from "../../types";
import TodoCard from "./TodoCard";

interface TodoListProps {
   todos    : Todo[];
   isLoading: boolean;
   error    : string | null;
}

const TodoList: React.FC<TodoListProps> = ({ todos, isLoading, error }) => { 
   if (isLoading) {
      return (
         <div className="flex justify-center items-center h-64">
            <Loader2 className="w-7 h-7 animate-spin text-gray-500 dark:text-gray-400" />
         </div>
      )
   }

   if (error) {
      return (
         <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
            <p>Error: {error}</p>
         </div>
      )
   }

   if (todos.length === 0) {
      return (
         <div className="bg-gray-50 dark:bg-gray-900/50 p-8 text-center rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No todos found</p>
         </div>
      )
   }

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {todos.map(todo => (
            <TodoCard key={todo.id} todo={todo} />
         ))}
      </div>
   )
}

export default TodoList;