'use client'
import useCampaignList from '@/contexts/campaign-list'
import Campaigns from './campaigns'

export default function Page () {
  const { loading } = useCampaignList()

  const skeleton = (
    <div
      role='status'
      className='max-w p-4 space-y-4 divide-y rounded animate-pulse'
    >
      <div className='flex items-center justify-between'>
        <div>
          <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
          <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
        </div>
        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
      </div>
      <div className='flex items-center justify-between pt-4'>
        <div>
          <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
          <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
        </div>
        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
      </div>
      <div className='flex items-center justify-between pt-4'>
        <div>
          <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
          <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
        </div>
        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
      </div>
      <div className='flex items-center justify-between pt-4'>
        <div>
          <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
          <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
        </div>
        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
      </div>
      <div className='flex items-center justify-between pt-4'>
        <div>
          <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
          <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
        </div>
        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )

  return (
    <main>
      <h1 className='mb-12'>Campaigns</h1>
      {loading ? skeleton : <Campaigns />}
    </main>
  )
}
