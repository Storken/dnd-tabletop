'use client'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='p-4 sm:ml-64 mt-24 h-full'>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}
