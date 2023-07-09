'use client'
import { IconButton, PrimaryButton } from '@/app/components/buttons'
import useCampaignList from '@/contexts/campaign-list'
import useUserList from '@/contexts/user-list'
import { IconCircleCheck, IconMail, IconX } from '@tabler/icons-react'
import { useState } from 'react'

const PlayerList = () => {
  const { currentPlayers } = useUserList()
  const { currentCampaign, editCampaign } = useCampaignList()
  const [open, setOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState<string>()

  const invitePlayer = () => {
    if (!currentCampaign) return
    const invited = [
      ...(currentCampaign?.invited || []),
      inviteEmail
    ] as string[]
    editCampaign({ ...currentCampaign, invited })
    setInviteEmail(undefined)
  }

  const removeInvitedPlayer = (email: string) => {
    const invited = currentCampaign?.invited
    if (!invited) return
    const index = invited.findIndex(mail => mail === email)
    if (index < 0) return
    invited.splice(index, 1)
    editCampaign({ ...currentCampaign, invited })
  }

  const removePlayer = (id: string) => {
    const players = currentCampaign?.players
    if (!players) return
    const index = players.findIndex(playerId => playerId === id)
    if (index < 0) return
    players.splice(index, 1)
    editCampaign({ ...currentCampaign, players })
  }

  return (
    <div className='mt-8 max-w-2xl'>
      <div className='mb-8'>
        <ul className='list-none mt-4'>
          {currentPlayers?.map(player => (
            <Row
              remove={() => removePlayer(player.uid)}
              active
              email={player.email}
              displayName={player.displayName}
              key={`player-${player.uid}`}
            />
          ))}
          {currentCampaign?.invited?.map(email => (
            <Row
              remove={() => removeInvitedPlayer(email)}
              email={email}
              key={`invited-${email}`}
            />
          ))}
        </ul>
        <form
          onSubmit={e => {
            e.preventDefault()
            invitePlayer()
          }}
          className='flex flex-nowrap mt-8'
        >
          <input
            className='border-b w-full mr-4'
            value={inviteEmail}
            placeholder='Player email'
            onChange={e => setInviteEmail(e.target.value)}
          />
          <PrimaryButton
            disabled={(currentCampaign?.invited?.length ?? 0) >= 10}
            onClick={() => setOpen(true)}
          >
            Invite
          </PrimaryButton>
        </form>
      </div>
    </div>
  )
}

const Row = ({
  displayName,
  email,
  remove,
  active
}: {
  displayName?: string
  email: string
  remove: () => void
  active?: boolean
}) => {
  return (
    <li className='flex justify-between items-center mb-4'>
      <span className='inline-flex flex-nowrap'>
        {active ? (
          <IconCircleCheck className='mr-2 text-green-600' />
        ) : (
          <IconMail className='mr-2' />
        )}
        {displayName || email}
      </span>
      <IconButton className='bg-red-500 hover:bg-red-600' onClick={remove}>
        <IconX fontSize='32px' />
      </IconButton>
    </li>
  )
}

export default PlayerList
