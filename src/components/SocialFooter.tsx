import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6'
import { portfolioData } from '../data/portfolio'

export function SocialFooter() {
  return (
    <footer className="mt-20 rounded-3xl border border-white/15 bg-gradient-to-br from-black/85 via-slate-950/85 to-fuchsia-950/20 p-6">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-slate-300">Connect</p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={portfolioData.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-slate-100 transition hover:border-fuchsia-300/60 hover:text-fuchsia-100"
        >
          <FaGithub size={16} /> GitHub
        </a>
        <a
          href={portfolioData.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-slate-100 transition hover:border-cyan-300/60 hover:text-cyan-100"
        >
          <FaLinkedin size={16} /> LinkedIn
        </a>
        <a
          href={`mailto:${portfolioData.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-slate-100 transition hover:border-violet-300/60 hover:text-violet-100"
        >
          <FaEnvelope size={16} /> Email
        </a>
      </div>
    </footer>
  )
}
