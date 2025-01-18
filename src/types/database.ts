export interface Database {
  public: {
    Tables: {
      decks: {
        Row: {
          id: string
          title: string
          description: string
          user_id: string
          created_at: string
          is_public: boolean
          is_featured?: boolean
        }
        Insert: {
          id?: string
          title: string
          description?: string
          user_id: string
          created_at?: string
          is_public?: boolean
          is_featured?: boolean
        }
        Update: {
          title?: string
          description?: string
          is_public?: boolean
          is_featured?: boolean
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
        Insert: {
          id?: string
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
          created_at?: string
        }
        Update: {
          title?: string
          image_url?: string
          quick_facts?: string[]
          scoreboard?: Record<string, number>
          content_blocks?: Array<{
            text?: string
            link?: string
            audio_url?: string
          }>
        }
      }
      // ... other tables
    }
  }
}
