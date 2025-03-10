import { useState } from "react"
import { RegistrationFormData, registrationSchema } from "../../schema/registration";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import Form from "../../components/ui/Form";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import Dialog from "../../components/ui/Dialog";

const TaskForm: React.FC = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const [formData, setFormData] = useState<RegistrationFormData | null>(null);

   const handleSubmit = (data: RegistrationFormData) => {
      setIsLoading(true);

      setTimeout(() => {
         setFormData(data);
         setIsLoading(false);
         setIsSuccess(true);
      }, 2000);
   };

   return (
      <div className="p-6">
         <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Registration Form</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
               Please fill out the form below to create your account.
            </p>

            <Card>
               <CardHeader>
                  <CardTitle>
                     Create Account
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <Form<RegistrationFormData> onSubmit={handleSubmit} schema={registrationSchema}>
                     <FormField
                        label="Name"
                        name="name"
                        placeholder="Enter your name"
                        required
                     />
                     <FormField
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                     />
                     <FormField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="**********"
                        required
                        showPasswordToggle
                     />
                     <FormField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        required
                        showPasswordToggle
                     />
                     <div className="mt-6">
                        <Button
                           type="submit"
                           variant="primary"
                           size="lg"
                           fullWidth
                           isLoading={isLoading}
                        >
                           Register
                        </Button>
                     </div>
                  </Form>
               </CardContent>
            </Card>
         </div>
         <Dialog
            isOpen={isSuccess}
            title="Registration Successful"
            onClose={() => setIsSuccess(false)}
            autoCloseTime={5000}
         >
            <div className="text-center">
               <div className="mb-4 flex justify-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
               </div>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your account has been created successfully!
               </p>
               {formData && (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-left">
                     <p className="mb-2">
                        <span className="font-medium">Name: </span>{formData.name}
                     </p>
                     <p >
                        <span className="font-medium">Email: </span>{formData.email}
                     </p>
                  </div>
               )}
               <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  This dialog will close automatically in 5 seconds.
               </p>
            </div>
         </Dialog>
      </div>
   )
}

export default TaskForm;