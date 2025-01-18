export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          role: string
          created_at: string
          last_sign_in: string | null
        }
        Insert: {
          id?: string
          user_id: string
          role?: string
          created_at?: string
          last_sign_in?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          role?: string
          created_at?: string
          last_sign_in?: string | null
        }
      }
      decks: {
        Row: {
          id: string
          title: string
          description: string
          created_at: string
          user_id: string
          is_featured: boolean
          is_public: boolean
        }
      }
      cards: {
        Row: {
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
          created_at: string
        }
      }
      ai_summaries: {
        Row: {
          id: string
          card_id: string
          summary: string
          generated_at: string
        }
      }
    }
  }
}
