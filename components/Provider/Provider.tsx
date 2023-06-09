'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

type props = {
  children: JSX.Element | ReactNode
  session?: Session
}

function Provider({ children, session }: props) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Provider
