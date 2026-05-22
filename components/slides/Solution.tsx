'use client'

import { motion } from 'framer-motion'
import WaveformBg from '../WaveformBg'

const sections = [
  {
    number: '01',
    title: 'Menneskelig tale',
    body: 'Naturlig rytme, emosjonell flyt og samtalevennlig levering.',
  },
  {
    number: '02',
    title: 'Sanntidsrespons',
    body: 'Optimalisert for live samtaler med ultra-lav forsinkelse.',
  },
  {
    number: '03',
    title: 'Skalerbar stemmeinfrastruktur',
    body: 'Produksjonsklar API som skalerer med produktet — uavhengig av plattform eller brukscase.',
  },
]

const ease = [0.25, 0.1, 0.25, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
}

export default function Solution() {
  return (
    <div className="relative w-full h-full flex items-center bg-[#030303]">
      <WaveformBg opacity={0.02} speed={0.3} />

      {/* Depth gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 40%, #0d0d0d 0%, #030303 100%)' }}
      />

      {/* Ambient bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '40%', background: 'linear-gradient(to top, #030303 0%, transparent 100%)' }}
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        Løsningen
      </motion.span>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl mx-auto px-20 flex flex-col gap-16"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col gap-5">
          <h2
            className="font-bold tracking-tight text-white leading-[1.02] max-w-3xl"
            style={{ fontSize: 'clamp(40px, 5vw, 58px)' }}
          >
            Kvad gjør det mulig for AI å kommunisere naturlig i sanntid.
          </h2>
        </motion.div>

        {/* Sections — full-width editorial rows */}
        <div className="flex flex-col">
          {sections.map((s, i) => (
            <motion.div key={s.number} variants={fadeUp}>
              {/* Top rule */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

              <div className="flex items-baseline gap-20 py-8">
                {/* Left: number + title */}
                <div className="flex items-baseline gap-5 flex-shrink-0" style={{ width: 260 }}>
                  <span className="text-[9px] font-mono text-white/18 tracking-[0.2em]">
                    {s.number}
                  </span>
                  <h3 className="text-[20px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.88)' }}>
                    {s.title}
                  </h3>
                </div>

                {/* Right: body */}
                <p className="text-[13.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  {s.body}
                </p>
              </div>

              {/* Bottom rule on last item */}
              {i === sections.length - 1 && (
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
