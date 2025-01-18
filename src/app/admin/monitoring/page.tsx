'use client'

import { Container, Title, Paper, Table, Badge, Stack, Group, Text } from '@mantine/core'
import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { supabase } from '@/lib/supabase'

interface LogEvent {
  level: 'info' | 'warn' | 'error'
  message: string
  context?: Record<string, any>
  timestamp: string
}

export default function Monitoring() {
  const [logs, setLogs] = useState<LogEvent[]>([])
  const [health, setHealth] = useState<any>(null)

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from('system_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100)

      if (data) {
        setLogs(data)
      }
    }

    const checkHealth = async () => {
      const response = await fetch('/api/health', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_HEALTH_CHECK_API_KEY!
        }
      })
      const data = await response.json()
      setHealth(data)
    }

    fetchLogs()
    checkHealth()

    // Set up real-time subscription for logs
    const subscription = supabase
      .channel('system_logs')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'system_logs' 
      }, payload => {
        setLogs(current => [payload.new as LogEvent, ...current].slice(0, 100))
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      <Header />
      <Container size="lg" mt="xl">
        <Title mb="xl">System Monitoring</Title>

        {health && (
          <Paper p="md" mb="xl">
            <Stack>
              <Group>
                <Text fw={500}>System Status:</Text>
                <Badge 
                  color={
                    health.status === 'healthy' ? 'green' : 
                    health.status === 'degraded' ? 'yellow' : 'red'
                  }
                >
                  {health.status}
                </Badge>
              </Group>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Service</Table.Th>
                    <Table.Th>Status</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {Object.entries(health.checks).map(([service, status]) => (
                    <Table.Tr key={service}>
                      <Table.Td>{service}</Table.Td>
                      <Table.Td>
                        <Badge color={status ? 'green' : 'red'}>
                          {status ? 'Operational' : 'Down'}
                        </Badge>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Stack>
          </Paper>
        )}

        <Paper p="md">
          <Title order={3} mb="md">System Logs</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Timestamp</Table.Th>
                <Table.Th>Level</Table.Th>
                <Table.Th>Message</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {logs.map((log, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    {new Date(log.timestamp).toLocaleString()}
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={
                        log.level === 'error' ? 'red' :
                        log.level === 'warn' ? 'yellow' : 'blue'
                      }
                    >
                      {log.level}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{log.message}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Container>
    </>
  )
}
