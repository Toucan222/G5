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
      // Optional tables for when Stripe is configured
      customers?: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string
          created_at: string
        }
      }
      subscriptions?: {
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
      }
      // ... other tables
    }
  }
}
