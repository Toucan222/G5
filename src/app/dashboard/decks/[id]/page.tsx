'use client'

import { Container, Title, Text, Button, Group, SimpleGrid, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Header } from '@/components/Header'
import { CardViewer } from '@/components/CardViewer'
import { CardForm } from '@/components/CardForm'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'

// ... rest of the imports

export default function DeckView() {
  const [opened, { open, close }] = useDisclosure(false)
  // ... rest of the state

  return (
    <>
      <Header />
      <Container size="lg" mt="xl">
        <Group justify="space-between" mb="xl">
          <div>
            <Title>{deck?.title}</Title>
            <Text c="dimmed">{deck?.description}</Text>
          </div>
          <Button onClick={open}>Add Card</Button>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {cards.map((card) => (
            <CardViewer key={card.id} card={card} />
          ))}
        </SimpleGrid>

        <Modal 
          opened={opened} 
          onClose={close}
          title="Add New Card"
          size="xl"
          centered
        >
          <CardForm deckId={params.id as string} onComplete={() => {
            close()
            fetchCards()
          }} />
        </Modal>
      </Container>
    </>
  )
}
