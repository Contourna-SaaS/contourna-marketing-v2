'use client'

import { Button } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useHookForm } from 'react-hook-form'
import type { z } from 'zod'
import { formSchema, useForm } from '../(context)/FormContext'

type ContactFormData = Pick<
  z.infer<typeof formSchema>,
  'location' | 'phone' | 'email'
>

export function ContactForm() {
  const { formData, setFormData, setCurrentStep } = useForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useHookForm<ContactFormData>({
    resolver: zodResolver(
      formSchema.pick({
        location: true,
        phone: true,
        email: true,
      }),
    ),
    defaultValues: {
      location: formData.location || '',
      phone: formData.phone || '',
      email: formData.email || '',
    },
  })

  const onSubmit = (data: ContactFormData) => {
    setFormData(data)
    setCurrentStep(2)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Business Location
        </label>
        <input
          type="text"
          {...register('location')}
          placeholder="City, Country"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          type="tel"
          {...register('phone')}
          placeholder="+1 (555) 000-0000"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Business Email
        </label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep(0)}
        >
          Previous
        </Button>
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  )
}
