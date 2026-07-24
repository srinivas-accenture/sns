import { redirect } from 'next/navigation'

import { getDefaultLocale } from '@/i18n/getDefaultLocale'

export default async function RootPage() {
  const locale = await getDefaultLocale()
  redirect(`/${locale}`)
}
