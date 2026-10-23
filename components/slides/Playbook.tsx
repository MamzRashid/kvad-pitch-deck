'use client'

import { motion } from 'framer-motion'
import WaveformBg from '../WaveformBg'

const ease = [0.25, 0.1, 0.25, 1]
const GREEN = '#4ade80'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

const steps = [
  {
    number: '01',
    title: 'Native speech data',
    body: 'Natural conversation recorded with native speakers. Not studio reads.',
  },
  {
    number: '02',
    title: 'Shared foundation',
    body: 'The data pipeline, training setup and infrastructure built for Norwegian carry over.',
  },
  {
    number: '03',
    title: 'Native evaluation',
    body: 'Blind listening tests with native speakers decide when a voice is ready.',
  },
  {
    number: '04',
    title: 'Local go-to-market',
    body: 'Launch with local partners and customers who hear the difference.',
  },
]

const criteria = [
  'A quality gap native speakers can hear',
  'Businesses ready to deploy voice AI',
  'Access to native speech and speakers',
  'Local partners who can distribute',
]

// Line behind the step dots, with a dot carrying through each stage
function TrackLine() {
  return (
    <div className="absolute left-0 right-0 pointer-events-none" style={{ top: 4, height: 1 }}>
      <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.08)' }} />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 5, height: 5, top: -2, background: GREEN }}
        animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4, times: [0, 0.08, 0.9, 1] }}
      />
    </div>
  )
}

export default function Playbook() {
  return (
    <div className="relative w-full h-full flex items-center bg-[#030303]">
      <WaveformBg opacity={0.018} speed={0.25} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 40%, #0d0d0d 0%, #030303 100%)' }}
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        How we scale
      </motion.span>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl mx-auto px-20 flex flex-col gap-12"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <h2
            className="font-bold tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(36px, 4.4vw, 52px)' }}
          >
            Built in Norway.<br />Repeated language by language.
          </h2>
          <p className="text-[13.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 560 }}>
            Norwegian is where we build and prove the playbook. Every market after it runs the same four steps.
          </p>
        </motion.div>

        {/* Playbook steps */}
        <motion.div variants={fadeUp} className="relative">
          <TrackLine />
          <div className="grid grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.number} className="flex flex-col gap-2.5">
                <div className="relative w-[9px] h-[9px] rounded-full mb-4" style={{ background: '#030303', border: `1px solid rgba(255,255,255,${0.5 - i * 0.07})` }} />
                <span className="text-[9px] font-mono tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  {s.number}
                </span>
                <h3 className="text-[18px] font-semibold tracking-tight leading-snug" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  {s.title}
                </h3>
                <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.46)' }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Market selection */}
        <motion.div variants={fadeUp}>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div className="flex items-start gap-10 pt-6">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase flex-shrink-0 pt-[2px]" style={{ color: 'rgba(255,255,255,0.32)', width: 170 }}>
              How we pick the next market
            </span>
            <div className="grid grid-cols-4 gap-8 flex-1">
              {criteria.map((c) => (
                <div key={c} className="flex items-start gap-2.5">
                  <div className="w-[3px] h-[3px] rounded-full bg-white/35 flex-shrink-0 mt-[7px]" />
                  <span className="text-[12px] font-light leading-snug" style={{ color: 'rgba(255,255,255,0.62)' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
