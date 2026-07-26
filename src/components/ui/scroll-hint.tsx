import React from 'react'
import { cn } from '@/utilities/ui'

export const ScrollHint: React.FC<{ className?: string }> = ({ className }) => (
  <p className={cn('mt-2 text-center text-xs text-muted-foreground/50 sm:hidden', className)}>
    ← swipe to see more →
  </p>
)
