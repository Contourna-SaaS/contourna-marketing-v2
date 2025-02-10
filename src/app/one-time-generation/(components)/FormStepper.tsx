'use client'

import { CheckIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { useForm } from '../(context)/FormContext'

const steps = [
  { name: 'Business Info', description: 'Company details' },
  { name: 'Contact', description: 'Location and contact info' },
  { name: 'Brand', description: 'Logo and colors' },
  { name: 'Preview', description: 'Review and payment' },
]

export function FormStepper() {
  const { currentStep, isStepCompleted } = useForm()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Return null on server-side and first render
  }

  return (
    <nav aria-label="Progress">
      <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            <div
              className={clsx(
                'group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4',
                index <= currentStep ? 'border-c-yellow' : 'border-gray-200',
              )}
            >
              <span
                className={clsx(
                  'text-sm font-medium',
                  index <= currentStep ? 'text-c-brown' : 'text-gray-500',
                )}
              >
                Step {index + 1}
              </span>
              <span className="text-sm font-medium">{step.name}</span>
              <span
                className={clsx(
                  'mt-0.5 flex items-center text-sm font-medium',
                  index === currentStep
                    ? 'text-c-brown'
                    : index < currentStep
                      ? 'text-c-yellow'
                      : 'text-gray-500',
                )}
              >
                {step.description}
                {mounted && isStepCompleted(index) && (
                  <CheckIcon className="ml-2 size-4" />
                )}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
