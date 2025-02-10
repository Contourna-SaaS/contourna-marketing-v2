import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { formData } = body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'ISO 9001 Documentation Package',
              description: `Custom documentation for ${formData.companyName}`,
            },
            unit_amount: 29900, // $299.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/one-time-generation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/one-time-generation`,
      metadata: {
        companyName: formData.companyName,
        companySize: formData.companySize.toString(),
        industry: formData.industry,
        email: formData.email,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 },
    )
  }
}
