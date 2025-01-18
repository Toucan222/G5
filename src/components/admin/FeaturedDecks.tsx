'use client'

import { Table, Switch, Text, Group, Stack } from '@mantine/core'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Deck = Database['public']['Tables']['decks']['Row']

export function FeaturedDecks() {
  const [decks, setDecks] = useState<Deck[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const { data } = await supabase
          .from('decks')
          .select(`
            *,
            profiles (
              user_id
            )
          `)
          .order('created_at', { ascending: false })

        if (data) {
          setDecks(data)
        }
      } catch (error) {
        console.error('Error fetching decks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDecks()
  }, [])

  const handleToggleFeatured = async (deckId: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('decks')
        .update({ is_featured: featured })
        .eq('id', deckId)

      if (error) throw error

      setDecks(decks.map(deck => 
        deck.id === deckId 
          ? { ...deck, is_featured: featured }
          : deck
      ))
    } catch (error) {
      console.error('Error updating deck:', error)
    }
  }

  if (loading) {
    return <Text>Loading decks...</Text>
  }

  if (decks.length === 0) {
    return (
      <Stack align="center" py="xl">
        <Text c="dimmed">No decks available</Text>
      </Stack>
    )
  }

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Created</Table.Th>
          <Table.Th>Public</Table.Th>
          <Table.Th>Featured</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {decks.map((deck) => (
          <Table.Tr key={deck.id}>
            <Table.Td>{deck.title}</Table.Td>
            <Table.Td>
              <Text size="sm">
                {new Date(deck.created_at).toLocaleDateString()}
              </Text>
            </Table.Td>
            <Table.Td>
              <Switch
                checked={deck.is_public}
                onChange={(event) => 
                  handleToggleFeatured(deck.id, event.currentTarget.checked)
                }
                disabled={loading}
              />
            </Table.Td>
            <Table.Td>
              <Switch
                checked={deck.is_featured || false}
                onChange={(event) => 
                  handleToggleFeatured(deck.id, event.currentTarget.checked)
                }
                disabled={loading}
              />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
