import Header from "../../components/layout/Header";

const Home: React.FC = () => {
   return (
      <div className="max-w-7xl mx-auto">
         <Header />

         <div className="py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Home Page</h1>
            <p className="text-gray-700 dark:text-gray-300">
               Welcome to the home page of Wide Task.
            </p>
         </div>
      </div>
   )
}

export default Home;