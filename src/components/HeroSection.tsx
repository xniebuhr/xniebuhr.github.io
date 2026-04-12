import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

export function HeroSection() {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full px-[clamp(1rem,4vw,2.5rem)] pb-12 pt-6 md:pb-16"
    >
      <div className="mx-auto grid max-w-[1400px] min-h-[min(88vh,900px)] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            {portfolioData.name}
          </h1>
          <p className="mt-4 max-w-md text-lg text-neutral-400 md:text-xl">{portfolioData.title}</p>
        </div>

        <div className="lg:col-span-8">
          <div
            className="min-h-[min(52vh,560px)] w-full rounded-2xl border border-white/15 bg-black"
            aria-label="Interactive desktop placeholder"
            role="img"
          />
        </div>
      </div>
    </motion.section>
  )
}
