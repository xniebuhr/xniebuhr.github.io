import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function ExperienceSection() {
  return (
    <section id="experience" className="pt-20">
      <SectionHeading
        eyebrow="Career"
        title="Experience"
        description="Stacked cards reveal as you scroll, with room for fuller impact statements."
      />
      <div className="space-y-10">
        {portfolioData.experience.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, y: 60, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.15, margin: '-32% 0px -28% 0px' }}
            transition={{ duration: 0.55, delay: index * 0.07 }}
            whileHover={{ scale: 1.015, y: -8 }}
            className="sticky top-20 rounded-2xl border border-white/[0.08] bg-[#1e1e1e] p-7 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold text-white">
                {item.role} · {item.company}
              </h3>
              <span className="rounded-full border border-[#09bd9c]/35 bg-[#09bd9c]/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-[#09bd9c]">
                {item.period}
              </span>
            </div>
            <ul className="list-inside list-disc space-y-3 text-[15px] leading-relaxed text-slate-200">
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
