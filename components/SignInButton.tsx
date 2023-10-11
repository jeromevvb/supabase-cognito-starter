'use client'

import { signIn } from 'next-auth/react'

export default function SignInButton(props: { label?: string }) {
  const { label = 'Login' } = props
  return (
    <button
      onClick={() => signIn()}
      className='py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
    >
      {label}
    </button>
  )
}
