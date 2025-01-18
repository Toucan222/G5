'use client'

import { Group, Text, Button, Table, Alert, Stack, rem } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconX, IconCheck } from '@tabler/icons-react'

// ... rest of the imports

export function CSVImport({ deckId, onComplete }: CSVImportProps) {
  // ... rest of the component logic

  return (
    <Stack gap="md">
      {error && (
        <Alert variant="filled" color="red" title="Error">
          {error}
        </Alert>
      )}

      {parsedData.length === 0 ? (
        <Dropzone
          onDrop={(files) => parseCSV(files[0])}
          accept={['text/csv']}
          maxSize={5 * 1024 ** 2}
          style={{ minHeight: rem(120) }}
        >
          <Group justify="center" gap="xl" style={{ pointerEvents: 'none', minHeight: rem(120) }}>
            <Dropzone.Accept>
              <IconCheck style={{ width: rem(50), height: rem(50) }} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX style={{ width: rem(50), height: rem(50) }} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconUpload style={{ width: rem(50), height: rem(50) }} />
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
        // ... rest of the component
      )}
    </Stack>
  )
}
