import { supabaseAdmin } from '@/lib/supabase'

export interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  premiumUsers: number
  totalDecks: number
  totalCards: number
  dailyStats: {
    date: string
    newUsers: number
    activeUsers: number
    cardsCreated: number
  }[]
}

export async function getAnalytics(days: number = 30): Promise<AnalyticsData> {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  const startDateStr = startDate.toISOString()

  // Get total users
  const { count: totalUsers } = await supabaseAdmin
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  // Get active users (last 7 days)
  const { count: activeUsers } = await supabaseAdmin
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gt('last_sign_in', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  // Get premium users
  const { count: premiumUsers } = await supabaseAdmin
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  // Get total decks and cards
  const { count: totalDecks } = await supabaseAdmin
    .from('decks')
    .select('*', { count: 'exact', head: true })

  const { count: totalCards } = await supabaseAdmin
    .from('cards')
    .select('*', { count: 'exact', head: true })

  // Get daily stats
  const { data: dailyStats } = await supabaseAdmin
    .from('analytics_daily')
    .select('*')
    .gte('date', startDateStr)
    .order('date', { ascending: false })

  return {
    totalUsers: totalUsers || 0,
    activeUsers: activeUsers || 0,
    premiumUsers: premiumUsers || 0,
    totalDecks: totalDecks || 0,
    totalCards: totalCards || 0,
    dailyStats: dailyStats || []
  }
}
