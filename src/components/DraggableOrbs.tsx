import { useCallback, useEffect, useRef, useState } from 'react'

type OrbDef = {
  id: string
  /** Matches `index.css` positioning + drift keyframes (e.g. `orb-a`) */
  driftClass: string
  size: string
}

/**
 * One draggable glow per ambient placement — no duplicate “dead” lights underneath UI.
 * Outer layer handles drift animation; inner layer handles drag translate without fighting keyframes.
 */
const ORBS: OrbDef[] = [
  { id: 'a', driftClass: 'orb-a', size: 'min(420px, 48vw)' },
  { id: 'b', driftClass: 'orb-b', size: 'min(360px, 42vw)' },
  { id: 'c', driftClass: 'orb-c', size: 'min(460px, 52vw)' },
  { id: 'd', driftClass: 'orb-d', size: 'min(300px, 36vw)' },
  { id: 'e', driftClass: 'orb-e', size: 'min(400px, 46vw)' },
  { id: 'f', driftClass: 'orb-f', size: 'min(340px, 40vw)' },
]

function DraggableOrbItem({ driftClass, size }: OrbDef) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const origin = useRef({ x: 0, y: 0, px: 0, py: 0 })
  const targetRef = useRef<HTMLDivElement | null>(null)

  const clamp = useCallback((nx: number, ny: number) => {
    if (typeof window === 'undefined') return { x: nx, y: ny }
    const maxX = window.innerWidth * 0.48
    const maxY = window.innerHeight * 0.48
    return {
      x: Math.max(-maxX, Math.min(maxX, nx)),
      y: Math.max(-maxY, Math.min(maxY, ny)),
    }
  }, [])

  useEffect(() => {
    const el = targetRef.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const nx = origin.current.px + (e.clientX - origin.current.x)
      const ny = origin.current.py + (e.clientY - origin.current.y)
      setPos(clamp(nx, ny))
    }

    const onUp = (e: PointerEvent) => {
      if (!dragging.current) return
      dragging.current = false
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [clamp])

  const onPointerDown = (e: React.PointerEvent) => {
    // Avoid preventDefault — it can trigger the browser “invalid drag” cursor on some setups.
    dragging.current = true
    origin.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  return (
    <div className={`orb ${driftClass} absolute pointer-events-none`} style={{ width: size, height: size }}>
      <div
        ref={targetRef}
        role="presentation"
        onPointerDown={onPointerDown}
        className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      />
    </div>
  )
}

export function DraggableOrbs() {
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setDisabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  if (disabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {ORBS.map((o) => (
        <DraggableOrbItem key={o.id} {...o} />
      ))}
    </div>
  )
}
