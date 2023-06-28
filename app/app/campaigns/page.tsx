'use client'
import { useAuth } from '@clerk/clerk-react'

export default function Page () {
  const { userId } = useAuth()
  return (
    <main>
      <h1>All Campaigns</h1>
      Authorized as {userId}
    </main>
  )
}
