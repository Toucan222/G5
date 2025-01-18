'use client'

import { Card, Image, Text, Group, Stack, Progress, Box, Button } from '@mantine/core'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { useState } from 'react'

interface CardData {
  id: string
  title: string
  image_url?: string
  quick_facts: string[]
  scoreboard: Record<string, number>
  content_blocks: Array<{
    text?: string
    link?: string
    audio_url?: string
  }>
}

interface CardViewerProps {
  card: CardData
}

export function CardViewer({ card }: CardViewerProps) {
  const [screen, setScreen] = useState(0)

  const screens = [
    <Stack key="overview" gap="md">
      {card.image_url && (
        <Image
          src={card.image_url}
          height={200}
          alt={card.title}
          fallbackSrc="https://placehold.co/400x200"
        />
      )}
      <Text fw={700} size="lg">{card.title}</Text>
      <Box>
        {card.quick_facts.map((fact, i) => (
          <Text key={i} size="sm" c="dimmed">{fact}</Text>
        ))}
      </Box>
    </Stack>,

    <Stack key="scoreboard" gap="lg">
      <Text fw={700} size="lg">Performance Metrics</Text>
      {Object.entries(card.scoreboard).map(([key, value]) => (
        <Box key={key}>
          <Group justify="space-between" mb={5}>
            <Text size="sm">{key}</Text>
            <Text size="sm">{value}%</Text>
          </Group>
          <Progress value={value} color="blue" />
        </Box>
      ))}
    </Stack>,

    <Stack key="content" gap="lg">
      <Text fw={700} size="lg">Additional Content</Text>
      {card.content_blocks.map((block, index) => (
        <Box key={index}>
          {block.text && <Text>{block.text}</Text>}
          {block.link && (
            <Button 
              component="a" 
              href={block.link} 
              target="_blank" 
              variant="light"
              fullWidth
            >
              Learn More
            </Button>
          )}
          {block.audio_url && (
            <audio controls style={{ width: '100%' }}>
              <source src={block.audio_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </Box>
      ))}
    </Stack>
  ]

  return (
    <Card shadow="md" padding="lg" radius="md">
      {screens[screen]}
      <Group justify="space-between" mt="md">
        <Button
          variant="light"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => setScreen(s => Math.max(0, s - 1))}
          disabled={screen === 0}
        >
          Previous
        </Button>
        <Text size="sm" c="dimmed">
          {screen + 1} / {screens.length}
        </Text>
        <Button
          variant="light"
          rightSection={<IconArrowRight size={16} />}
          onClick={() => setScreen(s => Math.min(screens.length - 1, s + 1))}
          disabled={screen === screens.length - 1}
        >
          Next
        </Button>
      </Group>
    </Card>
  )
}
