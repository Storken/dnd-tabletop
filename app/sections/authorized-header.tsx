import useCampaignList from '@/contexts/campaign-list'
import { SignOutButton } from '@clerk/nextjs'
import {
  IconArrowDown,
  IconArrowUp,
  IconBat,
  IconCaretDown,
  IconCaretUp,
  IconDoorExit,
  IconMap,
  IconSwords,
  IconUser,
  IconUserShield
} from '@tabler/icons-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown'

export const AuthorizedHeader = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const { currentCampaign, allCampaigns } = useCampaignList()
  const paths = [
    {
      url: `/app/scenarios/${currentCampaign?.id}`,
      title: 'Scenarios',
      Icon: IconMap
    },
    {
      url: `/app/characters/${currentCampaign?.id}`,
      title: 'Characters',
      Icon: IconUserShield
    },
    {
      url: `/app/monsters/${currentCampaign?.id}`,
      title: 'Monsters',
      Icon: IconBat
    }
  ]

  return (
    <>
      <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                aria-controls='logo-sidebar'
                type='button'
                className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                onClick={() => setOpenSidebar(!openSidebar)}
              >
                <span className='sr-only'>Open sidebar</span>
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    clipRule='evenodd'
                    fillRule='evenodd'
                    d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                  ></path>
                </svg>
              </button>
              <a href='/app/dashboard' className='flex ml-2 md:mr-24'>
                <Image height={50} width={50} alt='logo' src='/logo.png' />
                <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white ml-2'>
                  MVTT
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          openSidebar ? 'translate-x-0' : ''
        }`}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 mt-4'>
          <ul className='space-y-2 font-medium'>
            <li key={'sidebar-campaigns'}>
              <a
                href='/app/campaigns'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 mb-8'
              >
                <IconSwords />
                <span className='ml-3'>Campaigns</span>
              </a>
            </li>
            {Boolean(allCampaigns) && (
              <>
                <li className='relative'>
                  <Dropdown
                    options={allCampaigns.map(({ id, name }) => ({
                      value: id,
                      label: name,
                      className: 'hover:bg-blue-400 cursor-pointer p-2'
                    }))}
                    controlClassName='bg-blue-500 text-white rounded-md mx-2 p-2 cursor-pointer hover:bg-blue-600 relative'
                    menuClassName='absolute top-12 left-2 right-2 bg-blue-500'
                    placeholder={'Select Campaign'}
                    arrowClosed={
                      <IconCaretDown className='absolute right-2 top-2' />
                    }
                    arrowOpen={
                      <IconCaretUp className='absolute right-2 top-2' />
                    }
                    value={currentCampaign.id}
                  />
                </li>
                {paths.map(({ url, title, Icon }) => (
                  <li key={'sidebar-' + title}>
                    <a
                      href={url}
                      className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    >
                      <Icon />
                      <span className='ml-3'>{title}</span>
                    </a>
                  </li>
                ))}
              </>
            )}
            <li>
              <span className='inline-flex flex-nowrap p-2 mt-8'>
                <IconDoorExit className='mr-3' />
                <SignOutButton />
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}
