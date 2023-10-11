import NextAuth, { DefaultSession } from 'next-auth'
import { Database as SupabaseDatabase } from '@/supabase/database.types'

declare global {
  type Database = SupabaseDatabase
  type Tables<T extends keyof SupabaseDatabase['public']['Tables']> =
    SupabaseDatabase['public']['Tables'][T]['Row']

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
      SUPABASE_SERVICE_ROLE_KEY: string
      SUPABASE_JWT_SECRET: string
      COGNITO_CLIENT_ID: string
      COGNITO_CLIENT_SECRET: string
      COGNITO_ISSUER: string
    }
  }
}

declare module 'next-auth' {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    supabaseAccessToken?: string
    user: {
      // he user's postal address
      address: string
    } & DefaultSession['user']
  }
}

export {}
