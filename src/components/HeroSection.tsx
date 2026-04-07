import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { portfolioData } from '../data/portfolio'

export function HeroSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="rounded-3xl border border-white/15 bg-gradient-to-br from-slate-950/95 via-fuchsia-950/20 to-cyan-950/20 p-8 shadow-[0_0_80px_rgba(162,28,175,0.22)] backdrop-blur md:p-12"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-fuchsia-300">About Me</p>
      <h1 className="bg-gradient-to-r from-white via-fuchsia-100 to-cyan-100 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
        {portfolioData.name}
      </h1>
      <p className="mt-3 text-lg text-cyan-100 md:text-xl">{portfolioData.title}</p>
      <p className="mt-6 max-w-3xl text-slate-200">{portfolioData.about}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={portfolioData.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/40 bg-fuchsia-400/10 px-5 py-2 text-fuchsia-100 transition hover:bg-fuchsia-300/25"
        >
          <FaGithub size={18} />
          GitHub
        </a>
        <a
          href={portfolioData.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-5 py-2 text-cyan-100 transition hover:bg-cyan-300/25"
        >
          <FaLinkedin size={18} />
          LinkedIn
        </a>
      </div>
    </motion.section>
  )
}
