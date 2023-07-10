'use client'

import useCampaignList, { Scenario } from '@/contexts/campaign-list'
import { storage } from '@/utils/firebase'
import { ref, uploadBytes } from '@firebase/storage'
import { IconTrash } from '@tabler/icons'
import { IconCloudUpload } from '@tabler/icons-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  currentScenario: Scenario
  onUploadFile: (path: string) => void
}

const getEnding = (fileType: string) => {
  if (fileType === 'image/jpeg') return '.jpg'
  if (fileType === 'image/png') return '.png'
  if (fileType === 'image/svg+xml') return '.svg'
  if (fileType === 'image/webp') return '.webp'
  return ''
}

const UploadImage = ({ currentScenario, onUploadFile }: Props) => {
  const { currentCampaign } = useCampaignList()
  const [loading, setLoading] = useState(false)

  const onChange = (file?: File) => {
    if (!file) return

    const fileEnding = getEnding(file.type)
    if (!fileEnding) return

    setLoading(true)
    const path = `${currentCampaign?.id}/${currentScenario.id}${fileEnding}`

    const storageRef = ref(storage, path)

    uploadBytes(storageRef, file).then(snapshot => {
      setLoading(false)
      onUploadFile(snapshot.metadata.fullPath)
    })
  }

  const beforeUpload = (file: File) => {
    const isAllowedType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/svg+xml' ||
      file.type === 'image/webp'

    if (!isAllowedType) {
      //TODO: message: You can only upload a JPG, PNG or SVG file!
    }

    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isLt10M) {
      //TODO: message: Image must smaller than 10MB!
    }

    return isAllowedType && isLt10M
  }

  return (
    <>
      <label
        htmlFor='dropzone-file'
        className={`flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 px-8 max-w-xs ${
          currentScenario.bakground ? 'h-20' : 'h-64'
        }`}
      >
        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
          <IconCloudUpload className='text-xl flex-shrink-0' />
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Click to upload</span> or drag and
            drop
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            SVG, PNG, JPG or WEBP (MAX 10mb)
          </p>
        </div>
        <input
          onChange={e => onChange(e.target.files?.[0])}
          id='dropzone-file'
          type='file'
          className='hidden'
        />
      </label>
    </>
  )
}

export default UploadImage
