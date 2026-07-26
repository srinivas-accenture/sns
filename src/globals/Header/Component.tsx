import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getLocale } from '@/utilities/getLocale'
import type { TypedLocale } from 'payload'
import React from 'react'

export async function Header() {
  const locale = await getLocale()
  const headerData = await getCachedGlobal('header', 1, locale as TypedLocale)()

  return <HeaderClient data={headerData} />
}
