'use client'

import { useTheme } from '@/providers/Theme'
import { Moon, Sun } from 'lucide-react'
import React from 'react'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  const toggle = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 text-white/70 hover:text-white transition-colors rounded hover:bg-white/10"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}
