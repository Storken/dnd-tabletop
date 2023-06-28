'use client'
import { useAuth } from '@clerk/clerk-react'

export default function Page () {
  const { userId } = useAuth()
  return <main>Authorized as {userId}</main>
}
