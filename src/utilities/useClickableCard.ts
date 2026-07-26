'use client'
import { RefObject, useEffect, useRef } from 'react'

const useClickableCard = <T extends HTMLElement>(): {
  card: { ref: RefObject<T | null> }
  link: { ref: RefObject<HTMLAnchorElement | null> }
} => {
  const card = useRef<T>(null)
  const link = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const cardEl = card.current
    const linkEl = link.current
    if (!cardEl || !linkEl) return
    const handleClick = () => linkEl.click()
    cardEl.addEventListener('click', handleClick)
    return () => cardEl.removeEventListener('click', handleClick)
  }, [])

  return { card: { ref: card }, link: { ref: link } }
}

export default useClickableCard
