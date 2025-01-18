'use client'

import { Container, Title, Tabs, Paper } from '@mantine/core'
import { IconUsers, IconChartBar, IconCards } from '@tabler/icons-react'
import { Header } from '@/components/Header'
import { StatsOverview } from '@/components/admin/StatsOverview'
import { UsersTable } from '@/components/admin/UsersTable'
import { FeaturedDecks } from '@/components/admin/FeaturedDecks'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { UserStats, AdminProfile } from '@/types/admin'

export default function AdminDashboard() {
  const [stats, setStats] = useState<UserStats>({
    total_users: 0,
    active_users: 0,
    premium_users: 0
  })
  const [users, setUsers] = useState<AdminProfile[]>([])
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    // Get total users
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Get active users (active in last 7 days)
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
      total_users: totalUsers || 0,
      active_users: activeUsers || 0,
      premium_users: premiumUsers || 0
    })
  }

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select(`
        *,
        subscriptions (
          status
        )
      `)
      .order('created_at', { ascending: false })

    if (data) {
      setUsers(data.map(user => ({
        ...user,
        subscription_status: user.subscriptions?.[0]?.status
      })))
    }
  }

  const fetchDecks = async () => {
    const { data } = await supabase
      .from('decks')
      .select(`
        *,
        profiles (
          email
        )
      `)
      .order('created_at', { ascending: false })

    if (data) {
      setDecks(data.map(deck => ({
        ...deck,
        user_email: deck.profiles.email
      })))
    }
  }

  const fetchData = async () => {
    setLoading(true)
    await Promise.all([
      fetchStats(),
      fetchUsers(),
      fetchDecks()
    ])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Header />
      <Container size="lg" mt="xl">
        <Title mb="xl">Admin Dashboard</Title>

        <StatsOverview stats={stats} />

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
              <FeaturedDecks decks={decks} onUpdate={fetchData} />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Container>
    </>
  )
}
