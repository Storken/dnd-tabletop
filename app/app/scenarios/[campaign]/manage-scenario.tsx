'use client'

import { PrimaryButton } from '@/app/components/buttons'
import useCampaignList, { Scenario } from '@/contexts/campaign-list'
import { IconCloudUpload, IconFidgetSpinner } from '@tabler/icons-react'
import Image from 'next/image'
import UploadImage from './upload-image'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import { ref } from '@firebase/storage'
import { storage } from '@/utils/firebase'

type Props = {
  currentScenario?: Scenario
  onDeleteScenario: () => void
}

const ManageScenario = ({ currentScenario, onDeleteScenario }: Props) => {
  const { currentCampaign, editCampaign } = useCampaignList()
  const storageRef = ref(storage, currentScenario?.bakground)
  const [value, loading, error] = useDownloadURL(
    currentScenario?.bakground ? storageRef : null
  )

  const onUploadFile = async (path: string) => {
    if (!currentCampaign) return

    const scenarios = [...(currentCampaign?.scenarios ?? [])]
    const index = scenarios.findIndex(s => s.id === currentScenario?.id)
    scenarios[index].bakground = path
    await editCampaign({
      ...currentCampaign,
      scenarios
    })
  }

  const onDeleteClick = async () => {
    if (!currentCampaign) return

    await editCampaign({
      ...currentCampaign,
      scenarios: currentCampaign.scenarios?.filter(
        s => s.id !== currentScenario?.id
      )
    })
    onDeleteScenario()
  }

  if (!currentScenario)
    return <div className='ml-8'>Select a Scenario or add a new one</div>

  return (
    <div className='ml-8'>
      <h1>{currentScenario?.title}</h1>
      {value ? (
        <div
          className='relative w-full'
          style={{ minWidth: '300px', minHeight: '300px' }}
        >
          <Image
            className='w-full h-auto z-10 relative'
            src={value}
            width={800}
            height={800}
            alt='scenario bakground'
          />
          <IconFidgetSpinner className='animate-spin absolute left-2/4 top-2/4 z-0' />
        </div>
      ) : null}
      <div className='flex items-start justify-center w-full flex-wrap mt-8'>
        <UploadImage
          onUploadFile={onUploadFile}
          currentScenario={currentScenario}
        />
        <PrimaryButton
          onClick={onDeleteClick}
          className='bg-red-500 hover:bg-red-600 md:ml-4'
        >
          Delete Scenario
        </PrimaryButton>
      </div>
    </div>
  )
}

export default ManageScenario
