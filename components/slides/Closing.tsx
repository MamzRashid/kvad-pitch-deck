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

      {/* Center logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
        >
          <Image
            src="/kvad-logo.svg"
            alt="Kvad"
            width={220}
            height={50}
            style={{ opacity: 0.08 }}
          />
        </motion.div>
      </div>

      {/* Left-side content — aligned like a letter */}
      <div className="relative z-10 flex flex-col justify-between h-full px-20 py-16">

        {/* Top: closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease }}
          className="flex flex-col gap-5 max-w-2xl"
        >
          <span className="text-[10px] text-white/20 tracking-[0.28em] uppercase font-medium">
            Neste steg
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-[1.06]"
            style={{ fontSize: 'clamp(40px, 5vw, 58px)' }}
          >
            La oss bygge Nordens<br />stemmelag — sammen.
          </h2>
          <p className="text-[14px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.32)', maxWidth: 420 }}>
            Vi søker $2M i seed-kapital for å gjøre norsk tale-AI til infrastruktur.
            Bli med på å definere neste generasjon AI-kommunikasjon.
          </p>
        </motion.div>

        {/* Bottom: contact + branding */}
        <div className="flex items-end justify-between">

          {/* Contact block */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.78)' }}>
                Mamoon Rashid
              </span>
              <span className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.30)' }}>
                Grunnlegger & CEO, Kvad
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.22)' }}>
                mamoon@kvad.no
              </span>
              <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.16)' }}>
                kvad.no
              </span>
            </div>
          </motion.div>

          {/* Ask reminder badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            className="flex flex-col items-end gap-1.5"
            style={{ textAlign: 'right' }}
          >
            <span className="text-[9px] tracking-[0.22em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.16)' }}>
              Seed-runde
            </span>
            <span className="text-[56px] font-bold tracking-tight text-white leading-none" style={{ opacity: 0.88 }}>
              $2M
            </span>
            <div className="flex gap-3 mt-1">
              {['45% AI-lag', '30% Infra', '25% Marked'].map((label, i) => (
                <span key={i} className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.18)' }}>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
