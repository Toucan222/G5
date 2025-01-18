'use client'

import { Container, Title, SimpleGrid, Alert, Text } from '@mantine/core'
import { IconAlertCircle, IconInfoCircle } from '@tabler/icons-react'
import { Header } from '@/components/Header'
import { PricingCard } from '@/components/PricingCard'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { notifications } from '@mantine/notifications'

const PRICING_PLANS = [
  {
    title: 'Free',
    price: '$0',
    features: [
      'Up to 3 decks',
      '50 cards per deck',
      'Basic analytics',
      'Community support'
    ]
  },
  {
    title: 'Pro',
    price: '$9.99/month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'pro_placeholder',
    features: [
      'Unlimited decks',
      'Unlimited cards',
      'Advanced analytics',
      'Priority support',
      'CSV import',
      'Custom branding'
    ],
    popular: true
  },
  {
    title: 'Enterprise',
    price: 'Contact Us',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Team management'
    ]
  }
]

export default function Pricing() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled')
  const demo = searchParams.get('demo')

  const handleSubscribe = async (priceId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to start subscription process')
      }

      if (data.message) {
        notifications.show({
          title: 'Development Mode',
          message: data.message,
          color: 'blue'
        })
      }

      // In development, just redirect to dashboard
      router.push(data.url || '/dashboard?demo=true')
    } catch (error) {
      console.error('Subscription error:', error)
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to process subscription',
        color: 'red'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <Container size="lg" mt="xl">
        <Title ta="center" mb="xl">Choose Your Plan</Title>

        {!process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID && (
          <Alert 
            icon={<IconInfoCircle size={16} />}
            color="blue"
            mb="xl"
          >
            <Text>Development Mode: Stripe payments are not configured. Subscriptions will be simulated.</Text>
          </Alert>
        )}

        {canceled && (
          <Alert 
            icon={<IconAlertCircle size={16} />}
            color="yellow"
            mb="xl"
          >
            Your subscription process was canceled. You can try again whenever you're ready.
          </Alert>
        )}

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              onSubscribe={handleSubscribe}
              loading={loading}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
