'use client'

import { Button } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm as useHookForm } from 'react-hook-form'
import type { z } from 'zod'
import { formSchema, useForm } from '../(context)/FormContext'

type BrandFormData = Pick<z.infer<typeof formSchema>, 'logo' | 'brandColor'>

export function BrandForm() {
  const { formData, setFormData, setCurrentStep } = useForm()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useHookForm<BrandFormData>({
    resolver: zodResolver(
      formSchema.pick({
        logo: true,
        brandColor: true,
      }),
    ),
    defaultValues: {
      brandColor: formData.brandColor || '#000000',
    },
  })

  const selectedFile = watch('logo')

  useEffect(() => {
    if (selectedFile?.[0]) {
      const file = selectedFile[0]
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [selectedFile])

  const onSubmit = (data: BrandFormData) => {
    const formDataToSave = {
      ...data,
      logo: data.logo?.[0] || null, // Get the first file from FileList
    }
    setFormData(formDataToSave)
    setCurrentStep(3)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024)
      console.log('File size in MB:', fileSizeInMB.toFixed(2))

      if (fileSizeInMB > 25) {
        setValue('logo', undefined)
        console.log('File too large')
        return
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setValue('logo', undefined)
        console.log('Invalid file type')
        return
      }

      setValue('logo', e.target.files)
      clearErrors('logo')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label
          htmlFor="logo"
          className="block text-sm font-medium text-gray-700"
        >
          Company Logo
        </label>
        <div className="mt-1 space-y-4">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose File
            </Button>
            <input
              type="file"
              {...register('logo')}
              ref={fileInputRef}
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="text-sm text-gray-500">
              {selectedFile?.[0]?.name || 'No file chosen'}
            </span>
          </div>
          {previewUrl && (
            <div className="h-32 w-32 overflow-hidden rounded border border-gray-200">
              <img
                src={previewUrl}
                alt="Logo preview"
                className="h-full w-full object-contain"  
              />
            </div>
          )}
        </div>
        {errors.logo && (
          <p className="mt-1 text-sm text-red-600">
            {errors.logo.message?.toString()}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          JPG or PNG up to 25MB. Optional.
        </p>
      </div>

      <div>
        <label
          htmlFor="brandColor"
          className="block text-sm font-medium text-gray-700"
        >
          Brand Color
        </label>
        <div className="mt-1 flex items-center gap-4">
          <input
            type="color"
            value={watch('brandColor') as string}
            onChange={(e) => {
              const color = e.target.value
              setValue('brandColor', color)
            }}
            className="h-10 w-20 rounded border border-gray-300"
          />
          <input
            type="text"
            {...register('brandColor')}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-c-yellow focus:outline-none focus:ring-1 focus:ring-c-yellow"
          />
        </div>
        {errors.brandColor && (
          <p className="mt-1 text-sm text-red-600">
            {errors.brandColor.message?.toString()}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep(1)}
          className="hover:border-c-yellow hover:text-c-brown"
        >
          Previous
        </Button>
        <Button
          type="submit"
          className="bg-c-yellow text-c-brown hover:bg-c-yellow/90"
        >
          Preview
        </Button>
      </div>
    </form>
  )
}
