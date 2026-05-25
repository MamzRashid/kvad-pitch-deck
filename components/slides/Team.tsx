'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
}

const founders = [
  {
    name: 'Mamoon Rashid',
    role: 'Medgrunnlegger & President',
    focus: 'AI-agentsystemer og conversational products',
    detail: 'Produkt, distribusjon og sanntids-AI-opplevelser.',
  },
  {
    name: 'Vebjørn',
    role: 'Medgrunnlegger & CEO',
    focus: 'Real-time talesystemer og nordiske talemodeller',
    detail: 'Modelltrening, latency-optimering og conversational infrastructure.',
  },
]

export default function Team() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303] px-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,#0e0e0e_0%,#030303_100%)] pointer-events-none" />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        Teamet
      </motion.span>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-3xl flex flex-col gap-14 items-center text-center"
      >
        <motion.div variants={item} className="flex flex-col gap-3">
          <h2 className="text-[52px] font-bold tracking-tight text-white leading-[1.05]">
            Grunnleggerne.
          </h2>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-2 gap-4">
          {founders.map((f) => (
            <div key={f.name} className="flex flex-col gap-5 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl">
              {/* Avatar placeholder */}
              <div className="w-full rounded-xl bg-[#111111] border border-[#1e1e1e] flex items-center justify-center" style={{ height: 160 }}>
                <span className="text-[52px] font-bold text-white/8 tracking-tight select-none">
                  {f.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[17px] font-semibold text-white/88 tracking-tight">{f.name}</span>
                <span className="text-[10.5px] text-white/30 tracking-[0.14em] uppercase font-medium">{f.role}</span>
              </div>
              <div className="h-px bg-white/[0.05]" />
              <p className="text-[13px] text-white/45 leading-relaxed">{f.focus}. {f.detail}</p>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  )
}
