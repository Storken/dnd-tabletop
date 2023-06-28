import { createContext, ReactNode, useContext, useState } from 'react'

type Campaign = {
  id: string
  name: string
}

type CampaignListContextProps = {
  loading: boolean
  currentCampaign: Campaign
  allCampaigns: Campaign[]
}

type CampaignProviderProps = {
  children: ReactNode
}

export const CampaignListContext: React.Context<CampaignListContextProps> =
  createContext<CampaignListContextProps>({} as CampaignListContextProps)

export const CampaignListContextProvider = ({
  children
}: CampaignProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [currentCampaign, setCurrentCampaign] = useState<Campaign>({
    id: 'abc',
    name: 'Campaign1'
  })
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([
    { id: 'abc', name: 'Campaign1' },
    { id: '123', name: 'Campaign2' }
  ])

  return (
    <CampaignListContext.Provider
      value={{
        loading,
        currentCampaign,
        allCampaigns
      }}
    >
      {children}
    </CampaignListContext.Provider>
  )
}

export default function useCampaignList () {
  const context = useContext(CampaignListContext)

  return context
}
