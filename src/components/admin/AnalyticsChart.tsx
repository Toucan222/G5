'use client'

import { Paper, Text, SegmentedControl } from '@mantine/core'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DailyStats {
  date: string
  newUsers: number
  activeUsers: number
  cardsCreated: number
}

interface AnalyticsChartProps {
  data: DailyStats[]
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [metric, setMetric] = useState<'users' | 'cards'>('users')

  const chartData = useMemo(() => {
    return data.map(day => ({
      date: new Date(day.date).toLocaleDateString(),
      'New Users': day.newUsers,
      'Active Users': day.activeUsers,
      'Cards Created': day.cardsCreated
    }))
  }, [data])

  return (
    <Paper withBorder p="md" radius="md">
      <Text size="xl" fw={500} mb="md">
        Activity Overview
      </Text>

      <SegmentedControl
        value={metric}
        onChange={(value: 'users' | 'cards') => setMetric(value)}
        data={[
          { label: 'Users', value: 'users' },
          { label: 'Cards', value: 'cards' }
        ]}
        mb="md"
      />

      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            {metric === 'users' ? (
              <>
                <Line 
                  type="monotone" 
                  dataKey="New Users" 
                  stroke="#228be6" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Active Users" 
                  stroke="#40c057" 
                  strokeWidth={2} 
                />
              </>
            ) : (
              <Line 
                type="monotone" 
                dataKey="Cards Created" 
                stroke="#be4bdb" 
                strokeWidth={2} 
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  )
}
