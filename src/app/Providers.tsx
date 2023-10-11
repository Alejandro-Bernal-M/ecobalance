'use client'

import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode
}

function Providers({children}:Props) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Providers