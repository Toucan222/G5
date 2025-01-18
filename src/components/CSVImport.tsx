'use client'

import { useState } from 'react'
import { Group, Text, Button, Table, Alert, Stack, rem } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconX, IconCheck } from '@tabler/icons-react'
import Papa from 'papaparse'
import { supabase } from '@/lib/supabase'
import { notifications } from '@mantine/notifications'

interface CSVCard {
  title: string
  image_url?: string
  quick_facts: string
  scoreboard: string
  text_block?: string
  link_block?: string
  audio_block?: string
}

interface ParsedCard {
  title: string
  image_url?: string
  quick_facts: string[]
  scoreboard: Record<string, number>
  content_blocks: {
    text?: string
    link?: string
    audio_url?: string
  }[]
}

interface CSVImportProps {
  deckId: string
  onComplete: () => void
}

export function CSVImport({ deckId, onComplete }: CSVImportProps) {
  const [parsedData, setParsedData] = useState<ParsedCard[]>([])
  const [error, setError] = useState<string>('')
  const [importing, setImporting] = useState(false)

  const parseCSV = (file: File) => {
    Papa.parse<CSVCard>(file, {
      header: true,
      complete: (results) => {
        try {
          const parsed: ParsedCard[] = results.data
            .filter(row => row.title)
            .map(row => ({
              title: row.title,
              image_url: row.image_url,
              quick_facts: row.quick_facts.split('|').filter(Boolean),
              scoreboard: JSON.parse(row.scoreboard),
              content_blocks: [
                row.text_block ? { text: row.text_block } : null,
                row.link_block ? { link: row.link_block } : null,
                row.audio_block ? { audio_url: row.audio_block } : null,
              ].filter(Boolean) as ParsedCard['content_blocks']
            }))
          setParsedData(parsed)
          setError('')
        } catch (e) {
          setError('Invalid CSV format. Please check the template.')
        }
      },
      error: () => {
        setError('Failed to parse CSV file.')
      }
    })
  }

  const handleImport = async () => {
    setImporting(true)
    try {
      for (const card of parsedData) {
        const { error } = await supabase
          .from('cards')
          .insert([{
            deck_id: deckId,
            ...card
          }])
        
        if (error) throw error
      }
      onComplete()
    } catch (e) {
      setError('Failed to import cards.')
    } finally {
      setImporting(false)
    }
  }

  return (
    <Stack gap="md">
      {error && (
        <Alert color="red" title="Error">
          {error}
        </Alert>
      )}

      {parsedData.length === 0 ? (
        <Dropzone
          onDrop={(files) => parseCSV(files[0])}
          accept={['text/csv']}
          maxSize={5 * 1024 ** 2}
        >
          <Group justify="center" gap="xl" style={{ minHeight: rem(120), pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconCheck size={50} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconUpload size={50} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag CSV here or click to select
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                File should not exceed 5MB
              </Text>
            </div>
          </Group>
        </Dropzone>
      ) : (
        <>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Quick Facts</Table.Th>
                <Table.Th>Scoreboard</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {parsedData.map((card, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{card.title}</Table.Td>
                  <Table.Td>{card.quick_facts.join(', ')}</Table.Td>
                  <Table.Td>
                    {Object.entries(card.scoreboard)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(', ')}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Group justify="space-between">
            <Button variant="light" onClick={() => setParsedData([])}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport} 
              loading={importing}
              disabled={parsedData.length === 0}
            >
              Import {parsedData.length} Cards
            </Button>
          </Group>
        </>
      )}
    </Stack>
  )
}
