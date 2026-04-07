import { motion } from 'framer-motion'

const nodes = [
  { label: 'Frontend', x: '12%', y: '50%' },
  { label: 'Backend', x: '32%', y: '24%' },
  { label: 'Data', x: '56%', y: '58%' },
  { label: 'Systems', x: '74%', y: '26%' },
  { label: 'Cloud', x: '86%', y: '62%' },
]

export function ConstellationWidget() {
  return (
    <section className="pt-20">
      <h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">Skill Constellation</h2>
      <p className="mb-6 max-w-2xl text-slate-300">
        A creative snapshot of the areas I work in. Hover nodes to highlight paths.
      </p>
      <div className="relative h-64 rounded-3xl border border-white/10 bg-slate-900/45">
        <svg className="absolute inset-0 h-full w-full">
          <line x1="12%" y1="50%" x2="32%" y2="24%" stroke="rgba(103,232,249,0.4)" strokeWidth="2" />
          <line x1="32%" y1="24%" x2="56%" y2="58%" stroke="rgba(196,181,253,0.4)" strokeWidth="2" />
          <line x1="56%" y1="58%" x2="74%" y2="26%" stroke="rgba(103,232,249,0.4)" strokeWidth="2" />
          <line x1="74%" y1="26%" x2="86%" y2="62%" stroke="rgba(196,181,253,0.4)" strokeWidth="2" />
        </svg>
        {nodes.map((node, index) => (
          <motion.div
            key={node.label}
            whileHover={{ scale: 1.18 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2 + index * 0.2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute rounded-full border border-cyan-200/45 bg-cyan-300/20 px-3 py-1 text-xs text-cyan-50 backdrop-blur"
            style={{ left: node.x, top: node.y }}
          >
            {node.label}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
