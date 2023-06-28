import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Footer from '@/app/sections/footer'
import { ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import Header from './sections/header'
import { Suspense } from 'react'
import { IconTruckLoading } from '@tabler/icons-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MVTT',
  description:
    'Man-gås Virtual Table Top gives you the best tool to play online with your friends'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-black flex flex-col justify-between min-h-screen`}
      >
        <Suspense fallback={<div>Loading authentication</div>}>
          <ClerkProvider>
            <Suspense fallback={<ClerkLoading />}>
              <Providers>
                <Header />
                {children}
                <Footer />
              </Providers>
            </Suspense>
          </ClerkProvider>
        </Suspense>
      </body>
    </html>
  )
}
