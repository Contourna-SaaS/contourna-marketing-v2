import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { LogoCloud } from '@/components/logo-cloud'
import { Navbar } from '@/components/navbar'
import { Screenshot } from '@/components/screenshot'
import { Heading, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Contourna helps you sell more by revealing sensitive information about your customers.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Make your business easier to manage
          </h1>
          <p className="mt-8 max-w-3xl text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Automated document creation to standardize your quality management
            system. Grow your business faster with simplified employee
            onboarding, increase efficiency, and seamless compliance.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="#">Get started</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FeatureSection({
  heading,
  subheading,
  copy,
  image,
}: {
  heading: string
  subheading: string
  copy: string
  image: string
}) {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Subheading>{subheading}</Subheading>
        <Heading as="h3" className="mt-2 max-w-3xl">
          {heading}
        </Heading>
        <p className="mt-8 max-w-3xl text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
          {copy}
        </p>
        <Screenshot
          width={1216}
          height={768}
          src={image}
          className="mt-16 h-[36rem] sm:h-auto sm:w-[76rem]"
        />
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-c-brown py-32">
      <Container>
        <Subheading dark>Streamline, Simplify, Succeed</Subheading>
        <Heading dark as="h3" className="mt-2 max-w-3xl">
          Managing your business has never been easier
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            eyebrow="Save Time"
            title="Reduce time spent creating manuals and procedures."
            description="Effective document control creates a culture of clarity, accountability, and continuous improvement."
            graphic={
              <div className="h-80 bg-[url(/images/business.jpg)] bg-cover bg-center bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            eyebrow="Quality Standards"
            title="Consistency between all employees"
            description="Consistent processes lead to consistent results, which make both employees and customers happy."
            graphic={
              <div className="h-80 bg-[url(/images/baking.jpg)] bg-cover bg-center bg-no-repeat" />
            }
            // `!overflow-visible` is needed to work around a Chrome bug that disables the mask on the graphic.
            className="z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            eyebrow="Training"
            title="Improve onboarding and reduce turnover"
            description="Employees are capable pf managing themselves, but often its the lack of a system that leads to poor performance."
            graphic={
              <div className="h-80 bg-[url(/images/coffee-shop.jpg)] bg-cover bg-center bg-no-repeat" />
            }
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            eyebrow="Investment"
            title="Save on operation costs"
            description="A well-implemented quality management system includes employee training and development as essential components. Engaged employees are likely to stay longer and contribute more effectively to the organization."
            graphic={
              <div className="h-80 bg-[url(/images/store-front.jpg)] bg-cover bg-center bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

function PartnersSection() {
  return (
    <div className="relative mx-2 my-12 rounded-4xl py-24">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Subheading className="text-gray-950/75">
          Trusted Connections
        </Subheading>
        <Heading as="h3" className="mt-2 max-w-3xl">
          Our Partners
        </Heading>
        <LogoCloud />
      </Container>
    </div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSection
            heading="Make your business easier to manage"
            subheading="Organizational Standards"
            copy="Automated document creation to standardize your quality management system. Grow your business faster with simplified employee onboarding, increase efficiency, and seamless compliance."
            image="./screenshots/create-document-ai.png"
          />
          <PartnersSection />
          <FeatureSection
            heading="Consistent employee standards. Consistent customer service."
            subheading="Built on Consistency"
            copy="Happy employees build great products, and great products make customers happy"
            image="./screenshots/manual.png"
          />
        </div>
        <BentoSection />
      </main>
      <Footer />
    </div>
  )
}
