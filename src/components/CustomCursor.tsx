import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }
    const onMouseDown = () => setActive(true)
    const onMouseUp = () => setActive(false)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[999] h-4 w-4 rounded-full border border-cyan-200/70 bg-cyan-300/30 mix-blend-screen"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: active ? 1.8 : 1,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 280, mass: 0.3 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[998] h-14 w-14 rounded-full border border-violet-300/35"
        animate={{ x: position.x - 28, y: position.y - 28 }}
        transition={{ type: 'spring', damping: 20, stiffness: 150, mass: 0.5 }}
      />
    </>
  )
}
