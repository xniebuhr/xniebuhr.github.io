import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const PLACEHOLDER_EXTRA = `This paragraph is placeholder copy so the section has more visual weight on the page. You can replace it anytime with anything you want visitors to read first — a story, a mission line, or what you are actively learning. The goal here is simply to give the layout breathing room and a sense of balance before people scroll into projects and the rest of the site.

Another short block of filler text: imagine describing how you like to work, what kinds of problems you gravitate toward, or what you are hoping to do next. None of this is final; it is here to make the section feel substantial while you focus on building the interactive piece and polishing the rest of the experience.`

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
      className="pointer-events-auto relative z-[6] mt-12 min-h-[min(52vh,560px)] rounded-2xl border border-white/[0.08] bg-[#1e1e1e] p-8 md:mt-16 md:p-12"
    >
      <SectionHeading eyebrow="About" title="A bit more about me" />
      <div className="max-w-3xl space-y-6 text-[17px] leading-relaxed text-neutral-300">
        <p>{portfolioData.about}</p>
        <p className="text-neutral-400">{PLACEHOLDER_EXTRA}</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
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
