import { IconButton, PrimaryButton } from '@/app/components/buttons'
import useCampaignList from '@/contexts/campaign-list'
import { IconCheck, IconPencil, IconTrash } from '@tabler/icons-react'
import { Campaign } from '@/contexts/campaign-list'
import { useState } from 'react'

const Campaigns = () => {
  const { allCampaigns, createCampaign, removeCampaign } = useCampaignList()
  return (
    <>
      <PrimaryButton
        className='mb-4'
        onClick={createCampaign}
        disabled={allCampaigns.length >= 10}
      >
        Add Campaign
      </PrimaryButton>
      {allCampaigns.map(campaign => (
        <EditableRow key={`row-${campaign.id}`} {...campaign} />
      ))}
    </>
  )
}

const EditableRow = ({ title, id }: Campaign) => {
  const { removeCampaign, editCampaign } = useCampaignList()
  const [edit, setEdit] = useState(false)
  const [val, setVal] = useState(title)

  const onClick = async () => {
    if (edit) {
      await editCampaign({ id, title: val })
      setEdit(false)
    } else {
      setEdit(true)
    }
  }

  return (
    <div key={`campaign-${id}`} className='my-6 flex justify-between'>
      <div className='flex align-middle'>
        {edit ? (
          <input
            value={val}
            onChange={e => setVal(e.target.value)}
            className='border p-2'
          />
        ) : (
          <div className='p-2'>{title || 'Unnamed campaign'}</div>
        )}
        <IconButton className='py-0' onClick={onClick}>
          {edit ? (
            <IconCheck className='text-green-400' />
          ) : (
            <IconPencil className='text-blue-400' />
          )}
        </IconButton>
      </div>
      <IconButton
        className='bg-red-500 hover:bg-red-700'
        onClick={() => removeCampaign(id)}
      >
        <IconTrash />
      </IconButton>
    </div>
  )
}

export default Campaigns
