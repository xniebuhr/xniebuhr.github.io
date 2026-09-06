import { portfolioData } from '../data/portfolio'
import { DecryptedText } from './DecryptedText'
import { RotatingText } from './RotatingText'

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative z-[6] w-full overflow-visible px-[clamp(1rem,4vw,2.5rem)] pb-12 pt-6 md:pb-16"
    >
      <div className="mx-auto flex w-full max-w-[1600px] min-h-[min(78vh,900px)] flex-col items-center justify-center gap-10">
        <div className="min-w-0 max-w-5xl text-center">
          <h1 className="whitespace-nowrap text-[clamp(2.5rem,9vw,6.75rem)] font-bold leading-[1.05] tracking-tight text-white">
            <DecryptedText text={portfolioData.name} />
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-neutral-400 sm:text-2xl md:text-3xl">
            <RotatingText phrases={portfolioData.taglines} interval={3600} />
          </p>
        </div>
      </div>
    </section>
  )
}
