'use client'

import { motion } from 'framer-motion'
import WaveformBg from '../WaveformBg'

const statements = [
  { number: '01', title: 'AI-agenter venter på en menneskelig stemme.' },
  { number: '02', title: 'Stemmeskuespillere er dyre og trege.' },
  { number: '03', title: 'Markedet er klart. Infrastrukturen er ikke.' },
  { number: '04', title: 'Vi har dataen. Vi har teamet. Vi har timingen.' },
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
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303]">
      <WaveformBg opacity={0.022} speed={0.35} />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        Hvorfor nå
      </motion.span>

      {/* Cinematic depth gradient — centered */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 42%, #0c0c0c 0%, #030303 100%)' }}
      />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 60%, transparent 100%)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl mx-auto px-20 flex flex-col items-center gap-20 text-center"
      >
        {/* Headline — centered */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-5">
          <h2
            className="font-bold tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(44px, 5.5vw, 64px)' }}
          >
            Voice AI eksploderer.<br />Norsk talekvalitet henger etter.
          </h2>
        </motion.div>

        {/* Statements — horizontal strip, separated by vertical dividers */}
        <motion.div variants={fadeUp} className="w-full flex items-start">
          {statements.map((s, i) => (
            <div key={s.number} className="flex flex-1 items-start">
              {/* Vertical divider */}
              <div className="flex-shrink-0 w-[1px] self-stretch" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="flex flex-col gap-3 px-8 text-left">
                <span className="text-[9px] font-mono tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  {s.number}
                </span>
                <p className="text-[20px] font-semibold leading-snug tracking-[-0.02em]" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  {s.title}
                </p>
              </div>
              {/* Right divider on last item */}
              {i === statements.length - 1 && (
                <div className="flex-shrink-0 w-[1px] self-stretch" style={{ background: 'rgba(255,255,255,0.06)' }} />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
