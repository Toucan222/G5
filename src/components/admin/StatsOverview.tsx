'use client'

import { SimpleGrid, Paper, Text, Group, RingProgress } from '@mantine/core'
import { IconUsers, IconCrown, IconActivity } from '@tabler/icons-react'
import type { UserStats } from '@/types/admin'

interface StatsOverviewProps {
  stats: UserStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const activeRate = (stats.active_users / stats.total_users) * 100
  const premiumRate = (stats.premium_users / stats.total_users) * 100

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
      <Paper withBorder radius="md" p="md">
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: activeRate, color: 'blue' }]}
            label={
              <IconUsers size={20} />
            }
          />
          <div>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              Total Users
            </Text>
            <Text fw={700} size="xl">
              {stats.total_users}
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
            label={
              <IconCrown size={20} />
            }
          />
          <div>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              Premium Users
            </Text>
            <Text fw={700} size="xl">
              {stats.premium_users}
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
            label={
              <IconActivity size={20} />
            }
          />
          <div>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              Active Users
            </Text>
            <Text fw={700} size="xl">
              {stats.active_users}
            </Text>
          </div>
        </Group>
      </Paper>
    </SimpleGrid>
  )
}
