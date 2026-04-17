import { portfolioData } from '../data/portfolio'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import { SectionHeading } from './SectionHeading'

export function ExperienceSection() {
  const cards = portfolioData.experience

  return (
    <section id="experience" className="pointer-events-auto relative z-[6] scroll-mt-28 pt-4">
      <SectionHeading
        eyebrow="Career"
        title="Experience"
        description="Scroll-driven sticky cards: each role pins in place while the next slides over the details."
      />

      <div className="mt-4">
        <ScrollStack
          itemDistance={180}
          itemStackDistance={58}
          itemScale={0}
          baseScale={1}
          stackPosition="34%"
          scaleEndPosition="14%"
        >
          {cards.map((item) => (
            <ScrollStackItem key={`${item.company}-${item.period}`}>
              <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1e1e1e] shadow-[0_18px_55px_rgba(0,0,0,0.42)]">
                <div className="flex min-h-[3.5rem] flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#1e1e1e] px-6 py-4">
                  <h3 className="min-w-0 flex-1 text-lg font-semibold leading-snug text-white md:text-xl">
                    {item.role} · {item.company}
                  </h3>
                  <span className="shrink-0 rounded-full border border-[#09bd9c]/35 bg-[#09bd9c]/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[#09bd9c]">
                    {item.period}
                  </span>
                </div>
                <ul className="list-inside list-disc space-y-3 px-6 py-6 text-[15px] leading-relaxed text-neutral-300">
                  {item.highlights.map((highlight) => (
                    <li key={`${item.company}-${highlight}`}>{highlight}</li>
                  ))}
                </ul>
              </article>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}

