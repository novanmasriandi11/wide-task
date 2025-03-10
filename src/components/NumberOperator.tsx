import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card";
import { Divide, Minus, Plus, RotateCcw, Settings, X } from "lucide-react";
import Form from "./ui/Form";
import Button from "./ui/Button";
import Dialog from "./ui/Dialog";
import FormField from "./ui/FormField";
import { z } from "zod";

type OperationType = 'basic' | 'advanced';

type SettingsFormData = {
   incrementValue: string;
   decrementValue: string;
   operationType: 'basic' | 'advanced';
}

interface ProcessedSettings {
   incrementValue: number;
   decrementValue: number;
   operationType: OperationType;
}

const NumberOperator: React.FC = () => {
   const [currentNumber, setCurrentNumber] = useState<number>(0);

   const [settings, setSettings] = useState<ProcessedSettings>({
      incrementValue: 1,
      decrementValue: 1,
      operationType: 'basic',
   });

   const [tempOperationType, setTempOperationType] = useState<OperationType>(settings.operationType);

   const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
   const [showAlert, setShowAlert] = useState<boolean>(false);
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [isSaving, setIsSaving] = useState<boolean>(false);

   const settingSchema = useMemo(() => {
      const minValue = tempOperationType === 'advanced' ? 2 : 1;

      return z.object({
         incrementValue: z.string().refine(val => {
            const num = Number(val);
            return !isNaN(num) && num >= minValue;
         }, {
            message: tempOperationType === 'advanced'
               ? 'Increment value must be greater than 1'
               : 'Increment value must be a greater than 0',
         }),
         decrementValue: z.string().refine(val => {
            const num = Number(val);
            return !isNaN(num) && num >= minValue;
         }, {
            message: tempOperationType === 'advanced'
               ? 'Decrement value must be greater than 1'
               : 'Decrement value must be a greater than 0',
         }),
         operationType: z.enum(['basic', 'advanced']),
      });
   }, [tempOperationType]);

   useEffect(() => {
      if (isSettingOpen) {
         setTempOperationType(settings.operationType);
      }
   }, [isSettingOpen, settings.operationType]);

   const handleIncrement = () => {
      // console.log('masuk');

      if (settings.operationType === 'basic') {
         setCurrentNumber(currentNumber + settings.incrementValue);
      } else {
         setCurrentNumber(currentNumber * settings.incrementValue);
      }
   }

   const handleDecrement = () => {
      // console.log('decrement');

      let newNumber: number;

      if (settings.operationType === 'basic') {
         newNumber = currentNumber - settings.decrementValue;
      } else {
         newNumber = currentNumber / settings.decrementValue;
      }

      if (newNumber < 0) {
         setAlertMessage('Operation would result in a negative number!');
         setShowAlert(true);
         return;
      }

      setCurrentNumber(newNumber);
   }

   const handleOperationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTempOperationType(e.target.value as OperationType);
   }

   const handleSettingsSubmit = (data: SettingsFormData) => {
      // console.log('Saving settings...', data);

      setIsSaving(true);

      setTimeout(() => {
         try {
            const processedData: ProcessedSettings = {
               incrementValue: Number(data.incrementValue),
               decrementValue: Number(data.decrementValue),
               operationType: data.operationType as OperationType,
            };

            if (processedData.operationType === 'advanced' && currentNumber < 1) {
               setCurrentNumber(1);
            }

            setSettings(processedData);
            setIsSaving(false);
            setIsSettingOpen(false);
         } catch (error) {
            console.error('Error saving settings:', error);
            setAlertMessage('Error saving settings. Please try again.');
            setShowAlert(true);
            setIsSaving(false);
         }
      }, 1000);
   };

   return (
      <>
         <Card className="w-full max-w-lg mx-auto p-4 md:p-6 lg:p-8 shadow-lg rounded-lg bg-white dark:bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle className="text-lg md:text-xl">Number Counter</CardTitle>
               <Button
                  variant="outline"
                  onClick={() => setIsSettingOpen(true)}
                  className="p-2"
               >
                  <Settings className="h-5 w-5" />
               </Button>
            </CardHeader>
            <CardContent className="flex justify-center items-center py-6 md:py-10">
               <span className="text-4xl md:text-6xl font-bold">{currentNumber}</span>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-center gap-2 md:gap-4">
               <Button
                  variant="primary"
                  onClick={handleIncrement}
                  className="flex items-center gap-2"
               >
                  {settings.operationType === 'basic' ? (
                     <Plus className="h-5 w-5" />
                  ) : (
                     <X className="h-5 w-5" />
                  )}
               </Button>
               <Button
                  variant="danger"
                  onClick={() => setCurrentNumber(1)}
                  className="flex items-center gap-2"
               >
                  <RotateCcw className="h-5 w-5" />
               </Button>
               <Button
                  variant="outline"
                  onClick={handleDecrement}
                  className="flex items-center gap-2"
               >
                  {settings.operationType === 'basic' ? (
                        <Minus className="h-4 w-4" />
                  ) : (
                        <Divide className="h-5 w-5" />
                  )}
               </Button>
            </CardFooter>
         </Card>

         <Dialog
            isOpen={isSettingOpen}
            title="Settings"
            onClose={() => !isSaving && setIsSettingOpen(false)}
         >
            <Form<SettingsFormData>
               onSubmit={handleSettingsSubmit}
               schema={settingSchema}
               className="space-y-4"
            >
               <div className="mb-4">
                  <label
                     htmlFor="oprationType"
                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                     Operation Type <span className="text-red-500">*</span>
                  </label>
                  <select
                     id="operationType"
                     name="operationType"
                     className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                     defaultValue={settings.operationType}
                     onChange={handleOperationTypeChange}
                  >
                     <option value="basic">Basic (Addition/Subtraction)</option>
                     <option value="advanced">Advanced (Multiplication/Division)</option>
                  </select>
               </div>

               <FormField
                  label={tempOperationType === 'basic' ? 'Increment Value' : 'Multiplication Value'}
                  name="incrementValue"
                  type="number"
                  min={tempOperationType === 'basic' ? 1 : 2}
                  defaultValue={settings.incrementValue.toString()}
                  required
               />

               <FormField
                  label={tempOperationType === 'basic' ? 'Decrement Value' : 'Division Value'}
                  name="decrementValue"
                  type="number"
                  min={tempOperationType === 'basic' ? 1 : 2}
                  defaultValue={settings.decrementValue.toString()}
                  required
               />

               <div className="flex justify-end gap-2 mt-6">
                  <Button
                     type="button"
                     variant="outline"
                     onClick={() => setIsSettingOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button type="submit" variant="primary" isLoading={isSaving} >Save</Button>
               </div>
            </Form>
         </Dialog>

         <Dialog
            isOpen={showAlert}
            onClose={() => setShowAlert(false)}
            title="Alert"
            autoCloseTime={3000}
         >
            <div className="py-4">
               <p className="text-red-600 dark:text-red-400">{alertMessage}</p>
            </div>
            <div className="flex justify-end">
               <Button variant="danger" onClick={() => setShowAlert(false)}>OK</Button>
            </div>
         </Dialog>
      </>
   )
}

export default NumberOperator;