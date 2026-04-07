import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

function SkillColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-3xl border border-white/15 bg-gradient-to-br from-slate-950/95 via-slate-950/80 to-fuchsia-950/20 p-6 shadow-[0_14px_50px_rgba(0,0,0,0.4)]">
      <h3 className="mb-5 text-lg font-semibold text-white">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <motion.li
            key={`${title}-${skill}`}
            whileHover={{ scale: 1.12, y: -6 }}
            className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </article>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="pt-20">
      <SectionHeading
        eyebrow="Toolkit"
        title="Skills & Tools"
        description="Core technologies grouped into high-signal categories with sharper interactive styling."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <SkillColumn title="Languages" items={portfolioData.skills.languages} />
        <SkillColumn title="Frameworks" items={portfolioData.skills.frameworks} />
        <SkillColumn title="Tools" items={portfolioData.skills.tools} />
      </div>
    </section>
  )
}
