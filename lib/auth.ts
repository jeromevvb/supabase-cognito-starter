import { SupabaseAdapter } from '@auth/supabase-adapter'
import CognitoProvider from 'next-auth/providers/cognito'
import jwt from 'jsonwebtoken'
import { getServerSession } from 'next-auth'
import { createClient } from '@supabase/supabase-js'

const authConfig = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      //   domain: process.env.COGNITO_DOMAIN,
      issuer: process.env.COGNITO_ISSUER,
      authorization: {
        params: {
          redirect_uri: process.env.NEXT_PUBLIC_COGNITO_CALLBACK_URL,
        },
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET

      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: 'authenticated',
        }

        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
        session.userId = user.id
      }
      return session
    },
  },
}

async function getSession() {
  return getServerSession(authConfig)
}

async function getUser() {
  const session = await getServerSession(authConfig)
  const supabaseAccessToken = session?.supabaseAccessToken

  if (!supabaseAccessToken) {
    return null
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: { Authorization: `Bearer ${supabaseAccessToken}` },
      },
    }
  )

  const { data, error } = await supabase.from('users').select('*').single()

  if (error) return null

  return data
}

export { authConfig, getUser, getSession }
