'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
}

const founders = [
  {
    name: 'Mamoon Rashid',
    role: 'Grunnlegger & CEO',
    focus: 'Produkt, strategi og samtale-AI-systemer',
    initial: 'M',
  },
  {
    name: 'Vebjørn',
    role: 'Medgrunnlegger & AI-ingeniør',
    focus: 'Talesystemer, modelltrening og infrastruktur',
    initial: 'V',
  },
]

export default function Team() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303] px-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,#0f0f0f_0%,#030303_100%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-4xl flex flex-col gap-14 items-center"
      >
        <motion.div variants={item} className="flex flex-col gap-4 text-center">
          <span className="text-[11px] text-white/25 tracking-[0.2em] uppercase font-medium">
            Teamet
          </span>
          <h2 className="text-[52px] font-bold tracking-tight text-white leading-[1.05]">
            Grunnleggerne.
          </h2>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-2 gap-5 w-full">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="flex flex-col gap-7 p-8 bg-[#0c0c0c] border border-[#181818] rounded-2xl"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[#161616] border border-[#222222] flex items-center justify-center">
                  <span className="text-[16px] font-semibold text-white/40">{founder.initial}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[17px] font-semibold text-white/85">{founder.name}</span>
                  <span className="text-[12px] text-white/35 font-medium">{founder.role}</span>
                </div>
              </div>
              <div className="h-[1px] bg-white/5" />
              <p className="text-[14px] text-white/35 font-light leading-relaxed">{founder.focus}</p>
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="text-[13px] text-white/22 font-light tracking-wide text-center"
        >
          Bygger talesteget for neste generasjon AI i Norge og verden.
        </motion.p>
      </motion.div>
    </div>
  )
}
