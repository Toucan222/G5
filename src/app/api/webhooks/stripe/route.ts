import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  if (!stripe) {
    // Return 200 to prevent webhook retries, but log that Stripe isn't configured
    console.log('Stripe is not configured, webhook endpoint inactive')
    return NextResponse.json({ received: true })
  }

  try {
    // Placeholder webhook handling
    console.log('Stripe webhook received but not fully configured')
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json(
      { error: 'Webhook handling not configured' },
      { status: 400 }
    )
  }
}
