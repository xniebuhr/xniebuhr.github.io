import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

function SkillColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '-32% 0px -28% 0px' }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/[0.08] bg-[#1e1e1e] p-6 shadow-[0_14px_50px_rgba(0,0,0,0.4)]"
    >
      <h3 className="mb-5 text-lg font-semibold text-white">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <motion.li
            key={`${title}-${skill}`}
            whileHover={{ scale: 1.12, y: -6 }}
            className="rounded-full border border-[#09bd9c]/30 bg-[#09bd9c]/10 px-3 py-1 text-sm text-[#09bd9c] shadow-[0_0_18px_rgba(9,189,156,0.15)]"
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-28 pt-2">
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
