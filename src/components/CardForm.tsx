'use client'

import { TextInput, Button, Stack, Group, Text, Box, ActionIcon, FileInput } from '@mantine/core'
import { useState } from 'react'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { supabase } from '@/lib/supabase'
import { notifications } from '@mantine/notifications'

interface CardFormProps {
  deckId: string
  onComplete: () => void
}

export function CardForm({ deckId, onComplete }: CardFormProps) {
  const [title, setTitle] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [facts, setFacts] = useState<string[]>([''])
  const [scoreboardItems, setScoreboardItems] = useState<{ key: string; value: number }[]>([
    { key: '', value: 0 }
  ])
  const [contentBlocks, setContentBlocks] = useState<
    Array<{ text?: string; link?: string; audio_url?: string }>
  >([{ text: '' }])

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${deckId}/${fileName}`

    const { error: uploadError, data } = await supabase.storage
      .from('card-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from('card-images')
      .getPublicUrl(filePath)

    return urlData.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageUrl = ''
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const scoreboard = scoreboardItems.reduce((acc, item) => {
        if (item.key) {
          acc[item.key] = item.value
        }
        return acc
      }, {} as Record<string, number>)

      const { error } = await supabase
        .from('cards')
        .insert([{
          deck_id: deckId,
          title,
          image_url: imageUrl,
          quick_facts: facts.filter(f => f.trim()),
          scoreboard,
          content_blocks: contentBlocks.filter(block => 
            block.text?.trim() || block.link?.trim() || block.audio_url?.trim()
          )
        }])

      if (error) throw error

      notifications.show({
        title: 'Success',
        message: 'Card created successfully',
        color: 'green'
      })
      
      onComplete()
    } catch (error) {
      console.error('Error creating card:', error)
      notifications.show({
        title: 'Error',
        message: 'Failed to create card',
        color: 'red'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="Card Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FileInput
          label="Card Image"
          accept="image/*"
          onChange={setImageFile}
        />

        <Box>
          <Text fw={500} mb="xs">Quick Facts</Text>
          {facts.map((fact, index) => (
            <Group key={index} mb="xs">
              <TextInput
                placeholder="Enter a quick fact"
                style={{ flex: 1 }}
                value={fact}
                onChange={(e) => {
                  const newFacts = [...facts]
                  newFacts[index] = e.target.value
                  setFacts(newFacts)
                }}
              />
              <ActionIcon
                color="red"
                onClick={() => setFacts(facts.filter((_, i) => i !== index))}
                disabled={facts.length === 1}
                variant="light"
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ))}
          <Button
            size="sm"
            variant="light"
            leftSection={<IconPlus size={16} />}
            onClick={() => setFacts([...facts, ''])}
          >
            Add Fact
          </Button>
        </Box>

        <Box>
          <Text fw={500} mb="xs">Scoreboard</Text>
          {scoreboardItems.map((item, index) => (
            <Group key={index} mb="xs">
              <TextInput
                placeholder="Metric name"
                style={{ flex: 1 }}
                value={item.key}
                onChange={(e) => {
                  const newItems = [...scoreboardItems]
                  newItems[index] = { ...item, key: e.target.value }
                  setScoreboardItems(newItems)
                }}
              />
              <TextInput
                type="number"
                placeholder="Value"
                style={{ width: 100 }}
                value={item.value}
                onChange={(e) => {
                  const newItems = [...scoreboardItems]
                  newItems[index] = { ...item, value: parseInt(e.target.value) || 0 }
                  setScoreboardItems(newItems)
                }}
              />
              <ActionIcon
                color="red"
                onClick={() => setScoreboardItems(items => items.filter((_, i) => i !== index))}
                disabled={scoreboardItems.length === 1}
                variant="light"
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ))}
          <Button
            size="sm"
            variant="light"
            leftSection={<IconPlus size={16} />}
            onClick={() => setScoreboardItems([...scoreboardItems, { key: '', value: 0 }])}
          >
            Add Metric
          </Button>
        </Box>

        <Box>
          <Text fw={500} mb="xs">Content Blocks</Text>
          {contentBlocks.map((block, index) => (
            <Stack key={index} mb="md" gap="sm">
              <TextInput
                label="Text"
                value={block.text || ''}
                onChange={(e) => {
                  const newBlocks = [...contentBlocks]
                  newBlocks[index] = { ...block, text: e.target.value }
                  setContentBlocks(newBlocks)
                }}
              />
              <TextInput
                label="Link"
                value={block.link || ''}
                onChange={(e) => {
                  const newBlocks = [...contentBlocks]
                  newBlocks[index] = { ...block, link: e.target.value }
                  setContentBlocks(newBlocks)
                }}
              />
              <TextInput
                label="Audio URL"
                value={block.audio_url || ''}
                onChange={(e) => {
                  const newBlocks = [...contentBlocks]
                  newBlocks[index] = { ...block, audio_url: e.target.value }
                  setContentBlocks(newBlocks)
                }}
              />
              <Button
                color="red"
                variant="light"
                onClick={() => setContentBlocks(blocks => blocks.filter((_, i) => i !== index))}
                disabled={contentBlocks.length === 1}
              >
                Remove Block
              </Button>
            </Stack>
          ))}
          <Button
            size="sm"
            variant="light"
            leftSection={<IconPlus size={16} />}
            onClick={() => setContentBlocks([...contentBlocks, {}])}
          >
            Add Content Block
          </Button>
        </Box>

        <Button type="submit">Create Card</Button>
      </Stack>
    </form>
  )
}
