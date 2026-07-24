import { headers } from 'next/headers'
import React from 'react'

import { DEFAULT_LANGUAGE_CODE } from '@/i18n/languages'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const headersList = await headers()
  const lang = headersList.get('x-locale') ?? DEFAULT_LANGUAGE_CODE

  return (
    <html lang={lang} className="bg-white text-gray-900 antialiased">
      <body className="min-h-screen font-sans">
        <main>{children}</main>
      </body>
    </html>
  )
}
