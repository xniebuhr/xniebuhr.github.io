import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const statusClasses: Record<string, string> = {
  live: 'text-emerald-300 border-emerald-300/35 bg-emerald-400/10',
  'in-progress': 'text-amber-300 border-amber-300/35 bg-amber-400/10',
  'coming-soon': 'text-slate-300 border-slate-300/35 bg-slate-400/10',
}

const CARD_MIN_W = 300
const GAP = 112
const STEP = CARD_MIN_W + GAP
const ARC_LIFT = 72
const MAX_TILT_DEG = 20
const LOOP_COPIES = 3

const AUTO_SPEED = 0.96
const DRAG_THRESHOLD_PX = 12
const INERTIA_FRICTION = 0.93
const INERTIA_MIN = 0.16
const INERTIA_BOOST = 1.22
const THROW_VELOCITY_CAP = 32

type Sample = { x: number; t: number }

type ProjectCardProps = {
  project: (typeof portfolioData.projects)[number]
  index: number
  offset: ReturnType<typeof useMotionValue<number>>
  viewportWidth: number
  step: number
}

function ProjectCard({ project, index, offset, viewportWidth, step }: ProjectCardProps) {
  const halfVw = Math.max(viewportWidth / 2, 1)

  const translateY = useTransform(offset, (o) => {
    const centerX = index * step - o + CARD_MIN_W / 2
    const rel = Math.max(-1, Math.min(1, (centerX - halfVw) / halfVw))
    return -ARC_LIFT * (1 - rel * rel)
  })

  const rotateZ = useTransform(offset, (o) => {
    const centerX = index * step - o + CARD_MIN_W / 2
    const rel = Math.max(-1, Math.min(1, (centerX - halfVw) / halfVw))
    const dyDrel = 2 * ARC_LIFT * rel
    const dxDrel = halfVw
    const rad = Math.atan2(dyDrel, dxDrel)
    let deg = (rad * 180) / Math.PI
    deg = Math.max(-MAX_TILT_DEG, Math.min(MAX_TILT_DEG, deg))
    return deg
  })

  const scale = useTransform(offset, (o) => {
    const centerX = index * step - o + CARD_MIN_W / 2
    const rel = Math.max(-1, Math.min(1, (centerX - halfVw) / halfVw))
    return 1 + 0.06 * (1 - rel * rel)
  })

  return (
    <motion.article
      data-project-card
      data-github-url={project.githubUrl}
      style={{
        y: translateY,
        rotate: rotateZ,
        scale,
        width: CARD_MIN_W,
        minHeight: 320,
        transformStyle: 'preserve-3d',
      }}
      className="group relative shrink-0 cursor-pointer select-none rounded-2xl border border-white/[0.08] bg-[#1e1e1e] p-5 shadow-[0_0_40px_rgba(0,0,0,0.45)]"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white decoration-[#09bd9c]/80 decoration-2 underline-offset-[6px] group-hover:underline">
          {project.title}
        </h3>
        <span
          className={`shrink-0 rounded-full border px-2 py-1 text-xs capitalize ${
            statusClasses[project.status ?? 'coming-soon']
          }`}
        >
          {project.status?.replace('-', ' ') ?? 'coming soon'}
        </span>
      </div>
      <p className="text-sm text-slate-300">{project.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <li
            key={`${project.title}-${item}`}
            className="rounded-md border border-[#09bd9c]/25 bg-[#09bd9c]/10 px-2 py-1 text-xs text-[#09bd9c]"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export function ProjectsSection() {
  const projects = portfolioData.projects
  const n = projects.length
  const loopWidth = n * STEP

  const offset = useMotionValue(0)
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  const draggingRef = useRef(false)
  const inertiaRef = useRef(false)
  const inertiaVelRef = useRef(0)
  const dragStartXRef = useRef(0)
  const dragOffsetStartRef = useRef(0)
  const samplesRef = useRef<Sample[]>([])
  const pointerDownRef = useRef<{ x: number; y: number; githubUrl: string | null } | null>(null)
  const maxDragRef = useRef(0)
  const rafRef = useRef<number>(0)
  const lastTsRef = useRef<number>(0)

  const repeated = useMemo(() => {
    const out: Array<{ project: (typeof projects)[number]; key: string; index: number }> = []
    for (let copy = 0; copy < LOOP_COPIES; copy += 1) {
      projects.forEach((project, i) => {
        const globalIndex = copy * n + i
        out.push({
          project,
          key: `${copy}-${project.title}-${i}`,
          index: globalIndex,
        })
      })
    }
    return out
  }, [projects, n])

  const stripX = useTransform(offset, (o) => -o)

  const wrapOffset = useCallback(
    (value: number) => {
      let v = value
      while (v >= loopWidth) v -= loopWidth
      while (v < 0) v += loopWidth
      return v
    },
    [loopWidth]
  )

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const pushSample = (x: number, t: number) => {
    const list = samplesRef.current
    list.push({ x, t })
    while (list.length > 6) list.shift()
  }

  const endInertiaFromSamples = () => {
    const list = samplesRef.current
    if (list.length < 2) return
    const a = list[0]
    const b = list[list.length - 1]
    const dt = b.t - a.t
    if (dt < 16) return
    const vPxPerMs = (b.x - a.x) / dt
    let v = -vPxPerMs * INERTIA_BOOST * 16
    v = Math.max(-THROW_VELOCITY_CAP, Math.min(THROW_VELOCITY_CAP, v))
    if (Math.abs(v) < INERTIA_MIN) return
    inertiaVelRef.current = v
    inertiaRef.current = true
  }

  useEffect(() => {
    const tick = (now: number) => {
      const last = lastTsRef.current || now
      const dt = Math.min(48, now - last) / 16.67
      lastTsRef.current = now

      let o = offset.get()

      if (inertiaRef.current) {
        o += inertiaVelRef.current * dt
        inertiaVelRef.current *= Math.pow(INERTIA_FRICTION, dt * 1.35)
        if (Math.abs(inertiaVelRef.current) < INERTIA_MIN) {
          inertiaRef.current = false
          inertiaVelRef.current = 0
        }
        offset.set(wrapOffset(o))
      } else if (!draggingRef.current) {
        o += AUTO_SPEED * dt
        offset.set(wrapOffset(o))
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [offset, wrapOffset])

  const onStripPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    const card = (e.target as HTMLElement).closest('[data-project-card]')
    const githubUrl = card?.getAttribute('data-github-url') ?? null

    draggingRef.current = true
    inertiaRef.current = false
    inertiaVelRef.current = 0
    samplesRef.current = []
    maxDragRef.current = 0
    dragStartXRef.current = e.clientX
    dragOffsetStartRef.current = offset.get()
    pushSample(e.clientX, e.timeStamp)
    pointerDownRef.current = { x: e.clientX, y: e.clientY, githubUrl }

    const onWindowPointerMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return
      pushSample(ev.clientX, ev.timeStamp)
      const dx = ev.clientX - dragStartXRef.current
      maxDragRef.current = Math.max(maxDragRef.current, Math.abs(dx))
      offset.set(wrapOffset(dragOffsetStartRef.current - dx))
    }

    const onWindowPointerUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onWindowPointerMove)
      window.removeEventListener('pointerup', onWindowPointerUp)
      window.removeEventListener('pointercancel', onWindowPointerUp)

      if (!draggingRef.current) return
      draggingRef.current = false
      endInertiaFromSamples()
      samplesRef.current = []

      const down = pointerDownRef.current
      pointerDownRef.current = null
      const maxDrag = maxDragRef.current
      maxDragRef.current = 0

      if (!down?.githubUrl) return
      const dist = Math.hypot(ev.clientX - down.x, ev.clientY - down.y)
      if (maxDrag >= DRAG_THRESHOLD_PX || dist >= DRAG_THRESHOLD_PX) return
      window.open(down.githubUrl, '_blank', 'noopener,noreferrer')
    }

    window.addEventListener('pointermove', onWindowPointerMove)
    window.addEventListener('pointerup', onWindowPointerUp)
    window.addEventListener('pointercancel', onWindowPointerUp)
  }

  return (
    <section id="projects" className="pointer-events-auto scroll-mt-28 pt-2">
      <div className="mx-auto w-[min(1100px,95%)]">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects"
          description="Hands-on builds focused on backend development, secure infrastructure, and automation."
        />
      </div>

      <div
        className="relative mt-10 w-screen max-w-[100vw] cursor-grab select-none active:cursor-grabbing"
        style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
        onPointerDown={onStripPointerDown}
      >
        <div className="h-[min(420px,52vh)] overflow-x-clip overflow-y-visible select-none md:h-[460px]">
          <motion.div
            className="absolute left-0 top-0 flex h-full items-end gap-[7rem] px-0"
            style={{
              x: stripX,
            }}
          >
            {repeated.map(({ project, key, index }) => (
              <ProjectCard
                key={key}
                project={project}
                index={index}
                offset={offset}
                viewportWidth={viewportWidth}
                step={STEP}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
