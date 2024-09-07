export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      email: {
        Row: {
          body: string | null
          body_html: string | null
          created_at: string | null
          date: string | null
          id: number
          received_date: string | null
          recipients: string[] | null
          screenshot_id: number | null
          sender_id: number
          size: number | null
          subject: string | null
          uid: number
        }
        Insert: {
          body?: string | null
          body_html?: string | null
          created_at?: string | null
          date?: string | null
          id?: number
          received_date?: string | null
          recipients?: string[] | null
          screenshot_id?: number | null
          sender_id: number
          size?: number | null
          subject?: string | null
          uid: number
        }
        Update: {
          body?: string | null
          body_html?: string | null
          created_at?: string | null
          date?: string | null
          id?: number
          received_date?: string | null
          recipients?: string[] | null
          screenshot_id?: number | null
          sender_id?: number
          size?: number | null
          subject?: string | null
          uid?: number
        }
        Relationships: [
          {
            foreignKeyName: "email_screenshot_id_fkey"
            columns: ["screenshot_id"]
            isOneToOne: false
            referencedRelation: "email_screenshot"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "sender"
            referencedColumns: ["id"]
          },
        ]
      }
      email_screenshot: {
        Row: {
          base_64: string
          created_at: string
          email_id: number
          id: number
        }
        Insert: {
          base_64: string
          created_at?: string
          email_id: number
          id?: number
        }
        Update: {
          base_64?: string
          created_at?: string
          email_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "email_screenshot_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: true
            referencedRelation: "email"
            referencedColumns: ["id"]
          },
        ]
      }
      sender: {
        Row: {
          address: string
          created_at: string
          id: number
          logo: string | null
          name: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: number
          logo?: string | null
          name: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: number
          logo?: string | null
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
