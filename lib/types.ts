export type Child = {
  id: string
  user_id: string
  name: string
  school_name: string | null
  created_at: string
}

export type Email = {
  id: string
  user_id: string
  from_address: string
  subject: string | null
  body_text: string | null
  raw_html: string | null
  attachment_path: string | null
  processed: boolean
  created_at: string
}

export type ItemStatus = 'pending' | 'added_to_calendar'

export type Item = {
  id: string
  user_id: string
  child_id: string | null
  email_id: string | null
  title: string
  event_date: string | null
  event_time: string | null
  action_required: string | null
  cost: number | null
  status: ItemStatus
  calendar_event_id: string | null
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      children: {
        Row: Child
        Insert: Omit<Child, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Child, 'id'>>
      }
      emails: {
        Row: Email
        Insert: Omit<Email, 'id' | 'created_at' | 'processed'> & { id?: string; created_at?: string; processed?: boolean }
        Update: Partial<Omit<Email, 'id'>>
      }
      items: {
        Row: Item
        Insert: Omit<Item, 'id' | 'created_at' | 'status'> & { id?: string; created_at?: string; status?: ItemStatus }
        Update: Partial<Omit<Item, 'id'>>
      }
    }
  }
}
