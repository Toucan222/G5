'use client'

import { SimpleGrid, Paper, Text, Group, RingProgress } from '@mantine/core'
import { IconUsers, IconCrown, IconActivity } from '@tabler/icons-react'

interface StatsOverviewProps {
  totalUsers: number
  activeUsers: number
  premiumUsers: number
}

export function StatsOverview({ totalUsers, activeUsers, premiumUsers }: StatsOverviewProps) {
  // ... component code remains the same
}
