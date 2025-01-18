'use client'

import { Container, Title, Tabs, Paper } from '@mantine/core'
import { IconUsers, IconCards } from '@tabler/icons-react'
import { Header } from '@/components/Header'
import { StatsOverview } from '@/components/admin/StatsOverview'
import { UsersTable } from '@/components/admin/UsersTable'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type Subscription = Database['public']['Tables']['subscriptions']['Row']

interface UserWithSubscription extends Profile {
  subscriptions: Pick<Subscription, 'status'>[] | null
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    premiumUsers: 0
  })
  const [users, setUsers] = useState<UserWithSubscription[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Get active users (last 7 days)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      const { count: activeUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gt('last_sign_in', sevenDaysAgo.toISOString())

      // Get premium users
      const { count: premiumUsers } = await supabase
        .from('subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      setStats({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        premiumUsers: premiumUsers || 0
      })

      // Fetch users with their subscriptions
      const { data: userData } = await supabase
        .from('profiles')
        .select(`
          *,
          subscriptions (
            status
          )
        `)
        .order('created_at', { ascending: false })

      if (userData) {
        setUsers(userData as UserWithSubscription[])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return null

  return (
    <>
      <Header />
      <Container size="lg" mt="xl">
        <Title mb="xl">Admin Dashboard</Title>

        <StatsOverview {...stats} />

        <Paper mt="xl">
          <Tabs defaultValue="users">
            <Tabs.List>
              <Tabs.Tab 
                value="users" 
                leftSection={<IconUsers size={16} />}
              >
                Users
              </Tabs.Tab>
              <Tabs.Tab 
                value="decks" 
                leftSection={<IconCards size={16} />}
              >
                Featured Decks
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="users" pt="md">
              <UsersTable users={users} onUpdate={fetchData} />
            </Tabs.Panel>

            <Tabs.Panel value="decks" pt="md">
              <Text>Featured Decks management coming soon</Text>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Container>
    </>
  )
}
