'use client'

import { Container, Stack, Text, Button, Title } from '@mantine/core'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Container size="lg">
      <Stack align="center" justify="center" h="100vh" gap="lg">
        <Title order={2} color="red">Something went wrong!</Title>
        <Text>{error.message}</Text>
        <Button onClick={reset}>Try again</Button>
      </Stack>
    </Container>
  )
}
