import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

function SkillColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/45 p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <motion.li
            key={`${title}-${skill}`}
            whileHover={{ scale: 1.07 }}
            className="rounded-full border border-violet-300/35 bg-violet-400/10 px-3 py-1 text-sm text-violet-100"
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
      <SectionHeading eyebrow="Toolkit" title="Skills & Tools" />
      <div className="grid gap-4 md:grid-cols-3">
        <SkillColumn title="Languages" items={portfolioData.skills.languages} />
        <SkillColumn title="Frameworks" items={portfolioData.skills.frameworks} />
        <SkillColumn title="Tools" items={portfolioData.skills.tools} />
      </div>
    </section>
  )
}
