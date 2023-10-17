'use client'

import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux'
import  store  from '@/redux/store'

interface Props {
  children: React.ReactNode
}

function Providers({children}:Props) {
  return (
    <Provider store={store}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </Provider >
  )
}

export default Providers