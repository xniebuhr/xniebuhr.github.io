import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type RotatingTextProps = {
  phrases: string[]
  className?: string
  /** ms each phrase stays on screen before swapping */
  interval?: number
}

export function RotatingText({ phrases, className, interval = 2600 }: RotatingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (phrases.length <= 1) return

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length)
    }, interval)

    return () => clearInterval(timer)
  }, [phrases, interval])

  return (
    <span className={`relative inline-grid place-items-center ${className ?? ''}`.trim()}>
      {/* Reserves space for the widest phrase so the layout never shifts. */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {phrases.reduce((longest, phrase) => (phrase.length > longest.length ? phrase : longest), '')}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          className="col-start-1 row-start-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
