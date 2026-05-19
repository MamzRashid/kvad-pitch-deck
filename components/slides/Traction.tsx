'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import WaveformBg from '../WaveformBg'

const ease = [0.25, 0.1, 0.25, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.06 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease } },
}

const GREEN = '#4ade80'
// Unified cycle: Kvad→Selly (1.8s) + branch max (3.2s) + pause (2.0s) = 7.0s total
const KVAD_SELLY = 1.8
const TOTAL_CYCLE = 7.0

// Animated flowing dot along a vertical connector line (Kvad → Selly)
function FlowLine({ height = 56 }: { height?: number }) {
  return (
    <div className="flex justify-center" style={{ height }}>
      <svg width={2} height={height} style={{ overflow: 'visible' }}>
        <line x1={1} y1={0} x2={1} y2={height} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
        <motion.circle
          cx={1} cy={0} r={1.8}
          fill={GREEN}
          animate={{ cy: [0, height], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: KVAD_SELLY,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: TOTAL_CYCLE - KVAD_SELLY,
          }}
        />
      </svg>
    </div>
  )
}

// Branch connector: dots flow from Selly center to each customer, synced to FlowLine cycle
function BranchConnector() {
  const H = 44
  const stemH = 16
  const dropH = H - stemH // 28

  return (
    <div className="relative" style={{ width: CUST_TOTAL, height: H }}>
      <svg width={CUST_TOTAL} height={H} className="absolute inset-0" style={{ overflow: 'visible' }}>
        {/* Static lines */}
        <line x1={CUST_MID} y1={0} x2={CUST_MID} y2={stemH} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
        <line x1={CUST_CENTERS[0]} y1={stemH} x2={CUST_CENTERS[4]} y2={stemH} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        {CUST_CENTERS.map((x) => (
          <line key={x} x1={x} y1={stemH} x2={x} y2={H} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        ))}

        {/* Animated green dots — all arrive at customers simultaneously */}
        {CUST_CENTERS.map((x, i) => {
          const horizDist = Math.abs(x - CUST_MID)
          const totalDist = stemH + horizDist + dropH
          const t1 = stemH / totalDist
          const t2 = (stemH + horizDist) / totalDist
          // Duration scales with distance: center=2.0s, outermost=3.2s
          const MAX_BRANCH = 3.2
          const duration = 2.0 + (horizDist / 256) * 1.2
          // Outer dots start earlier so all arrive at the same moment
          // delay only affects 1st iteration; repeatDelay syncs subsequent ones
          const delay = KVAD_SELLY + (MAX_BRANCH - duration)
          const repeatDelay = TOTAL_CYCLE - duration

          return (
            <motion.circle
              key={i}
              r={1.8}
              fill={GREEN}
              animate={{
                cx: [CUST_MID, CUST_MID, x, x],
                cy: [0, stemH, stemH, H],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatDelay,
                ease: 'easeInOut',
                times: [0, t1, t2, 1],
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

function TierLabel({ text, sub }: { text: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 mt-2">
      <span className="text-[10px] font-semibold tracking-[0.20em] uppercase" style={{ color: 'rgba(255,255,255,0.75)' }}>
        {text}
      </span>
      {sub && (
        <span className="text-[9px] font-light tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {sub}
        </span>
      )}
    </div>
  )
}

function Annotation({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
        <path d="M0 5H13M13 5L9 1.5M13 5L9 8.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[11px] font-light whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.70)' }}>
        {text}
      </span>
    </div>
  )
}

// 5 nodes × 96px + 4 gaps × 32px = 608px, centers at 48, 176, 304, 432, 560
const CUST_SIZE = 96
const CUST_GAP = 32
const CUST_TOTAL = CUST_SIZE * 5 + CUST_GAP * 4 // 608
const CUST_CENTERS = [48, 176, 304, 432, 560]
const CUST_MID = 304 // center of 608

export default function Traction() {
  return (
    <div className="relative w-full h-full flex items-start bg-[#030303]">
      <WaveformBg opacity={0.018} speed={0.28} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #0c0c0c 0%, #030303 100%)' }}
      />

      {/* Header — absolutely pinned top-left */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: [0.25, 0.1, 0.25, 1], delay: 0.08 }}
        className="absolute top-14 left-16 z-10 flex flex-col gap-4"
        style={{ maxWidth: 260 }}
      >
        <span className="text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium">
          Tidlig etterspørsel
        </span>
        <h2
          className="font-bold tracking-tight text-white leading-[1.04]"
          style={{ fontSize: 'clamp(26px, 2.8vw, 36px)' }}
        >
          AI-systemer er allerede klare for naturlig norsk tale.
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        {/* Hierarchy — centered */}
        <div className="flex flex-col items-center">

          {/* ── KVAD — top tier ── */}
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <div
              className="relative flex items-center justify-center rounded-full border border-white/[0.10] bg-black"
              style={{ width: 124, height: 124 }}
            >
              {/* Subtle ambient glow */}
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                boxShadow: '0 0 40px 0 rgba(255,255,255,0.04)',
              }} />
              <Image src="/kvad-logo.svg" alt="Kvad" width={76} height={18} style={{ opacity: 0.90 }} />
            </div>
            <TierLabel text="Kvad" sub="Infrastrukturlag" />
          </motion.div>

          {/* Flow line */}
          <motion.div variants={fadeUp}>
            <FlowLine height={50} />
          </motion.div>

          {/* ── SELLY — middle tier ── */}
          <motion.div variants={fadeUp} className="relative flex items-start">
            <div className="flex flex-col items-center">
              <div
                className="flex items-center justify-center rounded-full border border-white/[0.08] bg-black"
                style={{ width: 100, height: 100 }}
              >
                <Image src="/selly-logo-white.svg" alt="Selly" width={58} height={22} style={{ opacity: 0.82 }} />
              </div>
              <TierLabel text="Selly" sub="AI-agent" />
            </div>

            {/* Selly annotation */}
            <div className="absolute flex items-center" style={{ left: 100 + 18, top: 50, transform: 'translateY(-50%)' }}>
              <Annotation text="Venter på Kvads stemme før lansering til kunder" />
            </div>
          </motion.div>

          {/* Branch connector with animated dots */}
          <motion.div variants={fadeUp}>
            <BranchConnector />
          </motion.div>

          {/* ── CUSTOMERS — bottom tier ── */}
          <motion.div variants={fadeUp} className="relative" style={{ width: CUST_TOTAL }}>
            <div className="flex items-start" style={{ gap: CUST_GAP }}>

              {/* 24t */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-full border border-white/[0.06] bg-black" style={{ width: CUST_SIZE, height: CUST_SIZE }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo24web2025BLACK.svg.png" alt="24t" width={44} height={44} style={{ filter: 'grayscale(1) invert(1)', mixBlendMode: 'screen', opacity: 0.75 }} />
                </div>
                <span className="text-[10px] font-medium tracking-[0.16em] uppercase text-center leading-snug" style={{ color: 'rgba(255,255,255,0.70)', maxWidth: 88 }}>24t Oslo Rørservice</span>
                <span className="text-[9px] font-light tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>Kunde</span>
              </div>

              {/* Masala */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-full border border-white/[0.06] bg-black" style={{ width: CUST_SIZE, height: CUST_SIZE }}>
                  <Image src="/Asset 2.png" alt="Masala" width={46} height={46} style={{ opacity: 0.72, filter: 'invert(1)', mixBlendMode: 'screen' }} />
                </div>
                <span className="text-[10px] font-medium tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.70)' }}>Masala</span>
                <span className="text-[9px] font-light tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>Kunde</span>
              </div>

              {/* Compho */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-full border border-white/[0.06] bg-black" style={{ width: CUST_SIZE, height: CUST_SIZE }}>
                  <Image src="/COMPHO_2rowsWhite.png" alt="Compho" width={46} height={22} style={{ opacity: 0.68 }} />
                </div>
                <span className="text-[10px] font-medium tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.70)' }}>Compho</span>
                <span className="text-[9px] font-light tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>Kunde</span>
              </div>

              {/* J&Co */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-full border border-white/[0.06] bg-black" style={{ width: CUST_SIZE, height: CUST_SIZE }}>
                  <Image src="/Hvit skrift (2) (1).png" alt="J&Co" width={48} height={24} style={{ opacity: 0.70 }} />
                </div>
                <span className="text-[10px] font-medium tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.70)' }}>J&Co</span>
                <span className="text-[9px] font-light tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>Kunde</span>
              </div>

              {/* Kahlon */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-full border border-white/[0.06] bg-black" style={{ width: CUST_SIZE, height: CUST_SIZE }}>
                  <Image src="/KG-Hoved-White.png" alt="Kahlon" width={58} height={28} style={{ opacity: 0.68 }} />
                </div>
                <span className="text-[10px] font-medium tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.70)' }}>Kahlon</span>
                <span className="text-[9px] font-light tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>Kunde</span>
              </div>
            </div>

            {/* Kahlon annotation */}
            <div className="absolute flex items-center" style={{ left: CUST_TOTAL + 14, top: 36, transform: 'translateY(-50%)' }}>
              <Annotation text="Konverterer når stemmen høres menneskelig ut" />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
