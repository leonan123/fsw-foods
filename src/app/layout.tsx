import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { Toaster } from './_components/ui/sonner'
import { CartContextProvider } from './_contexts/cart'
import { AuthProvider } from './_providers/auth'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'FSW Foods',
    template: '%s | FSW Foods',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>
        <AuthProvider>
          <CartContextProvider>{children}</CartContextProvider>
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  )
}
