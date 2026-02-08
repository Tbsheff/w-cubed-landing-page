'use server'

import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact-form'

export async function submitContactForm(data: ContactFormData) {
  const parsed = contactFormSchema.safeParse(data)
  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.flatten().fieldErrors }
  }
  // TODO: Replace with email service (Resend, SendGrid, etc.)
  console.log('[Contact Form Submission]', parsed.data)
  return { ok: true as const }
}
