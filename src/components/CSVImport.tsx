'use client'

import { useState } from 'react'
import { Group, Text, Button, Table, Alert, Stack, Box } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconX, IconCheck, IconDownload } from '@tabler/icons-react'
import Papa from 'papaparse'
import { notifications } from '@mantine/notifications'
import { generateCSVTemplate, validateCSVRow } from '@/lib/csv-template'

interface CSVImportProps {
  deckId: string
  onComplete: () => void
}

export function CSVImport({ deckId, onComplete }: CSVImportProps) {
  const [parsedData, setParsedData] = useState<any[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [importing, setImporting] = useState(false)

  const downloadTemplate = () => {
    const blob = new Blob([generateCSVTemplate()], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'flashrank-template.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const allErrors: string[] = []
        const validData = results.data.filter((row: any) => {
          const rowErrors = validateCSVRow(row)
          if (rowErrors.length) {
            allErrors.push(`Row "${row.title}": ${rowErrors.join(', ')}`)
            return false
          }
          return true
        })

        setParsedData(validData)
        setErrors(allErrors)

        if (validData.length > 0) {
          notifications.show({
            title: 'CSV Parsed',
            message: `Successfully parsed ${validData.length} cards`,
            color: 'green'
          })
        }

        if (allErrors.length > 0) {
          notifications.show({
            title: 'Some rows had errors',
            message: 'Check the error list below',
            color: 'yellow'
          })
        }
      },
      error: (error) => {
        setErrors(['Failed to parse CSV file: ' + error.message])
        notifications.show({
          title: 'Error',
          message: 'Failed to parse CSV file',
          color: 'red'
        })
      }
    })
  }

  const handleImport = async () => {
    setImporting(true)
    try {
      const formattedData = parsedData.map(row => ({
        deck_id: deckId,
        title: row.title,
        image_url: row.image_url || null,
        quick_facts: row.quick_facts.split('|').filter(Boolean),
        scoreboard: JSON.parse(row.scoreboard || '{}'),
        content_blocks: [
          row.text_block ? { text: row.text_block } : null,
          row.link_block ? { link: row.link_block } : null,
          row.audio_block ? { audio_url: row.audio_block } : null,
        ].filter(Boolean)
      }))

      // Import in batches to avoid timeouts
      const BATCH_SIZE = 50
      for (let i = 0; i < formattedData.length; i += BATCH_SIZE) {
        const batch = formattedData.slice(i, i + BATCH_SIZE)
        const { error } = await supabase
          .from('cards')
          .insert(batch)

        if (error) throw error
      }

      notifications.show({
        title: 'Success',
        message: `Imported ${formattedData.length} cards successfully`,
        color: 'green'
      })

      onComplete()
    } catch (error) {
      console.error('Import error:', error)
      notifications.show({
        title: 'Error',
        message: 'Failed to import cards',
        color: 'red'
      })
    } finally {
      setImporting(false)
    }
  }

  return (
    <Stack gap="md">
      <Group justify="flex-end">
        <Button
          variant="light"
          leftSection={<IconDownload size={16} />}
          onClick={downloadTemplate}
        >
          Download Template
        </Button>
      </Group>

      {errors.length > 0 && (
        <Alert color="red" title="Import Errors">
          <Stack gap="xs">
            {errors.map((error, index) => (
              <Text key={index} size="sm">{error}</Text>
            ))}
          </Stack>
        </Alert>
      )}

      {parsedData.length === 0 ? (
        <Dropzone
          onDrop={(files) => parseCSV(files[0])}
          accept={['text/csv']}
          maxSize={5 * 1024 ** 2}
        >
          <Group justify="center" gap="xl" style={{ minHeight: 120, pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconCheck size={50} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconUpload size={50} stroke={1.5} />
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
        <Box>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Quick Facts</Table.Th>
                <Table.Th>Scoreboard</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {parsedData.map((row, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{row.title}</Table.Td>
                  <Table.Td>{row.quick_facts}</Table.Td>
                  <Table.Td>{row.scoreboard}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Group justify="space-between" mt="md">
            <Button 
              variant="light" 
              onClick={() => {
                setParsedData([])
                setErrors([])
              }}
            >
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
        </Box>
      )}
    </Stack>
  )
}
