'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { IconFidgetSpinner } from '@tabler/icons-react'
import useUserList from '@/contexts/user-list'

export default function Page () {
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const { createUser } = useUserList()
  const router = useRouter()

  const createUserAndRedirect = useCallback(async () => {
    if (user) {
      await createUser({
        uid: user.id,
        email: user.emailAddresses[0].emailAddress,
        displayName: user?.username ?? ''
      })
      router.replace('/app/campaigns')
    }
  }, [createUser, router, user])

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      createUserAndRedirect()
    }
  }, [createUser, createUserAndRedirect, isLoaded, isSignedIn, user])

  if (!isLoaded) return <></>

  return (
    <main className='mx-auto flex items-center flex-col'>
      <span className='text-xl font-bold'>Loading</span>
      <IconFidgetSpinner className='animate-spin' />
    </main>
  )
}
