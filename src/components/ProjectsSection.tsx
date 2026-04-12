import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const statusClasses: Record<string, string> = {
  live: 'text-emerald-300 border-emerald-300/35 bg-emerald-400/10',
  'in-progress': 'text-amber-300 border-amber-300/35 bg-amber-400/10',
  'coming-soon': 'text-slate-300 border-slate-300/35 bg-slate-400/10',
}

const CARD_MIN_W = 280
const GAP = 20
const STEP = CARD_MIN_W + GAP
const ARC_LIFT = 72
const LOOP_COPIES = 3

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
    return 30 * rel
  })

  const scale = useTransform(offset, (o) => {
    const centerX = index * step - o + CARD_MIN_W / 2
    const rel = Math.max(-1, Math.min(1, (centerX - halfVw) / halfVw))
    return 1 + 0.06 * (1 - rel * rel)
  })

  return (
    <motion.article
      style={{
        y: translateY,
        rotate: rotateZ,
        scale,
        width: CARD_MIN_W,
        minHeight: 320,
        transformStyle: 'preserve-3d',
      }}
      className="relative shrink-0 rounded-2xl border border-white/[0.08] bg-[#1e1e1e] p-5 shadow-[0_0_40px_rgba(0,0,0,0.45)]"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
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
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-[#09bd9c] transition hover:text-[#2dd4b8]"
        >
          View project
          <ExternalLink size={16} />
        </a>
      ) : null}
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
  const pausedRef = useRef(false)
  const draggingRef = useRef(false)
  const dragStartRef = useRef(0)
  const offsetStartRef = useRef(0)
  const rafRef = useRef<number>(0)
  const wheelAreaRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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
    const tick = () => {
      let next = offset.get()
      if (!pausedRef.current && !draggingRef.current) {
        next += 0.35
      }
      offset.set(wrapOffset(next))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [offset, wrapOffset])

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('a')) return
    draggingRef.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    dragStartRef.current = e.clientX
    offsetStartRef.current = offset.get()
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const dx = e.clientX - dragStartRef.current
    offset.set(wrapOffset(offsetStartRef.current - dx))
  }

  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    const el = wheelAreaRef.current
    if (!el) return
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      offset.set(wrapOffset(offset.get() + event.deltaY * 0.45))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [offset, wrapOffset])

  return (
    <section id="projects" className="pt-20">
      <div className="mx-auto w-[min(1100px,95%)]">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects"
          description="Drag along the arc or let it drift. Cards ride a shallow orbit past the screen edges."
        />
      </div>

      <div
        className="relative mt-8 w-screen max-w-[100vw] cursor-grab active:cursor-grabbing"
        style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
        onPointerEnter={() => {
          pausedRef.current = true
        }}
        onPointerLeave={() => {
          pausedRef.current = false
          draggingRef.current = false
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={wheelAreaRef}
          className="h-[min(420px,52vh)] overflow-x-clip overflow-y-visible md:h-[460px]"
        >
          <motion.div
            className="absolute left-0 top-0 flex h-full items-end gap-5 px-0"
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
