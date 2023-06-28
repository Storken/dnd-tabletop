'use client'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='p-4 sm:ml-64 md:ml-80 mt-28 h-full'>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}
