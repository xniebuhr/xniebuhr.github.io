import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

/** Sticky scene — heading scrolls with the stack instead of drifting away */
const STICKY_SCENE_TOP = 'max(0.75rem, 6vh)'
/** Space from viewport top to first card stick line (heading block ≈ 10–12rem) */
const CARD_STACK_BASE_PX = 196
/** Vertical offset between sticky tops — must clear compact header row + gap so card 3 never covers prior titles */
const STACK_STEP_PX = 100

export function ExperienceSection() {
  const cards = portfolioData.experience
  const sceneMinVh = Math.max(220, (cards.length + 2) * 68)

  return (
    <section id="experience" className="relative scroll-mt-28 pt-4">
      <div className="relative" style={{ minHeight: `calc(${sceneMinVh}vh + 12rem)` }}>
        <div className={`sticky z-[2] pb-24`} style={{ top: STICKY_SCENE_TOP }}>
          <SectionHeading
            eyebrow="Career"
            title="Experience"
            description="Cards stick and stack below this header; the scene stays together while you scroll."
          />
          <div className="mt-2 flex flex-col gap-5">
            {cards.map((item, index) => (
              <motion.article
                key={`${item.company}-${item.period}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12, margin: '-32% 0px -28% 0px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                style={{
                  top: `calc(${STICKY_SCENE_TOP} + ${CARD_STACK_BASE_PX}px + ${index * STACK_STEP_PX}px)`,
                  zIndex: 20 + index,
                }}
                className="sticky overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1e1e1e] shadow-[0_18px_55px_rgba(0,0,0,0.42)]"
              >
                <div className="flex min-h-[3rem] items-center gap-3 border-b border-white/[0.08] bg-[#1e1e1e] px-5 py-2.5">
                  <h3 className="min-w-0 flex-1 truncate text-base font-semibold leading-snug text-white">
                    {item.role} · {item.company}
                  </h3>
                  <span className="shrink-0 rounded-full border border-[#09bd9c]/35 bg-[#09bd9c]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#09bd9c] md:text-xs">
                    {item.period}
                  </span>
                </div>
                <ul className="list-inside list-disc space-y-2.5 px-5 py-5 text-[15px] leading-relaxed text-neutral-300">
                  {item.highlights.map((highlight) => (
                    <li key={`${item.company}-${highlight}`}>{highlight}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
