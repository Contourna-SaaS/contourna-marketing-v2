'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
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

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company (Optional)
        </label>
        <input
          type="text"
          {...register('company')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full justify-center"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  )
}

export default function Contact() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <div className="mt-16 lg:mt-32">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <Subheading>Contact</Subheading>
              <Heading as="h1" className="mt-2">
                Let's work together
              </Heading>
              <Lead className="mt-6">
                Ready to improve your quality management system? Get in touch
                and let's discuss how Contourna can help streamline your
                business operations.
              </Lead>
              <dl className="mt-8 space-y-6 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">Email</dt>
                  <dd className="mt-1">
                    <a
                      className="text-gray-600 hover:text-gray-900"
                      href="mailto:contact@contourna.com"
                    >
                      contact@contourna.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Office</dt>
                  <dd className="mt-1">
                    <address className="not-italic text-gray-600">
                      123 Business Street
                      <br />
                      Suite 100
                      <br />
                      City, State 12345
                    </address>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="lg:mt-6">
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="mt-16 lg:mt-32">
        <Footer />
      </div>
    </main>
  )
}
