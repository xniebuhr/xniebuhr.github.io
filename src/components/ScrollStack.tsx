import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export interface ScrollStackItemProps {
  itemClassName?: string
  children: ReactNode
}

export function ScrollStackItem({ children, itemClassName = '' }: ScrollStackItemProps) {
  return (
    <div
      className={`scroll-stack-card relative w-full rounded-2xl origin-top will-change-transform ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  )
}

type ScrollStackProps = {
  className?: string
  children: ReactNode
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

function parsePosition(value: string, viewportHeight: number) {
  if (value.includes('%')) return (parseFloat(value) / 100) * viewportHeight
  return parseFloat(value)
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 190,
  itemScale = 0.03,
  itemStackDistance = 56,
  stackPosition = '34%',
  scaleEndPosition = '12%',
  baseScale = 0.88,
}: ScrollStackProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    cardsRef.current = Array.from(root.querySelectorAll('.scroll-stack-card')) as HTMLElement[]
    const cards = cardsRef.current
    if (!cards.length) return

    cards.forEach((card, i) => {
      card.style.willChange = 'transform'
      card.style.transformOrigin = 'top center'
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`
    })

    const update = () => {
      const viewportH = window.innerHeight
      const stackPosPx = parsePosition(stackPosition, viewportH)
      const scaleEndPx = parsePosition(scaleEndPosition, viewportH)
      const endElement = root.querySelector('.scroll-stack-end') as HTMLElement | null
      const endTop = endElement ? endElement.getBoundingClientRect().top + window.scrollY : 0
      const scrollTop = window.scrollY

      cards.forEach((card, i) => {
        const cardTop = card.getBoundingClientRect().top + window.scrollY
        const triggerStart = cardTop - stackPosPx - itemStackDistance * i
        const triggerEnd = cardTop - scaleEndPx
        const pinStart = triggerStart
        const pinEnd = endTop - viewportH / 2

        const scaleProgress = clamp01((scrollTop - triggerStart) / Math.max(1, triggerEnd - triggerStart))
        const targetScale = baseScale + i * itemScale
        const scale = 1 - scaleProgress * (1 - targetScale)

        let translateY = 0
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPosPx + itemStackDistance * i
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPosPx + itemStackDistance * i
        }

        card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale])

  return (
    <div ref={rootRef} className={`relative w-full overflow-visible ${className}`.trim()}>
      <div className="scroll-stack-inner px-0 pt-0 pb-[24rem]">
        {children}
        <div className="scroll-stack-end h-px w-full" />
      </div>
    </div>
  )
}

