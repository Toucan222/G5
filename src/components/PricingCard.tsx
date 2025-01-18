'use client'

import { Card, Text, Button, List, Group, Badge, Stack } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  priceId?: string
  popular?: boolean
  onSubscribe?: (priceId: string) => void
  loading?: boolean
}

export function PricingCard({
  title,
  price,
  features,
  priceId,
  popular,
  onSubscribe,
  loading
}: PricingCardProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="xl" fw={500}>{title}</Text>
          {popular && <Badge color="blue">Most Popular</Badge>}
        </Group>

        <Text size="xl" fw={700}>
          {price}
        </Text>

        <List
          spacing="sm"
          size="sm"
          center
          icon={
            <ThemeIcon size={20} radius="xl" color="blue">
              <IconCheck size={12} />
            </ThemeIcon>
          }
        >
          {features.map((feature, index) => (
            <List.Item key={index}>{feature}</List.Item>
          ))}
        </List>

        <Button
          fullWidth
          onClick={() => priceId && onSubscribe?.(priceId)}
          loading={loading}
          disabled={!priceId}
          variant={popular ? 'filled' : 'light'}
        >
          {priceId ? 'Subscribe Now' : 'Coming Soon'}
        </Button>
      </Stack>
    </Card>
  )
}
