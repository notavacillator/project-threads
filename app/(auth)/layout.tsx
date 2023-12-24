import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

export const metadata: Metadata = {
    title: 'Threads Clone',
    description: 'A thread clone for PC built with NextJS 14',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
    }: {
    children: React.ReactNode
    }){
    return (
        <ClerkProvider>
            <html lang='en'> 
                <body className={`${inter.className} bg-dark-1`}>{children}</body>
            </html>
        </ClerkProvider>
    )
}