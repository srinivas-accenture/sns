'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import type { SupportedLocale } from '@/utilities/getLocale'

interface LocaleContextType {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
})

export function LocaleProvider({
  children,
  locale: serverLocale,
}: {
  children: React.ReactNode
  locale: SupportedLocale
}) {
  const [locale, setLocaleState] = useState<SupportedLocale>(serverLocale)

  // Sync when server confirms new locale after navigation
  useEffect(() => {
    setLocaleState(serverLocale)
  }, [serverLocale])

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale) // optimistic update; middleware sets cookie via URL
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export const useLocale = () => useContext(LocaleContext)
