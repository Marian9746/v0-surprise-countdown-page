import type { Metadata } from 'next'
import { League_Spartan } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const leagueSpartan = League_Spartan({ 
  subsets: ["latin"],
  variable: "--font-league-spartan"
});

export const metadata: Metadata = {
  title: 'Cuenta Atrás Sorpresa',
  description: 'La cuenta atrás para el fin de semana más especial',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${leagueSpartan.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
