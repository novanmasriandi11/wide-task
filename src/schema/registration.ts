import { z } from "zod";

export const registrationSchema = z.object({
   name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters' }),
   email: z
      .string()
      .email({ message: 'Please enter a valid email address' }),
   password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must be contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must be contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must be contain at least one number' }),
   confirmPassword: z
      .string()
}).refine((data) => data.password === data.confirmPassword, {
   message: 'Password do not match',
   path: ['confirmPassword'],
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;