'use client'

import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import { AnimatePresence, motion } from 'framer-motion'
import { BrandForm } from './(components)/BrandForm'
import { BusinessForm } from './(components)/BusinessForm'
import { ContactForm } from './(components)/ContactForm'
import { FormStepper } from './(components)/FormStepper'
import { Preview } from './(components)/Preview'
import { FormProvider, useForm } from './(context)/FormContext'

export default function OneTimeGeneration() {
  return (
    <FormProvider>
      <main className="overflow-hidden py-16 lg:py-24">
        <GradientBackground />
        <Container>
          <Navbar />
          <div className="my-16 lg:mt-32">
            <Heading as="h1" className="text-c-brown">
              Document Generation
            </Heading>
            <Lead className="mt-6 max-w-3xl text-c-brown/80">
              Generate your ISO 9001 documentation package by providing some
              basic information about your business.
            </Lead>
            <div className="mt-16">
              <FormStepper />
              <div className="mt-12">
                <FormContent />
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </main>
    </FormProvider>
  )
}

function FormContent() {
  const { currentStep } = useForm()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 0 && <BusinessForm />}
        {currentStep === 1 && <ContactForm />}
        {currentStep === 2 && <BrandForm />}
        {currentStep === 3 && <Preview />}
      </motion.div>
    </AnimatePresence>
  )
}
