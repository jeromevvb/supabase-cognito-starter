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
      todos: {
        Row: {
          content: string | null
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'todos_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          email: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          email?: string | null
          id: string
          image?: string | null
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      decrypted_todos: {
        Row: {
          content: string | null
          created_at: string | null
          decrypted_content: string | null
          id: number | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          decrypted_content?: never
          id?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          decrypted_content?: never
          id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'todos_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
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
      todos: {
        Row: {
          content: string | null
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'todos_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          email: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          email?: string | null
          id: string
          image?: string | null
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      decrypted_todos: {
        Row: {
          content: string | null
          created_at: string | null
          decrypted_content: string | null
          id: number | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          decrypted_content?: never
          id?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          decrypted_content?: never
          id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'todos_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
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
