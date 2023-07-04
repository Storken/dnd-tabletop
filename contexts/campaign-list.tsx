import { firestoreDb } from '@/utils/firebase'
import { addDoc, collection, deleteDoc, updateDoc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

export type Campaign = {
  id: string
  title: string
}

type CampaignListContextProps = {
  currentCampaign?: Campaign
  setCurrentCampaign: (campaign?: Campaign) => void
  allCampaigns: Campaign[]
  loading: boolean
  createCampaign: () => Promise<boolean>
  removeCampaign: (id: string) => Promise<boolean>
  editCampaign: (campaign: Campaign) => Promise<boolean>
}

type CampaignProviderProps = {
  children: ReactNode
}

export const CampaignListContext: React.Context<CampaignListContextProps> =
  createContext<CampaignListContextProps>({} as CampaignListContextProps)

export const CampaignListContextProvider = ({
  children
}: CampaignProviderProps) => {
  const [currentCampaign, setCurrentCampaign] = useState<Campaign>()

  const [value, loading, error] = useCollection(
    collection(firestoreDb, 'campaigns'),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  )

  const createCampaign = async () => {
    try {
      await addDoc(collection(firestoreDb, 'campaigns'), { title: '' })
    } catch (e) {
      return false
    }
    return true
  }

  const editCampaign = async (campaign: Campaign) => {
    try {
      const docRef = value?.docs.find(doc => doc.id === campaign.id)?.ref
      if (docRef) {
        await updateDoc(docRef, campaign)
        return true
      }
    } catch (e) {
      console.debug(e)
    } finally {
      return false
    }
  }

  const removeCampaign = async (id: string) => {
    try {
      const docRef = value?.docs.find(doc => doc.id === id)?.ref
      if (docRef) {
        await deleteDoc(docRef)
        return true
      }
    } catch (e) {
      console.debug(e)
    } finally {
      return false
    }
  }

  const allCampaigns = useMemo(() => {
    if (loading) return []
    const campaigns = value?.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Campaign[]

    if (campaigns.length > 0) setCurrentCampaign(campaigns[0])
    return campaigns
  }, [loading, value])

  return (
    <CampaignListContext.Provider
      value={{
        currentCampaign,
        setCurrentCampaign,
        allCampaigns,
        loading,
        createCampaign,
        removeCampaign,
        editCampaign
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
