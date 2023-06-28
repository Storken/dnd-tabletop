'use client'

import { SignIn, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page () {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/app/campaigns')
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) return <></>

  return (
    <main className='mx-auto'>
      <SignIn routing='virtual' />
    </main>
  )
}
