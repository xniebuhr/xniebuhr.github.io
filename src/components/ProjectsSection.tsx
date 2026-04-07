import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const statusClasses: Record<string, string> = {
  live: 'text-emerald-300 border-emerald-300/35 bg-emerald-400/10',
  'in-progress': 'text-amber-300 border-amber-300/35 bg-amber-400/10',
  'coming-soon': 'text-slate-300 border-slate-300/35 bg-slate-400/10',
}

export function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <section id="projects" className="pt-20">
      <SectionHeading
        eyebrow="Featured Work"
        title="Projects"
        description="Drag through the carousel. Each card can represent a real project or a future slot."
      />
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-4 md:p-6">
        <motion.div ref={trackRef} className="overflow-hidden">
          <motion.div drag="x" dragConstraints={trackRef} className="flex gap-5">
            {portfolioData.projects.map((project, index) => (
              <motion.article
                key={`${project.title}-${index}`}
                whileHover={{ y: -10, scale: 1.01 }}
                onHoverStart={() => setActiveIndex(index)}
                className="min-h-72 min-w-[280px] rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-black/30 md:min-w-[340px]"
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
                      className="rounded-md border border-cyan-300/20 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-100"
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
                    className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-200 transition hover:text-cyan-100"
                  >
                    View project
                    <ExternalLink size={16} />
                  </a>
                ) : null}
              </motion.article>
            ))}
          </motion.div>
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
