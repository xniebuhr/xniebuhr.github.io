import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

export function HeroSection() {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none relative z-[2] w-full overflow-visible px-[clamp(1rem,4vw,2.5rem)] pb-12 pt-6 md:pb-16"
    >
      <div className="mx-auto flex w-full max-w-[1600px] min-h-[min(78vh,900px)] flex-col items-stretch gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="pointer-events-none min-w-0 max-w-xl shrink-0 lg:max-w-[min(100%,26rem)] lg:pt-2">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            {portfolioData.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-400 md:text-xl">{portfolioData.title}</p>
        </div>

        {/* Interactive desktop: opaque shell + auto events; blocks orbs below from showing through */}
        <div className="flex w-full min-h-0 min-w-0 flex-1 justify-center self-start lg:justify-end">
          <div
            className="pointer-events-auto isolate z-20 aspect-[16/10] w-full max-w-lg transform-gpu rounded-2xl border border-white/15 bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] [contain:layout_paint] lg:ml-auto lg:max-w-[820px] lg:min-w-[min(100%,28rem)] lg:w-full"
            aria-label="Interactive desktop placeholder"
            role="img"
          />
        </div>
      </div>
    </motion.section>
  )
}
