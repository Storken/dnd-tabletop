'use client'
import { ThemeProvider } from 'next-themes'
import { CampaignListContextProvider } from '@/contexts/campaign-list'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import '@/utils/firebase'

type Props = {
  children: React.ReactNode
}

export function Providers ({ children }: Props) {
  const { getToken } = useAuth()

  useEffect(() => {
    const signInWithClerk = async () => {
      const auth = getAuth()
      const token = await getToken({ template: 'integration_firebase' })

      if (!token) return

      const userCredentials = await signInWithCustomToken(auth, token)

      /**
       * The userCredentials.user object will call the methods of
       * the Firebase platform as an authenticated user.
       */
      console.log('user ::', userCredentials.user)
    }

    signInWithClerk()
  }, [])

  return (
    <ThemeProvider attribute='class'>
      <CampaignListContextProvider>{children}</CampaignListContextProvider>
    </ThemeProvider>
  )
}
