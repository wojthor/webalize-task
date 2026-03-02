'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type ContactFormInput = {
  fullName?: string | null
  email: string
  companyName?: string | null
  phoneNumber?: string | null
  phonePrefix?: string | null
  preferredTime?: string | null
  privacyPolicyAccepted?: boolean | null
}

export type ContactFormResult =
  | { success: true }
  | { success: false; error: string }

function formDataToInput(formData: FormData): ContactFormInput {
  const privacyPolicyAccepted = formData.get('privacyPolicyAccepted')
  return {
    fullName: (formData.get('fullName') as string) ?? null,
    email: (formData.get('email') as string) ?? '',
    companyName: (formData.get('companyName') as string) ?? null,
    phoneNumber: (formData.get('phoneNumber') as string) ?? null,
    phonePrefix: (formData.get('phonePrefix') as string) ?? null,
    preferredTime: (formData.get('preferredTime') as string) ?? null,
    privacyPolicyAccepted:
      privacyPolicyAccepted === 'on' || privacyPolicyAccepted === 'true',
  }
}

export async function submitContactForm(
  data: ContactFormInput | FormData,
): Promise<ContactFormResult> {
  const input = data instanceof FormData ? formDataToInput(data) : data

  try {
    if (!input.email?.trim()) {
      return { success: false, error: 'Email is required.' }
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    await payload.create({
      collection: 'contact-submissions',
      data: {
        fullName: input.fullName?.trim() ?? null,
        email: input.email.trim(),
        companyName: input.companyName?.trim() ?? null,
        phoneNumber: input.phoneNumber?.trim() ?? null,
        phonePrefix: input.phonePrefix?.trim() ?? null,
        preferredTime: input.preferredTime ?? null,
        privacyPolicyAccepted: input.privacyPolicyAccepted ?? false,
      },
    })

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Submission failed.'
    return { success: false, error: message }
  }
}
