import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Subscription {
  status: string
  current_period_end: string
  price_id: string
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setLoading(false)
          return
        }

        const { data: sub } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single()

        setSubscription(sub)
      } catch (error) {
        console.error('Error fetching subscription:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [])

  return {
    subscription,
    loading,
    isActive: subscription?.status === 'active',
    isPro: subscription?.price_id === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID
  }
}
