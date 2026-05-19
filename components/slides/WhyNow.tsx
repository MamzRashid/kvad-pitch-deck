'use client'

import { motion } from 'framer-motion'
import WaveformBg from '../WaveformBg'

const statements = [
  { number: '01', title: 'AI-agenter er allerede her.' },
  { number: '02', title: 'Norsk tale-AI henger etter.' },
  { number: '03', title: 'Norsk tale-AI er uferdig.' },
  { number: '04', title: 'Kvad bygger fundamentet.' },
]

const ease = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease } },
}

const fadeLine = {
  hidden: { opacity: 0, scaleX: 0.6 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 0.9, ease } },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
}

export default function WhyNow() {
  return (
    <div className="relative w-full h-full flex items-center bg-[#030303]">
      <WaveformBg opacity={0.022} speed={0.35} />

      {/* Cinematic depth gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 35%, #0c0c0c 0%, #030303 100%)' }}
      />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 60%, transparent 100%)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl mx-auto px-20 flex flex-col gap-12"
      >
        {/* Label + Headline */}
        <motion.div variants={fadeUp} className="flex flex-col gap-5">
          <span className="text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium">
            Hvorfor nå
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(44px, 5.5vw, 62px)' }}
          >
            Conversational AI eksploderer.<br />Infrastrukturen henger etter.
          </h2>
        </motion.div>


        {/* Statements — 2×2 grid, no cards */}
        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          {statements.map((s) => (
            <motion.div
              key={s.number}
              variants={fadeUp}
              className="flex flex-col gap-3"
            >
              {/* Top rule */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[9px] font-mono text-white/18 tracking-[0.2em]">
                  {s.number}
                </span>
                <p className="text-[17px] font-semibold text-white/85 leading-snug tracking-[-0.01em]">
                  {s.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
