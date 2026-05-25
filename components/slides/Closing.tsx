'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import WaveformBg from '../WaveformBg'

const ease = [0.25, 0.1, 0.25, 1]

export default function Closing() {
  return (
    <div className="relative w-full h-full flex flex-col bg-[#030303]">
      <WaveformBg opacity={0.028} speed={0.4} />

      {/* Subtle top line */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent 100%)' }}
      />

      {/* Strong center glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
      />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '35%', background: 'linear-gradient(to top, #030303 0%, transparent 100%)' }}
      />

      {/* Full-center content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center gap-8 px-16">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
          className="flex flex-col items-center gap-6"
        >
          <Image src="/kvad-logo.svg" alt="Kvad" width={200} height={46} style={{ opacity: 0.70 }} />

          <h2
            className="font-bold tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(42px, 5.5vw, 68px)', maxWidth: 780 }}
          >
            La oss bygge Nordens stemmelag
            <span style={{ color: '#4ade80' }}> sammen.</span>
          </h2>
        </motion.div>

        {/* Subtle divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.0, ease, delay: 0.35 }}
          style={{ height: 1, width: 60, background: 'rgba(255,255,255,0.12)', transformOrigin: 'center' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[13px] font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Mamoon Rashid · mamoon@kvad.no
          </span>
          <span className="text-[11px] font-mono tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.20)' }}>
            $2M SEED · kvad.no
          </span>
        </motion.div>

      </div>
    </div>
  )
}
