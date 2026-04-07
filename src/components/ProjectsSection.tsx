import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const statusClasses: Record<string, string> = {
  live: 'text-emerald-300 border-emerald-300/35 bg-emerald-400/10',
  'in-progress': 'text-amber-300 border-amber-300/35 bg-amber-400/10',
  'coming-soon': 'text-slate-300 border-slate-300/35 bg-slate-400/10',
}

export function ProjectsSection() {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [paused, setPaused] = useState(false)
  const cards = useMemo(() => [...portfolioData.projects, ...portfolioData.projects], [])

  useEffect(() => {
    const total = portfolioData.projects.length
    const interval = window.setInterval(() => {
      if (paused) return
      const next = x.get() - 1.1
      const wrapPoint = -total * 300
      x.set(next < wrapPoint ? 0 : next)
    }, 16)

    return () => window.clearInterval(interval)
  }, [paused, x])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      x.set(x.get() - event.deltaY * 0.8)
    }
    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }, [x])

  return (
    <section id="projects" className="pt-20">
      <SectionHeading
        eyebrow="Featured Work"
        title="Projects"
        description="A curved 3D rail that loops infinitely. Drag or scroll to sweep through your projects."
      />
      <div
        ref={containerRef}
        className="overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-4 [perspective:1200px] md:p-7"
      >
        <motion.div
          style={{ x }}
          drag="x"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex gap-6"
        >
          {cards.map((project, index) => {
            const localIndex = index % portfolioData.projects.length
            const curveOffset = Math.abs(localIndex - activeIndex)
            return (
              <motion.article
                key={`${project.title}-${index}-loop`}
                whileHover={{ y: -22, rotateY: 0, scale: 1.04 }}
                style={{
                  rotateY: `${curveOffset * 6}deg`,
                  rotateX: `${curveOffset * 1.5}deg`,
                  transformStyle: 'preserve-3d',
                }}
                onHoverStart={() => setActiveIndex(localIndex)}
                className="min-h-80 min-w-[290px] rounded-3xl border border-white/15 bg-gradient-to-b from-fuchsia-900/25 via-slate-950/90 to-cyan-900/10 p-6 shadow-[0_0_40px_rgba(0,0,0,0.45)] md:min-w-[360px]"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <span
                    className={`rounded-full border px-2 py-1 text-xs capitalize ${
                      statusClasses[project.status ?? 'coming-soon']
                    }`}
                  >
                    {project.status?.replace('-', ' ') ?? 'coming soon'}
                  </span>
                </div>
                <p className="text-sm text-slate-300">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <li
                      key={`${project.title}-${item}`}
                      className="rounded-md border border-fuchsia-300/30 bg-fuchsia-400/10 px-2 py-1 text-xs text-fuchsia-100"
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
                    className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-200 transition hover:text-white"
                  >
                    View project
                    <ExternalLink size={16} />
                  </a>
                ) : null}
              </motion.article>
            )
          })}
        </motion.div>
        <div className="mt-4 flex gap-2">
          {portfolioData.projects.map((project, index) => (
            <button
              key={`${project.title}-dot`}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              className={`h-2 w-8 rounded-full transition ${
                activeIndex === index ? 'bg-cyan-300' : 'bg-slate-700'
              }`}
              aria-label={`Focus ${project.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
