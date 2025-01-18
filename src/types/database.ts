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
          role?: string
          last_sign_in?: string | null
        }
      }
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
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          status: string
          price_id: string
          current_period_end: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          status: string
          price_id: string
          current_period_end: string
          created_at?: string
        }
        Update: {
          status?: string
          current_period_end?: string
        }
      }
      customers: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id: string
          created_at?: string
        }
        Update: {
          stripe_customer_id?: string
        }
      }
    }
  }
}
