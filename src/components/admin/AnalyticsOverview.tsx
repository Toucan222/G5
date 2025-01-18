'use client'

import { SimpleGrid, Paper, Text, Group, RingProgress } from '@mantine/core'
import { IconUsers, IconCrown, IconCards, IconChartBar } from '@tabler/icons-react'

interface AnalyticsOverviewProps {
  totalUsers: number
  activeUsers: number
  premiumUsers: number
  totalDecks: number
  totalCards: number
}

export function AnalyticsOverview({
  totalUsers,
  activeUsers,
  premiumUsers,
  totalDecks,
  totalCards
}: AnalyticsOverviewProps) {
  const activeRate = totalUsers ? (activeUsers / totalUsers) * 100 : 0
  const premiumRate = totalUsers ? (premiumUsers / totalUsers) * 100 : 0

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
      <Paper withBorder radius="md" p="md">
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: 100, color: 'blue' }]}
            label={<IconUsers size={20} />}
          />
          <div>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              Total Users
            </Text>
            <Text fw={700} size="xl">
              {totalUsers}
            </Text>
          </div>
        </Group>
      </Paper>

      <Paper withBorder radius="md" p="md">
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: activeRate, color: 'green' }]}
            label={<IconChartBar size={20} />}
          />
          <div>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              Active Users
            </Text>
            <Text fw={700} size="xl">
              {activeUsers}
            </Text>
          </div>
        </Group>
      </Paper>

      <Paper withBorder radius="md" p="md">
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: premiumRate, color: 'yellow' }]}
            label={<IconCrown size={20} />}
          />
          <div>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              Premium Users
            </Text>
            <Text fw={700} size="xl">
              {premiumUsers}
            </Text>
          </div>
        </Group>
      </Paper>

      <Paper withBorder radius="md" p="md">
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: 100, color: 'grape' }]}
            label={<IconCards size={20} />}
          />
          <div>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              Total Cards
            </Text>
            <Text fw={700} size="xl">
              {totalCards}
            </Text>
            <Text size="xs" c="dimmed">
              Across {totalDecks} decks
            </Text>
          </div>
        </Group>
      </Paper>
    </SimpleGrid>
  )
}
