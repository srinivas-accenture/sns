import React from 'react'

import { HighImpact } from '@/heros/HighImpact'
import { LowImpact } from '@/heros/LowImpact'
import { MediumImpact } from '@/heros/MediumImpact'

type HeroProps = {
  type?: 'none' | 'lowImpact' | 'mediumImpact' | 'highImpact'
  [key: string]: unknown
}

export function RenderHero({ hero }: { hero?: HeroProps }) {
  if (!hero?.type || hero.type === 'none') return null

  const props = hero as any

  switch (hero.type) {
    case 'highImpact':
      return <HighImpact {...props} />
    case 'mediumImpact':
      return <MediumImpact {...props} />
    case 'lowImpact':
      return <LowImpact {...props} />
    default:
      return null
  }
}
