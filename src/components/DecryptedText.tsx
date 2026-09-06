import { useEffect, useRef, useState } from 'react'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

type DecryptedTextProps = {
  text: string
  className?: string
  /** ms between each character lock-in */
  revealDelay?: number
  /** ms between random-character flickers */
  flickerSpeed?: number
}

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

function scrambleAll(text: string) {
  return text
    .split('')
    .map((char) => (char === ' ' ? ' ' : randomChar()))
    .join('')
}

export function DecryptedText({
  text,
  className,
  revealDelay = 130,
  flickerSpeed = 90,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(() => scrambleAll(text))
  const containerRef = useRef<HTMLSpanElement>(null)
  const timersRef = useRef<Array<ReturnType<typeof setInterval> | ReturnType<typeof setTimeout>>>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const clearTimers = () => {
      timersRef.current.forEach(clearInterval)
      timersRef.current = []
    }

    const runDecryption = () => {
      clearTimers()

      if (prefersReducedMotion) {
        setDisplayText(text)
        return
      }

      let revealedCount = 0

      const flickerInterval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < revealedCount) return char
              return randomChar()
            })
            .join(''),
        )
      }, flickerSpeed)

      const revealInterval = setInterval(() => {
        revealedCount += 1
        if (revealedCount > text.length) {
          clearInterval(revealInterval)
          clearInterval(flickerInterval)
          setDisplayText(text)
        }
      }, revealDelay)

      timersRef.current.push(flickerInterval, revealInterval)
    }

    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runDecryption()
          } else {
            // Keep it scrambled while off-screen so it never flashes the
            // resolved text right before the reveal kicks off again.
            clearTimers()
            setDisplayText(scrambleAll(text))
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      clearTimers()
    }
  }, [text, revealDelay, flickerSpeed])

  return (
    <span ref={containerRef} className={`font-mono ${className ?? ''}`.trim()}>
      <span aria-hidden="true">{displayText}</span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
