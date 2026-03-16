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
        url: '/the_last_rode_logo.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/the_last_rode_logo.png',
        type: 'image/png',
        sizes: '16x16',
      }
    ],
    apple: '/the_last_rode_logo.png',
    shortcut: '/the_last_rode_logo.png',
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
