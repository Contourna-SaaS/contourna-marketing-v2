'use client'

import { Button } from '@/components/button'
import { loadStripe } from '@stripe/stripe-js'
import { useForm } from '../(context)/FormContext'

// Make sure to add your publishable key to .env.local
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

export function Preview() {
  const { formData, setCurrentStep } = useForm()

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        console.error('Error:', error)
        return
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        console.error('Stripe error:', stripeError)
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium">Review Your Information</h2>

        <div className="mt-6 space-y-6">
          <section>
            <h3 className="font-medium text-gray-900">Business Information</h3>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Company Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formData.companyName}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Company Size
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formData.companySize} employees
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Industry</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formData.industry}
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h3 className="font-medium text-gray-900">Contact Information</h3>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formData.location}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{formData.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h3 className="font-medium text-gray-900">Brand Information</h3>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Logo</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formData.logo ? (
                    <div className="h-20 w-20 overflow-hidden rounded border border-gray-200">
                      <img
                        src={URL.createObjectURL(formData.logo)}
                        alt="Company logo preview"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    'No logo uploaded'
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Brand Color
                </dt>
                <dd className="mt-1 flex items-center gap-2">
                  <div
                    className="h-6 w-6 rounded border border-gray-200"
                    style={{ backgroundColor: formData.brandColor }}
                  />
                  <span className="text-sm text-gray-900">
                    {formData.brandColor}
                  </span>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-lg font-medium">Package Selection</h2>
        <div className="mt-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">
                  ISO 9001 Documentation Package
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Complete documentation package customized for your business
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Quality Management System Manual</li>
                  <li>• Required Procedures</li>
                  <li>• Forms and Templates</li>
                  <li>• Process Documentation</li>
                </ul>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium">$299</p>
                <p className="text-sm text-gray-500">One-time payment</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button
            type="button"
            className="w-full justify-center"
            onClick={handleSubmit}
          >
            Proceed to Payment
          </Button>
          <p className="mt-2 text-center text-sm text-gray-500">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep(2)}
        >
          Previous
        </Button>
      </div>
    </div>
  )
}
