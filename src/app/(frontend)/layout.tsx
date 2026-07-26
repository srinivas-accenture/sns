import type { Metadata } from 'next'
import { headers } from 'next/headers'
import React from 'react'

import { DEFAULT_LANGUAGE_CODE } from '@/i18n/languages'
import './globals.css'
import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const headersList = await headers()
  const lang = headersList.get('x-locale') ?? DEFAULT_LANGUAGE_CODE

  return (
    <html lang={lang} data-theme="light">
      <body>
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
