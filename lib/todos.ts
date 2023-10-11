import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'
import { authConfig } from './auth'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

async function getTodos() {
  const session = await getServerSession(authConfig)

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: { Authorization: `Bearer ${session.supabaseAccessToken}` },
      },
    }
  )

  const { data, error } = await supabase.from('todos').select('*')

  return data
}

export { getTodos }
