'use client'

import { Table, Button, Text, Group, Badge, ActionIcon, Menu } from '@mantine/core'
import { IconDots, IconBan, IconCrown, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { AdminProfile } from '@/types/admin'

interface UsersTableProps {
  users: AdminProfile[]
  onUpdate: () => void
}

export function UsersTable({ users, onUpdate }: UsersTableProps) {
  const [loading, setLoading] = useState(false)

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    setLoading(true)
    await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)
    onUpdate()
    setLoading(false)
  }

  const handleBanUser = async (userId: string) => {
    setLoading(true)
    await supabase.auth.admin.updateUserById(userId, { banned: true })
    onUpdate()
    setLoading(false)
  }

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Email</Table.Th>
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
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>
              <Badge
                color={user.role === 'admin' ? 'blue' : 'gray'}
              >
                {user.role}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Badge
                color={user.subscription_status === 'active' ? 'green' : 'gray'}
              >
                {user.subscription_status || 'free'}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Text size="sm">
                {new Date(user.created_at).toLocaleDateString()}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text size="sm">
                {new Date(user.last_sign_in).toLocaleDateString()}
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
                    onClick={() => handleBanUser(user.id)}
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
