import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6'
import { portfolioData } from '../data/portfolio'

export function SocialFooter() {
  return (
    <footer className="pointer-events-auto mt-20 rounded-2xl border border-white/[0.08] bg-[#1e1e1e] p-6">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-neutral-500">Connect</p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={portfolioData.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-neutral-200 transition hover:border-[#09bd9c]/50 hover:text-[#09bd9c]"
        >
          <FaGithub size={16} /> GitHub
        </a>
        <a
          href={portfolioData.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-neutral-200 transition hover:border-[#09bd9c]/50 hover:text-[#09bd9c]"
        >
          <FaLinkedin size={16} /> LinkedIn
        </a>
        <a
          href={`mailto:${portfolioData.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-neutral-200 transition hover:border-white/30 hover:text-white"
        >
          <FaEnvelope size={16} /> Email
        </a>
      </div>
    </footer>
  )
}
