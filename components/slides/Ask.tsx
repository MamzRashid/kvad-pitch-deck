'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

const allocations = [
  {
    number: '01',
    area: 'Bygge Nordens conversational AI-lag',
    bullets: [
      'Norske og nordiske talemodeller',
      'Sanntidsdialog og naturlig samtaleflyt',
      'Proprietær conversational data',
    ],
    pct: 45,
  },
  {
    number: '02',
    area: 'Skalere conversational infrastructure',
    bullets: [
      'Low-latency streaming',
      'Production-grade AI infrastructure',
      'API-distribusjon for AI-agenter',
    ],
    pct: 30,
  },
  {
    number: '03',
    area: 'Etablere Kvad i enterprise-markedet',
    bullets: [
      'AI-agent integrations',
      'Strategiske piloter og distribusjon',
      'Developer og enterprise onboarding',
    ],
    pct: 25,
  },
]

export default function Ask() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303] px-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,#0f0f0f_0%,#030303_100%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl flex flex-col gap-11"
      >
        {/* Header */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <span className="text-[10px] text-white/22 tracking-[0.26em] uppercase font-medium">
            Vi søker
          </span>

          <div className="flex items-baseline gap-6">
            {/* $2M with ambient glow */}
            <div className="relative">
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '-16px -32px',
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                }}
              />
              <h2 className="relative text-[92px] font-bold tracking-tight text-white leading-none">
                $2M
              </h2>
            </div>
            <span className="text-[19px] font-light text-white/28 tracking-wide">Seed-runde</span>
          </div>

          <p className="text-[14px] text-white/35 font-light max-w-md leading-relaxed">
            Bygger fundamentet for conversational AI i Norden.
          </p>
        </motion.div>

        {/* Allocations — no bars, just conviction */}
        <motion.div variants={item} className="flex flex-col">
          {allocations.map((alloc, i) => (
            <div key={alloc.number}>
              {i > 0 && <div className="h-px bg-white/[0.05]" />}
              <div className="flex items-start gap-8 py-6">
                <span className="text-[10px] font-mono text-white/18 tracking-widest pt-1 w-5 flex-shrink-0">
                  {alloc.number}
                </span>

                <div className="flex-1 flex flex-col gap-2.5">
                  <h3 className="text-[15px] font-semibold text-white/80 tracking-tight">
                    {alloc.area}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {alloc.bullets.map((b) => (
                      <span key={b} className="text-[12px] text-white/28 font-light">
                        · {b}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.span
                  className="text-[34px] font-bold text-white/35 tracking-tight leading-none flex-shrink-0 pt-0.5 tabular-nums"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.12 }}
                >
                  {alloc.pct}%
                </motion.span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
