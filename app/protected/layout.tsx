import { authConfig } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function LayoutProtected({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authConfig)

  // if no session we redirect
  if (!session) {
    redirect('/')
  }

  return <>{children}</>
}
