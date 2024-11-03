'use client'

import { Inter } from 'next/font/google'
import { useRouter, usePathname } from 'next/navigation'
import { MobileMenu } from '@/app/components/MobileMenu'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-background">
          <header
            className={`fixed top-0 left-0 right-0 bg-background z-40 border-b h-14 ${
              pathname === '/' ? 'md:hidden' : ''
            }`}
          >
            <div className="container mx-auto px-4 py-2 flex justify-between items-center h-full">
              {pathname !== '/' && (
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              )}
              <MobileMenu />
            </div>
          </header>
          <main
            className={`flex-1 ${
              pathname === '/' ? 'mt-14 md:mt-0' : 'mt-14'
            }`}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}