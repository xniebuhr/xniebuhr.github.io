const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
]

export function Navbar() {
  return (
    <nav className="sticky top-4 z-40 mx-auto mb-6 mt-4 flex w-[min(1100px,95%)] items-center justify-between rounded-full border border-white/[0.08] bg-[#1e1e1e]/95 px-6 py-3 shadow-lg shadow-black/40 backdrop-blur">
      <a href="#home" className="font-mono text-sm tracking-wider text-[#09bd9c] transition hover:text-[#2dd4b8]">
        dev://portfolio
      </a>
      <div className="hidden gap-5 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm text-neutral-400 transition hover:text-[#09bd9c]"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
