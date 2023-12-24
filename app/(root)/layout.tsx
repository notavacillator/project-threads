import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { TopBar } from '@/components/shared/TopBar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import { BottomBar } from '@/components/shared/BottomBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads Clone',
  description: 'A thread clone for PC built with NextJS 14',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
          <body className={inter.className}>
            <TopBar/>
            <main>
              <LeftSidebar/>
                <section className='main-container'>
                  <div className='w-full max-w-4xl'></div>
                    {children}
                </section>
              <RightSidebar/>
            </main>
            <BottomBar/>
          </body>
      </html>
    </ClerkProvider>
  )
}
