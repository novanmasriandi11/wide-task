import TodoContainer from "../../components/todos/TodoContainer";

const TaskIntegration: React.FC = () => {
   return (
      <div className="p-6">
         <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">API Integration</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
               This page display todos fetched from the JSONPlaceholder API. You can filter and refresh the data.
            </p>
            <TodoContainer />
         </div>
      </div>
   )
}

export default TaskIntegration;