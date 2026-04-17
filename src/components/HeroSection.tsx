import { portfolioData } from '../data/portfolio'

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative z-[6] w-full overflow-visible px-[clamp(1rem,4vw,2.5rem)] pb-12 pt-6 md:pb-16"
    >
      <div className="mx-auto flex w-full max-w-[1600px] min-h-[min(78vh,900px)] flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:justify-center">
        <div className="min-w-0 max-w-xl shrink-0 text-center lg:max-w-[min(100%,26rem)] lg:text-left">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            {portfolioData.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-400 md:text-xl">{portfolioData.title}</p>
        </div>

        <div className="flex w-full min-w-0 flex-1 justify-center lg:max-w-[880px] lg:justify-end">
          <div
            className="aspect-[16/10] w-full max-w-[36.5rem] rounded-2xl border border-white/15 bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] lg:w-full lg:max-w-none lg:min-w-[min(100%,30rem)] lg:translate-x-[80px]"
            aria-label="Interactive desktop placeholder"
            role="img"
          />
        </div>
      </div>
    </section>
  )
}
