'use client'

import { Table, Badge, ActionIcon, Menu, Text } from '@mantine/core'
import { IconDots, IconBan, IconCrown } from '@tabler/icons-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type Subscription = Database['public']['Tables']['subscriptions']['Row']

interface UserWithSubscription extends Profile {
  subscriptions: Pick<Subscription, 'status'>[] | null
}

interface UsersTableProps {
  users: UserWithSubscription[]
  onUpdate: () => void
}

export function UsersTable({ users, onUpdate }: UsersTableProps) {
  const [loading, setLoading] = useState(false)

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error
      onUpdate()
    } catch (error) {
      console.error('Error updating role:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Joined</Table.Th>
          <Table.Th>Last Active</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((user) => (
          <Table.Tr key={user.id}>
            <Table.Td>{user.user_id}</Table.Td>
            <Table.Td>
              <Badge color={user.role === 'admin' ? 'blue' : 'gray'}>
                {user.role}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Badge
                color={user.subscriptions?.[0]?.status === 'active' ? 'green' : 'gray'}
              >
                {user.subscriptions?.[0]?.status || 'free'}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Text size="sm">
                {new Date(user.created_at).toLocaleDateString()}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text size="sm">
                {user.last_sign_in 
                  ? new Date(user.last_sign_in).toLocaleDateString()
                  : 'Never'
                }
              </Text>
            </Table.Td>
            <Table.Td>
              <Menu shadow="md">
                <Menu.Target>
                  <ActionIcon variant="subtle">
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconCrown size={14} />}
                    onClick={() => handleRoleUpdate(user.id, 
                      user.role === 'admin' ? 'user' : 'admin'
                    )}
                    disabled={loading}
                  >
                    {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={<IconBan size={14} />}
                    disabled={loading}
                  >
                    Ban User
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
