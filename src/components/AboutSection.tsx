import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function AboutSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '-32% 0px -28% 0px' }}
      transition={{ duration: 0.6 }}
      className="mt-6 rounded-2xl border border-white/[0.08] bg-[#1e1e1e] p-8 md:p-10"
    >
      <SectionHeading eyebrow="About" title="A bit more about me" />
      <p className="max-w-3xl text-[17px] leading-relaxed text-neutral-300">{portfolioData.about}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={portfolioData.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#09bd9c]/35 bg-[#09bd9c]/10 px-5 py-2 text-sm text-[#09bd9c] transition hover:bg-[#09bd9c]/20"
        >
          <FaGithub size={18} />
          GitHub
        </a>
        <a
          href={portfolioData.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-neutral-200 transition hover:border-[#09bd9c]/40 hover:text-white"
        >
          <FaLinkedin size={18} />
          LinkedIn
        </a>
      </div>
    </motion.section>
  )
}
