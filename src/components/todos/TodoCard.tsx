import { AlertCircle, CheckCircle } from "lucide-react";
import { Todo } from "../../types";
import { Card, CardContent, CardFooter } from "../ui/Card";

interface TodoCardProps {
   todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => { 
   return (
      <Card className="h-full transition-all hover:shadow-lg">
         <CardContent className=" border-t-2 ">
            <div className="flex items-start space-x-3">
               {todo.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
               ) : (
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
               )}
               <p className="text-gray-700 dark:text-gray-300">{todo.title}</p>
            </div>
         </CardContent>
         <CardFooter className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">User ID: {todo.userId}</span>
            <span className="text-gray-500 dark:text-gray-400">Task ID: {todo.id}</span>
         </CardFooter>
      </Card>
   )
}

export default TodoCard;