import { useCallback, useEffect, useState } from "react";
import { Todo } from "../types";

interface TodosState {
   todos: Todo[];
   filteredTodos: Todo[];
   isLoading: boolean;
   error: string | null;
}

type FilterType = "all" | "completed" | "pending";

export const useTodos = () => {
   const [state, setState] = useState<TodosState>({
      todos: [],
      filteredTodos: [],
      isLoading: true,
      error: null,
   });

   const [filter, setFilter] = useState<FilterType>("all");

   const applyFilter = useCallback((todos: Todo[], filterType: FilterType): Todo[] => {
      switch (filterType) {
         case "completed":
            return todos.filter((todo) => todo.completed);
         case "pending":
            return todos.filter((todo) => !todo.completed);
         case "all":
         default:
            return todos;
      }
   }, []);

   const fetchTodos = useCallback(async () => {
      setState((prev: TodosState) => ({ ...prev, isLoading: true, error: null }));

      try {
         // console.log('Fetching...')
         const response = await fetch("https://jsonplaceholder.typicode.com/todos");

         if (!response.ok) {
            throw new Error(`Failed to fetch todos: ${response.statusText}`);
         }

         const data: Todo[] = await response.json();
         // console.log('Todos', data.length);

         const filteredData = applyFilter(data, filter);
         // console.log('Filtered', filteredData.length)

         setState((prev: TodosState) => ({
            ...prev,
            todos: data,
            filteredTodos: filteredData,
            isLoading: false,
         }));
      } catch (error) {
         console.error('Error fetching', error)
         setState((prev: TodosState) => ({
            ...prev,
            error: error instanceof Error ? error.message : "An unknown error occurred",
            isLoading: false
         }));
      }
   }, [filter, applyFilter]);



   const changeFilter = (newFilter: FilterType) => {
      setFilter(newFilter);
   }

   useEffect(() => {
      fetchTodos()
   }, [fetchTodos]);

   useEffect(() => {
      setState((prev: TodosState) => ({
         ...prev,
         filteredTodos: applyFilter(prev.todos, filter),
      }));
   }, [filter, applyFilter]);

   return {
      todos: state.filteredTodos,
      isLoading: state.isLoading,
      error: state.error,
      filter,
      changeFilter,
      refreshTodos: fetchTodos,
   }
}