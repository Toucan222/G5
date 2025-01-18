'use client'

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Box,
  rem
} from '@mantine/core'
import {
  IconBrain,
  IconCards,
  IconChartBar,
  IconTrophy,
  IconCheck
} from '@tabler/icons-react'
import Link from 'next/link'
import { DemoCard } from '@/components/DemoCard'

const features = [
  {
    icon: IconCards,
    title: 'Interactive Cards',
    description: 'Explore information through our unique 3-screen card interface.'
  },
  {
    icon: IconChartBar,
    title: 'Smart Rankings',
    description: 'Compare and analyze with dynamic scoreboards.'
  },
  // ... other features
]

export default function LandingPage() {
  return (
    <>
      <Box
        style={{
          background: 'linear-gradient(45deg, var(--mantine-color-blue-filled) 0%, var(--mantine-color-indigo-filled) 100%)',
          color: 'white',
          paddingBlock: rem(80)
        }}
      >
        <Container size="lg">
          <Stack align="center" gap="xl">
            <Title
              order={1}
              size="h1"
              style={{ fontSize: rem(48) }}
              ta="center"
            >
              Discovery, not search
            </Title>
            <Text size="xl" maw={600} ta="center">
              FlashRank revolutionizes how you explore and compare information.
            </Text>
            <Group gap="md">
              <Button
                component={Link}
                href="/auth/signup"
                size="lg"
                variant="white"
                color="dark"
              >
                Get Started Free
              </Button>
              <Button
                component={Link}
                href="/auth/login"
                size="lg"
                variant="default"
              >
                Login
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      <Container size="lg" py={80}>
        <Stack gap={50}>
          <Title order={2} ta="center">
            Experience the Future of Learning
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Stack justify="center" gap="md">
              <Text size="lg">Our innovative 3-screen card system lets you:</Text>
              {['View quick facts', 'Compare metrics', 'Access resources'].map((text, i) => (
                <Group gap="md" key={i}>
                  <ThemeIcon size={24} radius="xl" color="blue">
                    <IconCheck size={16} />
                  </ThemeIcon>
                  <Text>{text}</Text>
                </Group>
              ))}
            </Stack>
            <DemoCard />
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}
