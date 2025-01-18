import { Container, Stack, Text, Loader } from '@mantine/core'

export default function Loading() {
  return (
    <Container size="lg">
      <Stack align="center" justify="center" h="100vh">
        <Loader size="lg" />
        <Text size="lg">Loading FlashRank...</Text>
      </Stack>
    </Container>
  )
}
