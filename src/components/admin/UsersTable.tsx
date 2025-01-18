'use client'

import { Table, Badge, ActionIcon, Menu, Text } from '@mantine/core'
import { IconDots, IconBan, IconCrown } from '@tabler/icons-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface UsersTableProps {
  users: any[]
  onUpdate: () => void
}

export function UsersTable({ users, onUpdate }: UsersTableProps) {
  // ... component code remains the same
}
