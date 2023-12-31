import './globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from './Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'EcoBalance',
  description: 'EcoBalance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body >
        <Toaster />
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        </body>
    </html>
  )
}
