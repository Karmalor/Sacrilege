'use server'

import { Applicant } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Form } from '@payloadcms/plugin-form-builder/types'

const payload = await getPayload({ config: configPromise })

export async function getFormSubmissionById(formSubmissionId: Applicant['id']) {
  try {
    const result = await payload.findByID({
      collection: 'applicants',
      id: formSubmissionId,
    })

    return result
  } catch (error: any) {
    if (error.name === 'NotFound' || error.message?.includes('Not Found')) {
      return null // Handle not found gracefully
    }
    throw error // Rethrow if it's another error
  }
}

export async function getFormById(formId: Form['id']) {
  try {
    const result = await payload.findByID({
      collection: 'forms',
      id: formId,
    })
    return result
  } catch (error: any) {
    if (error.name === 'NotFound' || error.message?.includes('Not Found')) {
      return null // Handle not found gracefully
    }
    throw error // Rethrow if it's another error
  }
}
