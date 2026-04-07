import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { portfolioData } from '../data/portfolio'

export function HeroSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
      className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl shadow-cyan-900/20 backdrop-blur md:p-12"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">About Me</p>
      <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">{portfolioData.name}</h1>
      <p className="mt-3 text-lg text-violet-200 md:text-xl">{portfolioData.title}</p>
      <p className="mt-6 max-w-3xl text-slate-300">{portfolioData.about}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={portfolioData.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-5 py-2 text-cyan-100 transition hover:bg-cyan-300/20"
        >
          <FaGithub size={18} />
          GitHub
        </a>
        <a
          href={portfolioData.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-violet-300/40 bg-violet-400/10 px-5 py-2 text-violet-100 transition hover:bg-violet-300/20"
        >
          <FaLinkedin size={18} />
          LinkedIn
        </a>
      </div>
    </motion.section>
  )
}
