'use client'
import useCampaignList from '@/contexts/campaign-list'
import { UserListContextProvider } from '@/contexts/user-list'

const CharacterList = () => {
  const { currentCampaign } = useCampaignList()

  return (
    <div className='mt-8'>
      <ul className='list-none'>
        <UserListContextProvider>
          <div></div>
        </UserListContextProvider>
      </ul>
    </div>
  )
}

export default CharacterList
