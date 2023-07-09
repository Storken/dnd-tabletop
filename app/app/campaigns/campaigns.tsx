import { IconButton, PrimaryButton } from '@/app/components/buttons'
import useCampaignList from '@/contexts/campaign-list'
import {
  IconCheck,
  IconPencil,
  IconPlayerPlay,
  IconTrash,
  IconX
} from '@tabler/icons-react'
import { Campaign } from '@/contexts/campaign-list'
import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

const Campaigns = () => {
  const { dmCampaigns, playerCampaigns, invitedCampaigns, createCampaign } =
    useCampaignList()

  return (
    <>
      <PrimaryButton
        className='mb-4'
        onClick={createCampaign}
        disabled={dmCampaigns.length >= 10}
      >
        Add Campaign
      </PrimaryButton>
      {dmCampaigns.map(campaign => (
        <EditableRow key={`row-${campaign.id}`} {...campaign} isDm />
      ))}
      {playerCampaigns.map(campaign => (
        <EditableRow key={`row-${campaign.id}`} {...campaign} isPlayer />
      ))}
      {invitedCampaigns.map(campaign => (
        <EditableRow key={`row-${campaign.id}`} {...campaign} isInvited />
      ))}
    </>
  )
}

const EditableRow = ({
  isDm,
  isPlayer,
  isInvited,
  title,
  id,
  ...campaignProps
}: Campaign & { isDm?: boolean; isPlayer?: boolean; isInvited?: boolean }) => {
  const { removeCampaign, editCampaign } = useCampaignList()
  const [edit, setEdit] = useState(false)
  const [val, setVal] = useState(title)
  const { user } = useUser()

  const onClickEdit = async () => {
    if (edit) {
      await editCampaign({ id, title: val, ...campaignProps })
      setEdit(false)
    } else {
      setEdit(true)
    }
  }

  const onClickConfirmInvite = async () => {
    const invitedPrev = campaignProps.invited
    const userEmail = user?.emailAddresses[0].emailAddress
    if (!userEmail || !invitedPrev) return
    const players = [...campaignProps.players, user.id]
    await editCampaign({
      id,
      title,
      ...campaignProps,
      players,
      invited: invitedPrev.filter(email => email !== userEmail)
    })
  }

  const removePlayerFromCampaign = async () => {
    if (isInvited) {
      const invitedPrev = campaignProps.invited
      const userEmail = user?.emailAddresses[0].emailAddress
      if (!userEmail || !invitedPrev) return
      await editCampaign({
        id,
        title,
        ...campaignProps,
        invited: invitedPrev.filter(email => email !== userEmail)
      })
    } else if (user) {
      await editCampaign({
        id,
        title,
        ...campaignProps,
        players: campaignProps.players.filter(playerId => playerId !== user.id)
      })
    }
  }

  return (
    <div
      key={`campaign-${id}`}
      className='my-6 flex justify-between flex-nowrap'
    >
      <div className='flex align-middle flex-nowrap'>
        {edit ? (
          <input
            value={val}
            onChange={e => setVal(e.target.value)}
            className='border p-2'
          />
        ) : (
          <div className='p-2 overflow-hidden text-ellipsis max-w-xs whitespace-nowrap'>
            {title || 'Unnamed campaign'}
          </div>
        )}
        {isDm ? (
          <IconButton className='py-0' onClick={onClickEdit}>
            {edit ? (
              <IconCheck className='text-green-400' />
            ) : (
              <IconPencil className='text-blue-400' />
            )}
          </IconButton>
        ) : null}
      </div>
      <div className='flex flex-nowrap'>
        {isDm ? (
          <IconButton
            className='bg-red-500 hover:bg-red-700 mr-4'
            onClick={() => removeCampaign(id)}
          >
            <IconTrash />
          </IconButton>
        ) : null}
        {isPlayer || isInvited ? (
          <IconButton
            className='bg-red-500 hover:bg-red-700 mr-4'
            onClick={() => removePlayerFromCampaign()}
          >
            <IconX />
          </IconButton>
        ) : null}
        {isDm || isPlayer ? (
          <Link href={`/app/scenarios/${id}`}>
            <IconButton
              className='bg-green-500 hover:bg-green-700'
              onClick={() => {}}
            >
              <IconPlayerPlay />
            </IconButton>
          </Link>
        ) : null}
        {isInvited ? (
          <IconButton
            onClick={onClickConfirmInvite}
            className='bg-green-500 hover:bg-green-700'
          >
            <IconCheck />
          </IconButton>
        ) : null}
      </div>
    </div>
  )
}

export default Campaigns
