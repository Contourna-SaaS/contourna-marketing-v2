import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 },
      )
    }

    // Here you would typically:
    // 1. Update your database with the payment status
    // 2. Trigger your document generation process
    // 3. Send confirmation email to the customer
    // 4. Any other post-payment processing

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error verifying payment:', err)
    return NextResponse.json(
      { error: 'Error verifying payment' },
      { status: 500 },
    )
  }
}
