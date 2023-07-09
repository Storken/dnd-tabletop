import { firestoreDb } from '@/utils/firebase'
import { useUser } from '@clerk/nextjs'
import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where
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
  dm: string
  players: string[]
  invited?: string[]
}

type CampaignListContextProps = {
  currentCampaign?: Campaign
  setCurrentCampaign: (campaign?: Campaign) => void
  allCampaigns: Campaign[]
  dmCampaigns: Campaign[]
  playerCampaigns: Campaign[]
  invitedCampaigns: Campaign[]
  loading: boolean
  createCampaign: () => Promise<boolean>
  removeCampaign: (id: string) => Promise<boolean>
  editCampaign: (campaign: Campaign) => Promise<boolean>
  userIds: string[]
}

export const campaignCollection = collection(firestoreDb, 'campaigns')

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
  const [dmCampaignsValues, loading, error] = useCollection(
    user?.id ? query(campaignCollection, where('dm', '==', user.id)) : null,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  )
  const [playerCampaignsValues, loading2, error2] = useCollection(
    user?.id
      ? query(campaignCollection, where('players', 'array-contains', user.id))
      : null,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  )
  const [invitedCampaignsValues, loading3, error3] = useCollection(
    user?.id
      ? query(
          campaignCollection,
          where(
            'invited',
            'array-contains',
            user.emailAddresses[0].emailAddress
          )
        )
      : null,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  )

  const [userRefs, setUserRefs] = useState<string[]>([])

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
      const { id, ...updateData } = campaign
      const docRef = doc(firestoreDb, `campaigns/${id}`)
      await updateDoc(docRef, updateData)
      return true
    } catch (e) {
      console.debug(e)
    } finally {
      return false
    }
  }

  const removeCampaign = async (id: string) => {
    try {
      const docRef = doc(firestoreDb, `campaigns/${id}`)
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

  const dmCampaigns = useMemo(() => {
    if (loading) return []
    return (dmCampaignsValues?.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) ?? []) as Campaign[]
  }, [dmCampaignsValues, loading])

  const playerCampaigns = useMemo(() => {
    if (loading2) return []

    return (playerCampaignsValues?.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) ?? []) as Campaign[]
  }, [loading2, playerCampaignsValues])

  const invitedCampaigns = useMemo(() => {
    if (loading3) return []

    return (invitedCampaignsValues?.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) ?? []) as Campaign[]
  }, [invitedCampaignsValues, loading3])

  const allCampaigns = useMemo(() => {
    const campaigns = [...dmCampaigns, ...playerCampaigns, ...invitedCampaigns]

    const users: string[] = []
    campaigns.forEach(({ dm, players }) => {
      users.push(dm, ...(players ?? []))
    })
    setUserRefs(users)

    if (campaigns.length > 0) setCurrentCampaign(campaigns[0])
    return campaigns
  }, [dmCampaigns, playerCampaigns, invitedCampaigns])

  useEffect(() => {
    const campaign = allCampaigns.find(({ id }) => id === params?.campaign)
    setCurrentCampaign(campaign)
  }, [allCampaigns, params?.campaign, dmCampaigns])

  return (
    <CampaignListContext.Provider
      value={{
        currentCampaign,
        setCurrentCampaign,
        allCampaigns,
        dmCampaigns,
        playerCampaigns,
        invitedCampaigns,
        loading,
        createCampaign,
        removeCampaign,
        editCampaign,
        userIds: userRefs
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
