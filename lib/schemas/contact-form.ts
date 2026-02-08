import { z } from 'zod'

export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  location: z.string().min(1, 'Please select your location'),
  projectType: z.string().optional(),
  equipmentCategory: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(1, 'Please describe your project'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
