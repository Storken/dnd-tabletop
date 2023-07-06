'use client'
import useCampaignList from '@/contexts/campaign-list'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { currentCampaign } = useCampaignList()
  return (
    <div
      className={`p-4 sm:p-24 mt-28 h-full ${
        Boolean(currentCampaign) ? 'sm:ml-44 md:ml-60' : ''
      }`}
    >
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}
