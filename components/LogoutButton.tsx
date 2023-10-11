'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
    >
      Logout
    </button>
  )
}
