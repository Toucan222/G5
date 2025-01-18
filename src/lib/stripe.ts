import Stripe from 'stripe'

// Placeholder Stripe client that won't block the build
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      typescript: true,
    })
  : null

export const STRIPE_PLANS = {
  FREE: 'free',
  PRO: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'pro_placeholder',
  ENTERPRISE: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID || 'enterprise_placeholder'
} as const

export type StripePlan = keyof typeof STRIPE_PLANS
