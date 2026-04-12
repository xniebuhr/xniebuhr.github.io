import { useCallback, useEffect, useRef, useState } from 'react'

/** Matches AmbientOrbs layout — each orb is independently draggable (layer z-[2], under page content). */
const ORBS: {
  id: string
  /** CSS position for the glow center (percent / keyword) */
  anchor: { left: string; top: string }
  size: string
}[] = [
  { id: 'a', anchor: { left: '2%', top: '6%' }, size: 'min(260px, 42vw)' },
  { id: 'b', anchor: { left: '78%', top: '12%' }, size: 'min(240px, 40vw)' },
  { id: 'c', anchor: { left: '14%', top: '62%' }, size: 'min(280px, 44vw)' },
  { id: 'd', anchor: { left: '72%', top: '58%' }, size: 'min(220px, 38vw)' },
  { id: 'e', anchor: { left: '36%', top: '36%' }, size: 'min(270px, 43vw)' },
  { id: 'f', anchor: { left: '58%', top: '48%' }, size: 'min(250px, 41vw)' },
]

function DraggableOrbItem({
  anchor,
  size,
}: {
  anchor: { left: string; top: string }
  size: string
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const origin = useRef({ x: 0, y: 0, px: 0, py: 0 })

  const clamp = useCallback((nx: number, ny: number) => {
    if (typeof window === 'undefined') return { x: nx, y: ny }
    const maxX = window.innerWidth * 0.38
    const maxY = window.innerHeight * 0.36
    return {
      x: Math.max(-maxX, Math.min(maxX, nx)),
      y: Math.max(-maxY, Math.min(maxY, ny)),
    }
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const nx = origin.current.px + (e.clientX - origin.current.x)
      const ny = origin.current.py + (e.clientY - origin.current.y)
      setPos(clamp(nx, ny))
    }
    const onUp = () => {
      dragging.current = false
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [clamp])

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragging.current = true
    origin.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: anchor.left,
        top: anchor.top,
        transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
      }}
    >
      <div className="pointer-events-auto relative" style={{ width: size, height: size }}>
        <span className="sun-visual pointer-events-none" style={{ width: size, height: size }} />
        <button
          type="button"
          onPointerDown={onPointerDown}
          className="absolute left-1/2 top-1/2 h-[34%] w-[34%] min-h-[72px] min-w-[72px] max-h-[100px] max-w-[100px] -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full border-0 bg-transparent p-0 outline-none active:cursor-grabbing"
          aria-label="Drag ambient glow"
        />
      </div>
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
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      {ORBS.map((o) => (
        <DraggableOrbItem key={o.id} anchor={o.anchor} size={o.size} />
      ))}
    </div>
  )
}
