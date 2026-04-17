import { motion, useAnimation, useInView } from 'framer-motion'
import { startTransition, useLayoutEffect, useRef, useState } from 'react'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

function SkillColumn({
  title,
  items,
  index,
  animCycle,
}: {
  title: string
  items: string[]
  index: number
  animCycle: number
}) {
  const controls = useAnimation()

  useLayoutEffect(() => {
    if (animCycle === 0) return
    void controls.set({ opacity: 0, y: 36 })
    void controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.08 },
    })
  }, [animCycle, controls, index])

  return (
    <motion.article
      animate={controls}
      initial={{ opacity: 0, y: 36 }}
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
  const sectionRef = useRef<HTMLElement>(null)
  const isSectionVisible = useInView(sectionRef)
  // Late trigger: section must be meaningfully in view before cards can pop.
  const isTriggerVisible = useInView(sectionRef, { amount: 0.42, margin: '0px 0px -16% 0px' })
  const [showGrid, setShowGrid] = useState(false)
  const [animCycle, setAnimCycle] = useState(0)
  const hasTriggeredThisPass = useRef(false)

  useLayoutEffect(() => {
    // Fully offscreen: hide cards and re-arm for the next pass.
    if (!isSectionVisible) {
      hasTriggeredThisPass.current = false
      startTransition(() => setShowGrid(false))
      return
    }
  }, [isSectionVisible])

  useLayoutEffect(() => {
    if (!isSectionVisible || !isTriggerVisible) return
    if (!hasTriggeredThisPass.current) {
      hasTriggeredThisPass.current = true
      startTransition(() => {
        setShowGrid(true)
        setAnimCycle((c) => c + 1)
      })
    }
  }, [isSectionVisible, isTriggerVisible])

  return (
    <section ref={sectionRef} id="skills" className="pointer-events-auto scroll-mt-28 pt-2">
      <SectionHeading
        eyebrow="Toolkit"
        title="Skills & Tools"
        description="Core technologies grouped into high-signal categories with sharper interactive styling."
      />
      {showGrid && animCycle > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          <SkillColumn
            index={0}
            animCycle={animCycle}
            title="Languages"
            items={portfolioData.skills.languages}
          />
          <SkillColumn
            index={1}
            animCycle={animCycle}
            title="Frameworks"
            items={portfolioData.skills.frameworks}
          />
          <SkillColumn
            index={2}
            animCycle={animCycle}
            title="Tools"
            items={portfolioData.skills.tools}
          />
        </div>
      ) : null}
    </section>
  )
}
