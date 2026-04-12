import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function LandingIntro() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2200)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55 } }}
          className="pointer-events-none fixed inset-0 z-[1200] flex items-center justify-center bg-[#121212]"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(9, 189, 156, 0.25)',
                '0 0 0 22px rgba(9, 189, 156, 0)',
                '0 0 0 0 rgba(9, 189, 156, 0)',
              ],
            }}
            transition={{ duration: 1.3, repeat: 1 }}
            className="rounded-2xl border border-[#09bd9c]/35 bg-[#1e1e1e]/90 px-6 py-5 backdrop-blur"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#09bd9c]">Initializing Portfolio</p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 230 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="mt-4 h-1.5 rounded-full bg-gradient-to-r from-[#09bd9c] via-[#09bd9c]/60 to-black"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
