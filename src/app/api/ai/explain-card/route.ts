import { OpenAI } from 'openai'
import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { cardId, title, facts, scoreboard } = await req.json()

    if (!cardId || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const prompt = `
Summarize this trading card data in a concise, engaging way:

Title: ${title}
Quick Facts: ${facts.join(', ')}
Scores: ${Object.entries(scoreboard)
  .map(([key, value]) => `${key}: ${value}`)
  .join(', ')}

Provide a 2-3 sentence summary highlighting the most interesting aspects.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7
    })

    const summary = completion.choices[0].message.content

    if (summary) {
      // Cache the summary
      await supabaseAdmin
        .from('ai_summaries')
        .upsert({
          card_id: cardId,
          summary,
          generated_at: new Date().toISOString()
        })

      return NextResponse.json({ summary })
    }

    throw new Error('No summary generated')
  } catch (error) {
    console.error('AI Summary error:', error)
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    )
  }
}
