'use client'

import { Container, Title, Paper, Text, Stack } from '@mantine/core'
import { Header } from '@/components/Header'
import { CSVImport } from '@/components/CSVImport'
import { useParams, useRouter } from 'next/navigation'

export default function ImportPage() {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <Header />
      <Container size="lg" mt="xl">
        <Stack gap="md">
          <Title>Import Cards</Title>
          <Text c="dimmed">
            Upload a CSV file to bulk import cards into your deck. 
            Download the template to see the required format.
          </Text>
          
          <Paper p="md" withBorder>
            <CSVImport 
              deckId={params.id as string}
              onComplete={() => router.push(`/dashboard/decks/${params.id}`)}
            />
          </Paper>
        </Stack>
      </Container>
    </>
  )
}
