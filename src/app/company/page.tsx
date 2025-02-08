import { AnimatedNumber } from '@/components/animated-number'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient, GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company | Contourna',
  description:
    'We help businesses streamline their operations through quality management systems, documentation, and AI-powered solutions.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Making business easier to manage.</Heading>
      <Lead className="mt-6 max-w-3xl">
        We help organizations improve quality management through controlled
        processes, enhanced documentation, and AI-powered solutions.
      </Lead>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-medium tracking-tight">Our mission</h2>
          <p className="mt-6 text-sm/6 text-gray-600">
            At Contourna, our specialty is rooted in the principles of Quality
            Management. We understand it's more than just setting expectations
            and policies - it's how you lead your managers, customers,
            employees, and suppliers while continually improving through risk
            assessment.
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            We believe in promoting ownership among your employees, making it
            easier to manage your business. Through our AI-powered solutions, we
            help streamline documentation, training materials, and quality
            assurance processes.
          </p>
        </div>
        <div className="max-lg:mt-16 lg:col-span-1">
          <Subheading>Our Impact</Subheading>
          <hr className="mt-6 border-t border-gray-200" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Documentation Created</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={900} end={1500} />+
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Training Materials</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={2000} end={2500} />+
              </dd>
            </div>
            <div className="flex flex-col gap-y-2">
              <dt className="text-sm/6 text-gray-600">Satisfied Clients</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={80} end={100} />+
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </Container>
  )
}

function Services() {
  const services = [
    {
      title: 'Employee Onboarding',
      description:
        'Provide training documents targeted towards teaching new employees.',
      icon: '👥',
    },
    {
      title: 'Data Research',
      description: 'Applying data to find improvements for your business.',
      icon: '📊',
    },
    {
      title: 'Learning Material',
      description:
        'Creating ongoing learning and training material for employees.',
      icon: '📚',
    },
    {
      title: 'Policy Creation',
      description: 'Clarifying organization expectations and company policies.',
      icon: '📋',
    },
    {
      title: 'Quality Management Training',
      description: 'Training to improve the quality of your products.',
      icon: '🎯',
    },
    {
      title: 'Industry Guidelines',
      description:
        'Meeting mandatory guidelines from the government or other important bodies of influence.',
      icon: '📑',
    },
  ]

  return (
    <Container className="mt-32">
      <Subheading>Our Services</Subheading>
      <Heading as="h3" className="mt-2">
        Evolve Your Business
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        What areas of business can we help?
      </Lead>
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="relative flex flex-col gap-6 rounded-2xl bg-neutral-950/5 px-6 py-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/10 text-2xl">
              {service.icon}
            </div>
            <div>
              <h3 className="font-display text-base font-semibold">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-700">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

function Benefits() {
  return (
    <Container className="mb-32 mt-32">
      <Subheading>Benefits</Subheading>
      <Heading as="h3" className="mt-2">
        Why Businesses Choose Contourna
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        You have to do everything as a small business owner or manager. With our
        services, we can help make your life easier.
      </Lead>
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-lg font-semibold">
            Human Resources
          </h3>
          <p className="mt-4 text-sm text-neutral-700">
            With our employee onboarding approach, you'll save time, better meet
            employee needs, and improve retention through:
          </p>
          <ul className="mt-8 space-y-3 text-sm text-neutral-700">
            <li>
              • Streamlined hiring process using online forms and document
              automation
            </li>
            <li>• Expedited employee onboarding with auto-generated forms</li>
            <li>
              • Consistent, manageable training process with progress tracking
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">
            Customer Satisfaction
          </h3>
          <p className="mt-4 text-sm text-neutral-700">
            Our approach to quality management aims to retain customers and
            support the business by:
          </p>
          <ul className="mt-8 space-y-3 text-sm text-neutral-700">
            <li>
              • Understanding customer needs through surveys and analytics
            </li>
            <li>• Maintaining clear communication and performance standards</li>
            <li>• Creating simplified ways to manage customer feedback</li>
          </ul>
        </div>
      </div>
    </Container>
  )
}

function CallToAction() {
  return (
    <div className="relative mx-2 my-12 rounded-4xl py-24">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Subheading>Get Started</Subheading>
        <Heading as="h3" className="mt-2 max-w-3xl">
          Ready to improve your quality management?
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Let's discuss how Contourna can help streamline your business
          operations and documentation.
        </Lead>
        <div className="mt-10">
          <Button href="/contact">Contact Us Today</Button>
        </div>
      </Container>
    </div>
  )
}

export default function Company() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <Services />
      <Benefits />
      <CallToAction />
      <Footer />
    </main>
  )
}
