import { firestoreDb } from '@/utils/firebase'
import { useUser } from '@clerk/nextjs'
import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'
import { useParams } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

export type Campaign = {
  id: string
  title: string
  dm: DocumentReference
  players: DocumentReference[]
}

type CampaignListContextProps = {
  currentCampaign?: Campaign
  setCurrentCampaign: (campaign?: Campaign) => void
  allCampaigns: Campaign[]
  loading: boolean
  createCampaign: () => Promise<boolean>
  removeCampaign: (id: string) => Promise<boolean>
  editCampaign: (campaign: Campaign) => Promise<boolean>
  userRefs: DocumentReference[]
}

type CampaignProviderProps = {
  children: ReactNode
}

export const CampaignListContext: React.Context<CampaignListContextProps> =
  createContext<CampaignListContextProps>({} as CampaignListContextProps)

export const CampaignListContextProvider = ({
  children
}: CampaignProviderProps) => {
  const params = useParams()
  const { user } = useUser()
  const [currentCampaign, setCurrentCampaign] = useState<Campaign>()
  const [value, loading, error] = useCollection(
    collection(firestoreDb, 'campaigns'),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  )
  const [userRefs, setUserRefs] = useState<DocumentReference[]>([])

  const createCampaign = async () => {
    try {
      await addDoc(collection(firestoreDb, 'campaigns'), {
        title: '',
        dm: doc(firestoreDb, `user/${user?.id}`)
      })
    } catch (e) {
      return false
    }
    return true
  }

  const editCampaign = async (campaign: Campaign) => {
    try {
      const docRef = value?.docs.find(doc => doc.id === campaign.id)?.ref
      if (docRef) {
        const { id, ...updateData } = campaign
        await updateDoc(docRef, updateData)
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

    const users: DocumentReference[] = []
    campaigns.forEach(({ dm, players }) => {
      users.push(dm, ...(players ?? []))
    })
    setUserRefs(users)

    if (campaigns.length > 0) setCurrentCampaign(campaigns[0])
    return campaigns
  }, [loading, value])

  useEffect(() => {
    const campaign = allCampaigns.find(({ id }) => id === params?.campaign)
    setCurrentCampaign(campaign)
  }, [allCampaigns, params?.campaign, value])

  return (
    <CampaignListContext.Provider
      value={{
        currentCampaign,
        setCurrentCampaign,
        allCampaigns,
        loading,
        createCampaign,
        removeCampaign,
        editCampaign,
        userRefs
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
