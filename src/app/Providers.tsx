'use client'

import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

interface Props {
  children: React.ReactNode
}

function Providers({children}:Props) {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider >
    </SessionProvider>
  )
}

export default Providers