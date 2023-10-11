import SignInButton from '@/components/SignInButton'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import NextJsLogo from '../components/NextJsLogo'
import SupabaseLogo from '../components/SupabaseLogo'

import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const session = await getSession()

  return (
    <div className='w-full flex flex-col items-center'>
      <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
        <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground'>
          <div className='flex-1' />
          {session ? (
            <div className='flex items-center gap-4'>
              <LogoutButton />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </nav>

      <div className='animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground'>
        <div className='flex flex-col items-center mb-4 lg:mb-12'>
          <div className='flex gap-8 justify-center items-center'>
            <Link href='https://supabase.com/' target='_blank'>
              <SupabaseLogo />
            </Link>
            <span className='border-l rotate-45 h-6' />
            <NextJsLogo />
          </div>
          <h1 className='sr-only'>Supabase and Next.js Starter Template</h1>
          <p className='text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12'>
            The fastest way to start building apps with{' '}
            <strong>Supabase</strong> and <strong>Next.js</strong>
          </p>

          {session ? (
            <Link
              href='/protected'
              className='transition ease-in-out duration-100 bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background hover:bg-foreground/80'
            >
              Access protected route
            </Link>
          ) : (
            <SignInButton label='Login to access protected route' />
          )}
        </div>
      </div>
    </div>
  )
}
