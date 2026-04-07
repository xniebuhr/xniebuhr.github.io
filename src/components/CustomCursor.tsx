import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  size: number
  life: number
  hue: number
  velocityX: number
  velocityY: number
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ x: -100, y: -100 })
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(max-width: 900px)').matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const onMove = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY }
      for (let index = 0; index < 4; index += 1) {
        particlesRef.current.push({
          x: event.clientX + (Math.random() - 0.5) * 24,
          y: event.clientY + (Math.random() - 0.5) * 24,
          size: 8 + Math.random() * 16,
          life: 0.9 + Math.random() * 0.5,
          hue: 190 + Math.random() * 130,
          velocityX: (Math.random() - 0.5) * 1.2,
          velocityY: (Math.random() - 0.5) * 1.2,
        })
      }
    }

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      const next: Particle[] = []

      for (const particle of particlesRef.current) {
        particle.x += particle.velocityX
        particle.y += particle.velocityY
        particle.size *= 0.97
        particle.life -= 0.015
        if (particle.life <= 0.03 || particle.size < 1) continue
        next.push(particle)

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        )
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 64%, ${particle.life})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`)
        context.fillStyle = gradient
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      }

      particlesRef.current = next.slice(-220)
      frameRef.current = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    frameRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[900] hidden md:block" />
}
