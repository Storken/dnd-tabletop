'use client'
import { useAuth } from '@clerk/nextjs'
import { AuthorizedHeader } from './authorized-header'
import HomeHeader from './home-header'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()

  if (pathname.substring(0, 4) === '/app') {
    return <AuthorizedHeader />
  }
  return <HomeHeader />
}

export default Header
