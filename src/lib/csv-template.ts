export const CSV_HEADERS = [
  'title',
  'image_url',
  'quick_facts',
  'scoreboard',
  'text_block',
  'link_block',
  'audio_block'
] as const

export const SAMPLE_CSV_CONTENT = `title,image_url,quick_facts,scoreboard,text_block,link_block,audio_block
"Ancient Rome","https://example.com/rome.jpg","Founded in 753 BCE|Lasted over 1000 years","{\"power\":95,\"culture\":90}","The Roman Empire was vast","https://learn.more/rome","https://audio.guide/rome"
"Greek Philosophy","","Socrates|Plato|Aristotle","{\"influence\":92,\"complexity\":85}","Classical philosophy","https://learn.more/greek",""
`

export function generateCSVTemplate(): string {
  return SAMPLE_CSV_CONTENT
}

export function validateCSVRow(row: Record<string, string>): string[] {
  const errors: string[] = []

  if (!row.title) {
    errors.push('Title is required')
  }

  try {
    if (row.scoreboard) {
      JSON.parse(row.scoreboard)
    }
  } catch {
    errors.push('Scoreboard must be valid JSON')
  }

  return errors
}
