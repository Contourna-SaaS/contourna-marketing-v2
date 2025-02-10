'use client'

import { Button } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm as useHookForm } from 'react-hook-form'
import type { z } from 'zod'
import { formSchema, useForm } from '../(context)/FormContext'
import { Industry } from '../(lib)/enums'

type BusinessFormData = Pick<
  z.infer<typeof formSchema>,
  'companyName' | 'companySize' | 'industry'
>

const industries = [
  'Manufacturing',
  'Healthcare',
  'Technology',
  'Retail',
  'Construction',
  'Education',
  'Financial Services',
  'Other',
]

export function BusinessForm() {
  const { formData, setFormData, setCurrentStep } = useForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useHookForm<BusinessFormData>({
    resolver: zodResolver(
      formSchema.pick({
        companyName: true,
        companySize: true,
        industry: true,
      }),
    ),
    defaultValues: {
      companyName: formData.companyName || '',
      companySize: formData.companySize || undefined,
      industry: formData.industry || undefined,
    },
  })

  const onSubmit = (data: BusinessFormData) => {
    console.log('Form data:', data)
    console.log('Validation errors:', errors)
    setFormData(data)
    setCurrentStep(1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name
        </label>
        <input
          type="text"
          {...register('companyName')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="companySize"
          className="block text-sm font-medium text-gray-700"
        >
          Company Size
        </label>
        <select
          {...register('companySize')}
          className={clsx(
            'mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-c-yellow focus:outline-none focus:ring-1 focus:ring-c-yellow',
            errors.companySize ? 'border-red-300' : 'border-gray-300',
          )}
        >
          <option value="">Select company size</option>
          <option value="SMALL">1-50 employees</option>
          <option value="MEDIUM">51-200 employees</option>
          <option value="LARGE">201-1000 employees</option>
          <option value="XL">1000+ employees</option>
        </select>
        {errors.companySize && (
          <p className="mt-1 text-sm text-red-600">
            Please select a company size
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="industry"
          className="block text-sm font-medium text-gray-700"
        >
          Industry
        </label>
        <select
          {...register('industry')}
          className={clsx(
            'mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-c-yellow focus:outline-none focus:ring-1 focus:ring-c-yellow',
            errors.industry ? 'border-red-300' : 'border-gray-300',
          )}
        >
          <option value="">Select an industry</option>
          {Object.keys(Industry).map((key) => (
            <option key={key} value={key}>
              {Industry[key as keyof typeof Industry]}
            </option>
          ))}
        </select>
        {errors.industry && (
          <p className="mt-1 text-sm text-red-600">Please select an industry</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  )
}
