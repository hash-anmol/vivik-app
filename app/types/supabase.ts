export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          full_name: string
          birth_date: string | null
          gender: string | null
          profile_picture: string | null
          bio: string | null
          location: Json | null
          interests: string[] | null
          instagram: string | null
          twitter: string | null
          linkedin: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          full_name: string
          birth_date?: string | null
          gender?: string | null
          profile_picture?: string | null
          bio?: string | null
          location?: Json | null
          interests?: string[] | null
          instagram?: string | null
          twitter?: string | null
          linkedin?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string
          birth_date?: string | null
          gender?: string | null
          profile_picture?: string | null
          bio?: string | null
          location?: Json | null
          interests?: string[] | null
          instagram?: string | null
          twitter?: string | null
          linkedin?: string | null
        }
      }
      user_photos: {
        Row: {
          id: string
          user_id: string
          photo_url: string
          caption: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          photo_url: string
          caption?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          photo_url?: string
          caption?: string | null
          created_at?: string
        }
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
  }
} 