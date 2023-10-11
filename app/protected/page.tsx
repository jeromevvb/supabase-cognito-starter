import LogoutButton from '@/components/LogoutButton'
import { getSession, getUser } from '@/lib/auth'
import { getTodos } from '@/lib/todos'

export default async function Page() {
  const user = await getUser()
  const todos = await getTodos()

  return (
    <div className='w-full flex flex-col items-center'>
      <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
        <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground'>
          <div className='flex-1' />

          <div className='flex items-center gap-4'>
            <LogoutButton />
          </div>
        </div>
      </nav>
      <p className='text-3xl text-foreground lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12'>
        My todos
      </p>

      <div className='space-y-4'>
        {todos?.map((todo) => {
          return (
            <div className='flex gap-2 bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background'>
              <input type='checkbox' className='h-4 w-4 text-foreground' />
              <p className=''>{todo.title}</p>
            </div>
          )
        })}
      </div>

      <div className='mt-6 max-w-lg'>
        <p className='text-foreground mb-3'>User: {JSON.stringify(user)}</p>
      </div>
    </div>
  )
}
