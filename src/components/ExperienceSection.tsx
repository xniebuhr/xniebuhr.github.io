import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function ExperienceSection() {
  return (
    <section id="experience" className="pt-20">
      <SectionHeading eyebrow="Career" title="Experience" />
      <div className="grid gap-4">
        {portfolioData.experience.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-2xl border border-white/10 bg-slate-900/45 p-5"
          >
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold text-white">
                {item.role} · {item.company}
              </h3>
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-300">{item.period}</span>
            </div>
            <ul className="list-inside list-disc space-y-1 text-slate-300">
              {item.highlights.map((highlight) => (
                <li key={`${item.company}-${highlight}`}>{highlight}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
