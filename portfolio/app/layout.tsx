import './globals.css'
import type { Metadata } from 'next'
import { ClientShell } from '@/components/layout/ClientShell'

export const metadata: Metadata = {
  title: 'Rohan Kshatri',
  description: 'Rohan Kshatri is a React Native and web developer building thoughtful, high-performance digital products.',
  icons: { icon: '/assets/logos/RK.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}
