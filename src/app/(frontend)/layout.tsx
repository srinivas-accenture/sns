import type { Metadata } from 'next'
import { Hind, Mukta, Noto_Sans_Devanagari, Tiro_Devanagari_Marathi } from 'next/font/google'
import { headers } from 'next/headers'
import React from 'react'

import { DEFAULT_LANGUAGE_CODE } from '@/i18n/languages'
import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'
import { LocaleProvider } from '@/providers/Locale'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SupportedLocale } from '@/utilities/getLocale'
import './globals.css'
import './master.css'

// ── All 4 Devanagari fonts instantiated at module level (Next.js hard requirement)
// preload: false so only the one selected by the CMS is actually downloaded
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-dev-noto',
  preload: false,
})

const mukta = Mukta({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dev-mukta',
  preload: false,
})

const hind = Hind({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dev-hind',
  preload: false,
})

const tiroDevanagari = Tiro_Devanagari_Marathi({
  subsets: ['devanagari'],
  weight: '400',
  variable: '--font-dev-tiro',
  preload: false,
})

// ── Map CMS slug → { CSS-variable class, CSS var name }
const DEVANAGARI_FONT_MAP: Record<string, { variable: string; cssVar: string }> = {
  'noto-sans-devanagari': { variable: notoSansDevanagari.variable, cssVar: '--font-dev-noto' },
  mukta:                  { variable: mukta.variable,              cssVar: '--font-dev-mukta' },
  hind:                   { variable: hind.variable,               cssVar: '--font-dev-hind' },
  'tiro-devanagari':      { variable: tiroDevanagari.variable,     cssVar: '--font-dev-tiro' },
}

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const headersList = await headers()
  const lang = headersList.get('x-locale') ?? DEFAULT_LANGUAGE_CODE

  // Fetch the CMS-selected Devanagari font (cached, busted by revalidateTag)
  const siteSettings = await getCachedGlobal('site-settings', 0)()
  const fontKey = siteSettings?.devanagariFont ?? 'noto-sans-devanagari'
  const fontInfo = DEVANAGARI_FONT_MAP[fontKey] ?? DEVANAGARI_FONT_MAP['noto-sans-devanagari']!

  return (
    <html lang={lang} data-theme="light" className={fontInfo.variable}>
      {/* Bridge: maps the specific font var to the generic --font-devanagari used in CSS */}
      <style precedence="default" href={`devanagari-font-${fontKey}`}>{`:root { --font-devanagari: var(${fontInfo.cssVar}); }`}</style>
      <body>
        <LocaleProvider locale={lang as SupportedLocale}>
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </LocaleProvider>
      </body>
    </html>
  )
}
