const navItems = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
]

export function Navbar() {
  return (
    <nav className="sticky top-4 z-40 mx-auto mb-10 mt-4 flex w-[min(1100px,95%)] items-center justify-between rounded-full border border-white/10 bg-black/55 px-6 py-3 shadow-[0_0_40px_rgba(255,0,255,0.12)] backdrop-blur">
      <span className="bg-gradient-to-r from-fuchsia-300 to-cyan-200 bg-clip-text font-mono text-sm tracking-wider text-transparent">
        dev://portfolio
      </span>
      <div className="hidden gap-5 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm text-slate-300 transition hover:text-fuchsia-200"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
