'use client'

import { Container, Title, Text, Button, Group, SimpleGrid, Modal } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import { Header } from '@/components/Header'
import { CardViewer } from '@/components/CardViewer'
import { CardForm } from '@/components/CardForm'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Deck {
  id: string
  title: string
  description: string
  user_id: string
  created_at: string
  is_public: boolean
}

interface Card {
  id: string
  deck_id: string
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

export default function DeckView() {
  const [deck, setDeck] = useState<Deck | null>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [showCardForm, setShowCardForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        // Fetch deck details
        const { data: deckData, error: deckError } = await supabase
          .from('decks')
          .select('*')
          .eq('id', params.id)
          .single()

        if (deckError) throw deckError

        setDeck(deckData)

        // Fetch cards for this deck
        const { data: cardsData, error: cardsError } = await supabase
          .from('cards')
          .select('*')
          .eq('deck_id', params.id)
          .order('created_at', { ascending: false })

        if (cardsError) throw cardsError

        setCards(cardsData || [])
      } catch (error) {
        console.error('Error fetching deck:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchDeck()
    }
  }, [params.id])

  const handleCardAdded = async () => {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('deck_id', params.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setCards(data || [])
      setShowCardForm(false)
    } catch (error) {
      console.error('Error refreshing cards:', error)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <Container size="lg" mt="xl">
          <Text>Loading...</Text>
        </Container>
      </>
    )
  }

  if (!deck) {
    return (
      <>
        <Header />
        <Container size="lg" mt="xl">
          <Text>Deck not found</Text>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header />
      <Container size="lg" mt="xl">
        <Group justify="space-between" mb="xl">
          <div>
            <Title>{deck.title}</Title>
            <Text c="dimmed">{deck.description}</Text>
          </div>
          <Group>
            <Button
              variant="light"
              component={Link}
              href={`/dashboard/decks/${params.id}/import`}
              leftSection={<IconUpload size={16} />}
            >
              Import CSV
            </Button>
            <Button onClick={() => setShowCardForm(true)}>
              Add Card
            </Button>
          </Group>
        </Group>

        {cards.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl">
            No cards yet. Add your first card or import from CSV.
          </Text>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {cards.map((card) => (
              <CardViewer key={card.id} card={card} />
            ))}
          </SimpleGrid>
        )}

        <Modal
          opened={showCardForm}
          onClose={() => setShowCardForm(false)}
          title="Add New Card"
          size="xl"
        >
          <CardForm 
            deckId={params.id as string} 
            onComplete={handleCardAdded}
          />
        </Modal>
      </Container>
    </>
  )
}
