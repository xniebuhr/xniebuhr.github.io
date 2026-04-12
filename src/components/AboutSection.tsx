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
  /** Stronger, readable fade as the block enters / leaves the viewport */
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.22, 0.78, 0.88, 1], [0.35, 0.72, 1, 1, 0.72, 0.35])
  const blurPx = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [6, 0, 0, 6])
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`)
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [12, 0, 0, 12])

  return (
    <motion.section
      ref={ref}
      id="about"
      style={{ opacity, filter: blurFilter, y }}
      className="relative z-[2] mt-[calc(1.5rem+min(16.667vh,6rem))] min-h-[min(52vh,560px)] rounded-2xl border border-white/[0.08] bg-[#1e1e1e] p-8 md:p-12"
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
