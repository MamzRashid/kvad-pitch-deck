'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.25, 0.1, 0.25, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

function Node({
  children,
  size,
  label,
  sublabel,
  conditional,
}: {
  children: React.ReactNode
  size: number
  label?: string
  sublabel?: string
  conditional?: string
}) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Dashed border for conditional nodes */}
        {conditional ? (
          <svg className="absolute inset-0" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2} cy={size / 2} r={size / 2 - 1}
              fill="#0a0a0a"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
              strokeDasharray="4 3"
            />
          </svg>
        ) : (
          <div className="absolute inset-0 rounded-full border border-white/[0.07] bg-[#0a0a0a]" />
        )}
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      </div>
      {label && (
        <span className="text-[10px] font-medium tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-[9px] font-light tracking-wider" style={{ color: 'rgba(255,255,255,0.14)' }}>
          {sublabel}
        </span>
      )}
    </div>
  )
}

export default function Traction() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#030303]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 50%, #0d0d0d 0%, #030303 100%)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        {/* Label */}
        <motion.span
          variants={fadeUp}
          className="text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium mb-12"
        >
          Tidlige kunder
        </motion.span>

        {/* Kvad — top node */}
        <motion.div variants={fadeUp}>
          <Node size={116} label="Kvad" sublabel="Plattform">
            <Image src="/kvad-logo.svg" alt="Kvad" width={68} height={16} style={{ opacity: 0.88 }} />
          </Node>
        </motion.div>

        {/* Vertical connector */}
        <motion.div variants={fadeUp} className="flex justify-center my-1">
          <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.04))' }} />
        </motion.div>

        {/* Selly — middle node with annotation */}
        <motion.div variants={fadeUp} className="relative flex items-center">
          <Node size={96} label="Selly" sublabel="AI-agent">
            <Image src="/selly-logo-white.svg" alt="Selly" width={54} height={22} style={{ opacity: 0.82 }} />
          </Node>
          <div className="absolute flex items-center gap-2" style={{ left: 96 + 14, top: 48, transform: 'translateY(-50%)' }}>
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              <path d="M0 5H15M15 5L10 1M15 5L10 9" stroke="rgba(255,255,255,0.20)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[12px] font-light leading-snug whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.52)' }}>
              Venter på Kvads stemme før lansering til kunder
            </span>
          </div>
        </motion.div>

        {/* Branch connector — 4 nodes × 82px + gap 56px = 496px total, centers at 41, 179, 317, 455, stem at 248 */}
        <motion.div variants={fadeUp} className="relative my-1" style={{ width: 496, height: 44 }}>
          <div className="absolute" style={{ top: 0, left: 248, width: 1, height: 18, background: 'rgba(255,255,255,0.08)' }} />
          <div className="absolute" style={{ top: 18, left: 41, right: 41, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute" style={{ top: 18, left: 41, width: 1, height: 26, background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute" style={{ top: 18, left: 179, width: 1, height: 26, background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute" style={{ top: 18, left: 317, width: 1, height: 26, background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute" style={{ top: 18, right: 41, width: 1, height: 26, background: 'rgba(255,255,255,0.06)' }} />
        </motion.div>

        {/* Bottom row — 4 nodes, 82px each, gap 56px */}
        <motion.div variants={fadeUp} className="relative" style={{ width: 496 }}>
          <div className="flex items-start" style={{ gap: 56 }}>
            <Node size={82} label="Masala">
              <Image src="/Asset 2.png" alt="Masala" width={52} height={52} style={{ opacity: 0.75, filter: 'invert(1)', mixBlendMode: 'screen' }} />
            </Node>
            <Node size={82} label="Compho">
              <Image src="/COMPHO_2rowsWhite.png" alt="Compho" width={52} height={26} style={{ opacity: 0.72 }} />
            </Node>
            <Node size={82} label="J&Co">
              <Image src="/Hvit skrift (2) (1).png" alt="J&Co" width={54} height={28} style={{ opacity: 0.75 }} />
            </Node>
            <Node size={82} label="Kahlon">
              <Image src="/KG-Hoved-White.png" alt="KG" width={68} height={34} style={{ opacity: 0.72 }} />
            </Node>
          </div>

          {/* Annotation — absolutely positioned to the right of Kahlon circle, vertically centered at circle midpoint (41px) */}
          <div className="absolute flex items-center gap-2" style={{ left: 496 + 12, top: 41, transform: 'translateY(-50%)' }}>
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              <path d="M0 5H15M15 5L10 1M15 5L10 9" stroke="rgba(255,255,255,0.20)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[12px] font-light leading-snug whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.52)' }}>
              Konverterer når stemmen høres menneskelig ut
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
