import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa6'
import { SiHandshake } from 'react-icons/si'
import { portfolioData } from '../data/portfolio'

export function SocialFooter() {
  const phoneDigits = portfolioData.phone.replace(/[^\d+]/g, '')

  return (
    <footer className="pointer-events-auto mt-20 rounded-2xl border border-white/[0.08] bg-[#1e1e1e] p-6">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-neutral-500">Connect with me</p>
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
          href={portfolioData.handshakeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-neutral-200 transition hover:border-[#09bd9c]/50 hover:text-[#09bd9c]"
        >
          <SiHandshake size={16} /> Handshake
        </a>
        <a
          href={`mailto:${portfolioData.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-neutral-200 transition hover:border-[#09bd9c]/50 hover:text-[#09bd9c]"
        >
          <FaEnvelope size={16} /> Email
        </a>
        <a
          href={`tel:${phoneDigits}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-neutral-200 transition hover:border-[#09bd9c]/50 hover:text-[#09bd9c]"
        >
          <FaPhone size={16} /> Phone
        </a>
      </div>
    </footer>
  )
}
