'use client'

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Card,
  SimpleGrid,
  ThemeIcon,
  Box,
  rem
} from '@mantine/core'
import {
  IconBrain,
  IconCards,
  IconChartBar,
  IconRobot,
  IconTrophy,
  IconCheck
} from '@tabler/icons-react'
import Link from 'next/link'
import { DemoCard } from '@/components/DemoCard'

const features = [
  {
    icon: IconCards,
    title: 'Interactive Cards',
    description: 'Explore information through our unique 3-screen card interface, making learning intuitive and engaging.'
  },
  {
    icon: IconChartBar,
    title: 'Smart Rankings',
    description: 'Compare and analyze with dynamic scoreboards and customizable metrics.'
  },
  {
    icon: IconBrain,
    title: 'AI-Powered Insights',
    description: 'Get intelligent explanations and summaries powered by advanced AI technology.'
  },
  {
    icon: IconTrophy,
    title: 'Achievement System',
    description: 'Stay motivated with streaks, badges, and rewards for consistent learning.'
  }
]

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <Box
        style={{
          background: 'linear-gradient(45deg, var(--mantine-color-blue-filled) 0%, var(--mantine-color-indigo-filled) 100%)',
          color: 'white',
          paddingTop: rem(80),
          paddingBottom: rem(80)
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
              FlashRank revolutionizes how you explore and compare information
              through interactive cards and intelligent rankings.
            </Text>
            <Group>
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

      {/* Demo Section */}
      <Container size="lg" py={80}>
        <Stack gap={50}>
          <Title order={2} ta="center" mb="xl">
            Experience the Future of Learning
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Stack justify="center">
              <Text size="lg" mb="md">
                Our innovative 3-screen card system lets you:
              </Text>
              <Group gap="md">
                <ThemeIcon size={24} radius="xl" color="blue">
                  <IconCheck size={16} />
                </ThemeIcon>
                <Text>View quick facts and images at a glance</Text>
              </Group>
              <Group gap="md">
                <ThemeIcon size={24} radius="xl" color="blue">
                  <IconCheck size={16} />
                </ThemeIcon>
                <Text>Compare detailed metrics and rankings</Text>
              </Group>
              <Group gap="md">
                <ThemeIcon size={24} radius="xl" color="blue">
                  <IconCheck size={16} />
                </ThemeIcon>
                <Text>Access in-depth content and resources</Text>
              </Group>
              <Group gap="md">
                <ThemeIcon size={24} radius="xl" color="blue">
                  <IconCheck size={16} />
                </ThemeIcon>
                <Text>Get AI-powered explanations</Text>
              </Group>
            </Stack>
            <DemoCard />
          </SimpleGrid>
        </Stack>
      </Container>

      {/* Features Grid */}
      <Box bg="gray.0" py={80}>
        <Container size="lg">
          <Title order={2} ta="center" mb={50}>
            Why Choose FlashRank?
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={30}>
            {features.map((feature, index) => (
              <Card key={index} shadow="sm" padding="lg" radius="md">
                <ThemeIcon
                  size={50}
                  radius="md"
                  variant="light"
                  color="blue"
                  mb="md"
                >
                  <feature.icon size={30} />
                </ThemeIcon>
                <Text fw={500} size="lg" mb="sm">
                  {feature.title}
                </Text>
                <Text size="sm" c="dimmed">
                  {feature.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="blue.6" c="white" py={80}>
        <Container size="lg">
          <Stack align="center" gap="xl">
            <Title order={2} ta="center">
              Ready to Transform Your Learning?
            </Title>
            <Text size="lg" maw={600} ta="center">
              Join thousands of users who are already discovering a better way to
              learn and organize information.
            </Text>
            <Button
              component={Link}
              href="/auth/signup"
              size="lg"
              variant="white"
              color="dark"
            >
              Start Free Trial
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
