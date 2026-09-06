import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export function ScrollStackItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`scroll-stack-card absolute inset-x-0 top-0 will-change-transform ${className}`.trim()}>
      {children}
    </div>
  )
}

type ScrollStackProps = {
  children: ReactNode
  /** Rendered above the stack, inside the same pinned block as the first
   * card — so it can never drift away from it while pinned. */
  header?: ReactNode
  className?: string
  /** px each card is offset from the one behind it, so its header stays visible */
  peek?: number
  /** vh of extra scroll distance given to each card's entrance animation */
  scrollPerCard?: number
  /** any valid CSS length (e.g. '110px') for how far from the top of the viewport the pinned block sits */
  topOffset?: string
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

export default function ScrollStack({
  children,
  header,
  className = '',
  peek = 64,
  scrollPerCard = 70,
  topOffset = '110px',
}: ScrollStackProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinnedRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const pinnedHeightRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    const pinned = pinnedRef.current
    const stack = stackRef.current
    if (!section || !pinned || !stack) return

    const cards = Array.from(section.querySelectorAll<HTMLElement>('.scroll-stack-card'))
    const n = cards.length
    if (!n) return

    let ticking = false

    // The first card never animates — it sits at rest immediately, right
    // alongside the header (both live inside the same pinned block). Only
    // the remaining cards (index 1..n-1) slide in and stack on top of it.
    const animatedCount = Math.max(1, n - 1)

    const layout = () => {
      const maxHeight = Math.max(...cards.map((card) => card.offsetHeight))
      const stackHeight = maxHeight + (n - 1) * peek
      stack.style.height = `${stackHeight}px`

      // Measured after the stack's height is set, since the pinned block's
      // total height depends on it (header + gap + stack).
      const pinnedHeight = pinned.offsetHeight
      pinnedHeightRef.current = pinnedHeight
      section.style.height = `calc(${pinnedHeight}px + ${animatedCount * scrollPerCard}vh)`
    }

    const update = () => {
      ticking = false

      // Measured off the section itself (never transformed), so this stays
      // accurate frame to frame instead of feeding transformed positions
      // back into the calculation.
      const rect = section.getBoundingClientRect()
      const scrollableDistance = Math.max(1, rect.height - pinnedHeightRef.current)
      const scrolled = clamp01(-rect.top / scrollableDistance)
      const placed = scrolled * animatedCount

      cards.forEach((card, i) => {
        const restY = i * peek

        if (i === 0) {
          card.style.transform = `translate3d(0, ${restY}px, 0) scale(1)`
          card.style.zIndex = '1'
          card.style.opacity = '1'
          return
        }

        const localProgress = clamp01(placed - (i - 1))
        const eased = easeOutCubic(localProgress)
        const startY = window.innerHeight * 0.5
        const y = startY + (restY - startY) * eased
        const scale = 0.95 + 0.05 * eased
        // Fully invisible until it actually starts sliding in — no
        // half-opaque pile of not-yet-stacked cards peeking in early.
        const opacity = localProgress <= 0 ? 0 : eased

        card.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`
        card.style.zIndex = String(i + 1)
        card.style.opacity = String(opacity)
        card.style.pointerEvents = opacity <= 0 ? 'none' : 'auto'
      })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    const onResize = () => {
      layout()
      update()
    }

    layout()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [peek, scrollPerCard])

  return (
    <div ref={sectionRef} className={`relative ${className}`.trim()}>
      <div ref={pinnedRef} className="sticky w-full" style={{ top: topOffset }}>
        {header}
        <div ref={stackRef} className="relative mt-8 w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
