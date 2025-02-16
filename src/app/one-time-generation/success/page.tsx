'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Success() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) {
        setError('No session ID found')
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        })

        if (!response.ok) {
          throw new Error('Payment verification failed')
        }

        setIsLoading(false)
      } catch (err) {
        setError('Failed to verify payment')
        setIsLoading(false)
      }
    }

    verifyPayment()
  }, [sessionId])

  if (isLoading) {
    return (
      <main className="overflow-hidden">
        <GradientBackground />
        <Container>
          <Navbar />
          <div className="mt-16 text-center lg:mt-32">
            <Lead>Verifying your payment...</Lead>
          </div>
        </Container>
        <Footer />
      </main>
    )
  }

  if (error) {
    return (
      <main className="overflow-hidden">
        <GradientBackground />
        <Container>
          <Navbar />
          <div className="my-16 text-center lg:mt-32">
            <Heading as="h1" className="text-red-600">
              Payment Verification Failed
            </Heading>
            <Lead className="mt-6">
              {error}. Please contact support if you believe this is an error.
            </Lead>
            <div className="mt-8">
              <Button href="/one-time-generation">Return to Form</Button>
            </div>
          </div>
        </Container>
        <Footer />
      </main>
    )
  }

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <div className="my-16 lg:mt-32">
          <div className="text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-c-yellow" />
            <Heading as="h1" className="mt-6 text-c-brown">
              Payment Successful!
            </Heading>
            <Lead className="mt-6">
              Thank you for your purchase. Your ISO 9001 documentation package
              is being prepared.
            </Lead>
            <div className="mt-8 space-y-4">
              <p className="text-sm text-gray-600">
                You will receive an email with your documentation package within
                the next 24 hours.
              </p>
              <p className="text-sm text-gray-600">
                If you have any questions, please don't hesitate to contact our
                support team.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/">Return to Home</Button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  )
}
