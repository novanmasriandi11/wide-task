import { useTodos } from "../../hooks/useTodos";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";

const TodoContainer: React.FC = () => {
   const { todos, isLoading, error, filter, changeFilter, refreshTodos } = useTodos();

   return (
      <Card className="w-full">
         <CardHeader>
            <div className="flex items-center justify-between">
               <CardTitle>Todo List</CardTitle>
               <div className="text-sm text-gray-500 dark:text-gray-400">
                  {!isLoading && !error && `${todos.length} tasks`}
               </div>
            </div>
         </CardHeader>
         <CardContent>
            <TodoFilter
               currentFilter  = {filter}
               onFilterChange = {changeFilter}
               onRefresh      = {refreshTodos}
               isLoading      = {isLoading}
            />
            <TodoList
               todos={todos}
               isLoading={isLoading}
               error={error}
            />
         </CardContent>
      </Card>
   )
}

export default TodoContainer;