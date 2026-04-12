type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="mb-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#09bd9c]">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-neutral-400">{description}</p> : null}
    </header>
  )
}
