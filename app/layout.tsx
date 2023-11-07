import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Provider from '@/components/Provider'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/themeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Project Crypt',
  description: 'Cryptic hunts for all.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider>
      <body className={cn(inter.className)}><Navbar /><ThemeProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
      {children}</ThemeProvider></body>
      </Provider>
    </html>
  )
}
