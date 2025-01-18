'use client'

import { Container, Title, Stack, Tabs, Paper } from '@mantine/core'
import { IconChartBar, IconUsers, IconCards } from '@tabler/icons-react'
import { Header } from '@/components/Header'
import { AnalyticsOverview } from '@/components/admin/AnalyticsOverview'
import { AnalyticsChart } from '@/components/admin/AnalyticsChart'
import { UsersTable } from '@/components/admin/UsersTable'
import { useState, useEffect } from 'react'
import { getAnalytics, type AnalyticsData } from '@/lib/analytics'

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnalytics()
        setAnalytics(data)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading || !analytics) return null

  return (
    <>
      <Header />
      <Container size="lg" mt="xl">
        <Title mb="xl">Admin Dashboard</Title>

        <Stack gap="xl">
          <AnalyticsOverview {...analytics} />
          
          <AnalyticsChart data={analytics.dailyStats} />

          <Paper withBorder radius="md">
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
                <Tabs.Tab 
                  value="analytics" 
                  leftSection={<IconChartBar size={16} />}
                >
                  Detailed Analytics
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="users" pt="md">
                <UsersTable users={[]} onUpdate={() => {}} />
              </Tabs.Panel>

              <Tabs.Panel value="decks" pt="md">
                {/* Featured Decks management component */}
              </Tabs.Panel>

              <Tabs.Panel value="analytics" pt="md">
                {/* Detailed analytics component */}
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </Stack>
      </Container>
    </>
  )
}
