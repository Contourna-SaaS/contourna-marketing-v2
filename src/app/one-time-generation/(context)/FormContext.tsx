'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { z } from 'zod'
import { Industry } from '../(lib)/enums'

export const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB

export const formSchema = z.object({
  // Business Info
  companyName: z.string().min(1, 'Company name is required'),
  companySize: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'XL'], {
    required_error: 'Please select a company size',
  }),
  industry: z.enum(Object.keys(Industry) as [string, ...string[]], {
    required_error: 'Please select an industry',
  }),

  // Contact Info
  location: z.string().min(1, 'Location is required'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email format'),

  // Brand Info
  logo: z
    .any()
    .refine((files) => {
      if (!files || !files[0]) return true // Optional file
      const file = files[0]
      return file.size / (1024 * 1024) <= 25
    }, 'Max file size is 25MB')
    .refine((files) => {
      if (!files || !files[0]) return true // Optional file
      const file = files[0]
      return ['image/jpeg', 'image/png'].includes(file.type)
    }, 'Only .jpg and .png formats are supported')
    .optional(),
  brandColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
})

type FormData = z.infer<typeof formSchema>

interface FormContextType {
  formData: Partial<FormData>
  currentStep: number
  setFormData: (data: Partial<FormData>) => void
  setCurrentStep: (step: number) => void
  isStepCompleted: (step: number) => boolean
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<Partial<FormData>>(() => {
    // Try to load from sessionStorage on initial render
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('formData')
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Save to sessionStorage whenever formData changes
    sessionStorage.setItem('formData', JSON.stringify(formData))
  }, [formData])

  const isStepCompleted = (step: number) => {
    switch (step) {
      case 0: // Business Info
        return !!(
          formData.companyName &&
          formData.companySize &&
          formData.industry
        )
      case 1: // Contact Info
        return !!(formData.location && formData.phone && formData.email)
      case 2: // Brand Info
        return !!formData.brandColor // Logo is optional
      default:
        return false
    }
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        setFormData: (newData) => setFormData({ ...formData, ...newData }),
        setCurrentStep,
        isStepCompleted,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider')
  }
  return context
}
