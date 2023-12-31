'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const HomeHeader = () => {
  const pathname = usePathname()
  const navigationLinks = [
    { url: '/', title: 'Home' },
    { url: '/about', title: 'About' }
  ]

  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 relative z-10 px-5'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4'>
        <Link href='/' className='flex items-center relative'>
          <Image src='/logo.png' width={60} height={60} alt='logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white absolute -right-20 md:inline hidden'>
            MVTT
          </span>
        </Link>
        <div className='flex md:order-2'>
          <Link href='/sign-in'>
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Get started
            </button>
          </Link>
          <button
            data-collapse-toggle='navbar-cta'
            type='button'
            className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-cta'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
          id='navbar-cta'
        >
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            {navigationLinks.map(({ url, title }) => (
              <li key={`nav-${title}`}>
                <Link
                  href={url}
                  className={`block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0 ${
                    pathname === url
                      ? 'md:text-blue-700 md:dark:text-blue-500'
                      : 'text-black dark:text-white'
                  }`}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default HomeHeader
