import { portfolioData } from '../data/portfolio'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
]

function scrollToDocumentBottom() {
  const target =
    Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
    ) + 1000
  window.scrollTo({ top: target, behavior: 'smooth' })
}

function scrollToBottomWithCorrections() {
  // Content below (like the Skills grid, which only mounts once its
  // section scrolls into view, or the footer) can grow the page height
  // mid-scroll — so the very first call's target can fall short once
  // that happens. Re-issue it a couple more times as the new content
  // lands.
  scrollToDocumentBottom()
  window.setTimeout(scrollToDocumentBottom, 350)
  window.setTimeout(scrollToDocumentBottom, 700)
  window.setTimeout(scrollToDocumentBottom, 1000)
}

export function Navbar() {
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Skills is the last real section before the footer — jump straight to
    // the bottom of the page instead of stopping at the section's top.
    if (href === '#skills') {
      e.preventDefault()
      scrollToBottomWithCorrections()
    }
  }

  return (
    <nav className="sticky top-4 z-40 mx-auto mb-6 mt-4 flex w-[min(1100px,95%)] items-center justify-between rounded-full border border-white/[0.08] bg-[#1e1e1e]/95 px-6 py-3 shadow-lg shadow-black/40 backdrop-blur">
      <span className="min-w-0 truncate font-mono text-sm tracking-wider text-[#09bd9c]">
        <span className="hidden sm:inline">
          {portfolioData.name} | {portfolioData.email} | {portfolioData.phone}
        </span>
        <span className="sm:hidden">{portfolioData.name}</span>
      </span>
      <div className="hidden items-center gap-5 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => onNavClick(e, item.href)}
            className="text-sm text-neutral-400 transition hover:text-[#09bd9c]"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#skills"
          onClick={(e) => {
            e.preventDefault()
            scrollToBottomWithCorrections()
          }}
          className="text-sm text-neutral-400 transition hover:text-[#09bd9c]"
        >
          Contact
        </a>
      </div>
    </nav>
  )
}
