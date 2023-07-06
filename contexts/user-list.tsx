import { firestoreDb } from '@/utils/firebase'
import {
  collection,
  documentId,
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
import useCampaignList from './campaign-list'

export type User = {
  uid: string
  displayName: string
  email: string
}

type UserListContextProps = {
  allUsers: User[]
  loading: boolean
  updateUser: (user: User) => Promise<boolean>
}

type UserProviderProps = {
  children: ReactNode
}

export const UserListContext: React.Context<UserListContextProps> =
  createContext<UserListContextProps>({} as UserListContextProps)

export const UserListContextProvider = ({ children }: UserProviderProps) => {
  const { userRefs } = useCampaignList()
  const [value, loading, error] = useCollection(
    query(
      collection(firestoreDb, 'users'),
      where(
        documentId(),
        'in',
        userRefs.map(user => user.id)
      )
    ),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  )

  const updateUser = async (user: User) => {
    try {
      const docRef = value?.docs.find(doc => doc.id === user.uid)?.ref
      if (docRef) {
        await updateDoc(docRef, user)
        return true
      }
    } catch (e) {
      console.debug(e)
    } finally {
      return false
    }
  }

  const allUsers = useMemo(() => {
    if (loading) return []
    const users = value?.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    })) as User[]

    return users
  }, [loading, value])

  return (
    <UserListContext.Provider
      value={{
        allUsers,
        loading,
        updateUser
      }}
    >
      {children}
    </UserListContext.Provider>
  )
}

export default function useUserList () {
  const context = useContext(UserListContext)

  return context
}
