'use client'
import { ThemeProvider } from 'next-themes'
import { config } from '@/utils/config'
import { useRouter } from 'next/navigation'
import { CampaignListContextProvider } from '@/contexts/campaign-list'

type Props = {
  children: React.ReactNode
}

export function Providers ({ children }: Props) {
  const router = useRouter()

  return (
    <ThemeProvider attribute='class'>
      <CampaignListContextProvider>{children}</CampaignListContextProvider>
    </ThemeProvider>
  )
}
