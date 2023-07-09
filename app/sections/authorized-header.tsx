import useCampaignList from '@/contexts/campaign-list'
import { SignOutButton, UserButton } from '@clerk/nextjs'
import {
  IconBat,
  IconCaretDown,
  IconCaretLeft,
  IconCaretUp,
  IconDoorExit,
  IconMap,
  IconMenu,
  IconSwords,
  IconUserShield,
  IconUsers
} from '@tabler/icons-react'
import Image from 'next/image'
import { useState } from 'react'
import Dropdown from 'react-dropdown'
import DarkModeToggle from '../components/dark-mode-toggle'
import Link from 'next/link'

export const AuthorizedHeader = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const { currentCampaign } = useCampaignList()

  const paths = [
    {
      url: `/app/players/${currentCampaign?.id}`,
      title: 'Players',
      Icon: IconUsers
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
    },
    {
      url: `/app/scenarios/${currentCampaign?.id}`,
      title: 'Scenarios',
      Icon: IconMap
    },
    {
      url: `/app/game/${currentCampaign?.id}`,
      title: 'Game',
      Icon: IconSwords
    }
  ]

  return (
    <>
      <nav className='fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
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
                <IconMenu />
              </button>
              <Link href='/app/campaigns' className='flex ml-2 md:mr-24'>
                <Image height={50} width={50} alt='logo' src='/logo.png' />
                <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white ml-2'>
                  MVTT
                </span>
              </Link>
            </div>
            <div className='flex flex-nowrap'>
              <UserButton />
              <span className='ml-2'></span>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
          openSidebar ? 'translate-x-0' : ''
        } ${Boolean(currentCampaign) ? 'sm:translate-x-0' : ''}`}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 mt-4 flex flex-col justify-between'>
          <ul className={`space-y-2 font-medium`}>
            <li key={'sidebar-campaigns'} className='mb-8'>
              <Link
                href='/app/campaigns'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <IconCaretLeft />
                <span className='ml-3 border-b border-dashed border-gray-300'>
                  Campaigns
                </span>
              </Link>
            </li>
            {paths.map(({ url, title, Icon }) => (
              <li key={'sidebar-' + title}>
                <Link
                  href={url}
                  className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  <Icon />
                  <span className='ml-3'>{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
