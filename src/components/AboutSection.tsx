import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.3, 0.72, 0.88, 1], [0.58, 0.78, 1, 1, 0.78, 0.58])

  /** Max blur 10px. Slower, later ramps on both ends to avoid sudden blur changes. */
  const MAX_BLUR = 10
  const blurPx = useTransform(scrollYProgress, (p) => {
    const enterStart = 0
    const enterEnd = 0.24
    const exitStart = 0.84
    if (p <= enterEnd) {
      const t = Math.min(1, Math.max(0, (p - enterStart) / (enterEnd - enterStart)))
      const eased = 1 - (1 - t) ** 2.4
      return MAX_BLUR * (1 - eased)
    }
    if (p >= exitStart) {
      const t = Math.min(1, Math.max(0, (p - exitStart) / (1 - exitStart)))
      const easedInOut =
        t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
      return MAX_BLUR * easedInOut
    }
    return 0
  })
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`)

  return (
    <motion.section
      ref={ref}
      id="about"
      style={{ opacity, filter: blurFilter }}
      className="pointer-events-auto relative z-[6] mt-12 min-h-[min(52vh,560px)] scroll-mt-28 rounded-2xl border border-white/[0.08] bg-[#1e1e1e] p-8 md:mt-16 md:p-12"
    >
      <SectionHeading eyebrow="About" title="A bit about me" />
      <div className="max-w-none space-y-6 text-[17px] leading-relaxed text-neutral-300">
        <p>{portfolioData.about}</p>
        <p className="text-neutral-400">{portfolioData.aboutExtra}</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={portfolioData.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-neutral-200 transition hover:border-[#09bd9c]/35 hover:bg-[#09bd9c]/10 hover:text-[#09bd9c]"
        >
          <FaGithub size={18} />
          GitHub
        </a>
        <a
          href={portfolioData.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-neutral-200 transition hover:border-[#09bd9c]/35 hover:bg-[#09bd9c]/10 hover:text-[#09bd9c]"
        >
          <FaLinkedin size={18} />
          LinkedIn
        </a>
      </div>
    </motion.section>
  )
}
