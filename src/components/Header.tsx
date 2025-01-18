'use client'

import { Header as MantineHeader, Group, Button, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <MantineHeader height={60} px="md">
      <Group justify="space-between" h="100%">
        <Title order={3}>FlashRank</Title>
        <Group>
          <Button variant="subtle" onClick={() => router.push('/dashboard')}>
            Dashboard
          </Button>
          <Button variant="subtle" onClick={() => router.push('/profile')}>
            Profile
          </Button>
          <Button variant="light" onClick={handleLogout}>
            Logout
          </Button>
        </Group>
      </Group>
    </MantineHeader>
  )
}
