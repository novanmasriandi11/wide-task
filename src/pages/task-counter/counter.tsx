import NumberOperator from "../../components/NumberOperator"

const Counter: React.FC = () => {
   return (
      <div className="p-6">
         <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Number Counter</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
               Use the calculator below to perform various number operations. Click the settings icon to customize the operation type and values.
            </p>
            <NumberOperator/>
         </div>
      </div>
   )
}

export default Counter;