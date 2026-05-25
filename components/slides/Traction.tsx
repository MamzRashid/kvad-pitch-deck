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

// 5 nodes × 104px + 4 gaps × 28px = 632px, centers at 52, 184, 316, 448, 580
const CUST_SIZE = 104
const CUST_GAP = 28
const CUST_TOTAL = CUST_SIZE * 5 + CUST_GAP * 4 // 632
const CUST_CENTERS = [52, 184, 316, 448, 580]
const CUST_MID = 316 // center of 632
const MAX_HORIZ = 264 // CUST_MID - CUST_CENTERS[0]

// Animated flowing dot along a vertical connector line (Kvad → Selly)
function FlowLine({ height = 56 }: { height?: number }) {
  return (
    <div className="flex justify-center" style={{ height }}>
      <svg width={2} height={height} style={{ overflow: 'visible' }}>
        <line x1={1} y1={0} x2={1} y2={height} stroke="rgba(255,255,255,0.06)" strokeWidth={0.75} />
        <motion.circle
          cx={1} cy={0} r={1.6}
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
  const MAX_BRANCH = 3.2

  return (
    <div className="relative" style={{ width: CUST_TOTAL, height: H }}>
      <svg width={CUST_TOTAL} height={H} className="absolute inset-0" style={{ overflow: 'visible' }}>
        {/* Static lines — thinner, more premium */}
        <line x1={CUST_MID} y1={0} x2={CUST_MID} y2={stemH} stroke="rgba(255,255,255,0.07)" strokeWidth={0.75} />
        <line x1={CUST_CENTERS[0]} y1={stemH} x2={CUST_CENTERS[4]} y2={stemH} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
        {CUST_CENTERS.map((x) => (
          <line key={x} x1={x} y1={stemH} x2={x} y2={H} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
        ))}

        {/* Animated green dots — outer dots start earlier, all arrive simultaneously */}
        {CUST_CENTERS.map((x, i) => {
          const horizDist = Math.abs(x - CUST_MID)
          const totalDist = stemH + horizDist + dropH
          const t1 = stemH / totalDist
          const t2 = (stemH + horizDist) / totalDist
          const duration = 2.0 + (horizDist / MAX_HORIZ) * 1.2
          const delay = KVAD_SELLY + (MAX_BRANCH - duration)
          const repeatDelay = TOTAL_CYCLE - duration

          return (
            <motion.circle
              key={i}
              r={1.6}
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
    <div className="flex flex-col items-center gap-1 mt-3">
      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: 'rgba(255,255,255,0.86)' }}>
        {text}
      </span>
      {sub && (
        <span className="text-[9.5px] font-light tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.42)' }}>
          {sub}
        </span>
      )}
    </div>
  )
}

function Annotation({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
        <path d="M0 5H17M17 5L12.5 1.5M17 5L12.5 8.5" stroke="rgba(255,255,255,0.28)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[11.5px] font-light whitespace-nowrap tracking-wide" style={{ color: 'rgba(255,255,255,0.82)' }}>
        {text}
      </span>
    </div>
  )
}

export default function Traction() {
  return (
    <div className="relative w-full h-full flex items-start bg-[#030303]">
      <WaveformBg opacity={0.026} speed={0.22} />

      {/* Deep background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 44%, #0f0f0f 0%, #030303 100%)' }}
      />


      {/* Header — absolutely pinned top-left */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: [0.25, 0.1, 0.25, 1], delay: 0.08 }}
        className="absolute top-8 left-16 z-10 flex flex-col gap-4"
        style={{ maxWidth: 260 }}
      >
        <span className="text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium">
          Tidlig etterspørsel
        </span>
        <h2
          className="font-bold tracking-tight text-white leading-[1.04]"
          style={{ fontSize: 'clamp(26px, 2.8vw, 36px)' }}
        >
          Etterspørselen er konkret. Stemmen mangler.
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

          {/* ── KVAD — top tier, dominant infrastructure node ── */}
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <div
              className="relative flex items-center justify-center rounded-full bg-black"
              style={{
                width: 144,
                height: 144,
                border: '1px solid rgba(255,255,255,0.11)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 0 28px 4px rgba(255,255,255,0.015), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Outer atmospheric ring — slow pulse */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 200,
                  height: 200,
                  top: -28,
                  left: -28,
                  border: '1px solid rgba(255,255,255,0.04)',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.006) 0%, transparent 60%)',
                }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="flex flex-col items-center gap-2">
                <Image src="/kvad-icon.svg" alt="Kvad" width={46} height={46} style={{ opacity: 0.93 }} />
                <span className="text-[12px] font-semibold tracking-[0.32em] uppercase text-white" style={{ opacity: 0.88 }}>Kvad</span>
              </div>
            </div>
            <TierLabel text="Kvad" sub="Infrastrukturlag" />
          </motion.div>

          {/* Flow line — Kvad → Selly */}
          <motion.div variants={fadeUp}>
            <FlowLine height={46} />
          </motion.div>

          {/* ── SELLY — middle tier ── */}
          <motion.div variants={fadeUp} className="relative flex items-start">
            <div className="flex flex-col items-center">
              <div
                className="flex items-center justify-center rounded-full bg-black"
                style={{
                  width: 100,
                  height: 100,
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 0 18px 3px rgba(255,255,255,0.008)',
                }}
              >
                <Image src="/selly-logo-white.svg" alt="Selly" width={58} height={22} style={{ opacity: 0.82 }} />
              </div>
              <TierLabel text="Selly" sub="AI-agent" />
            </div>

            {/* Selly annotation */}
            <div className="absolute flex items-center" style={{ left: 100 + 20, top: 50, transform: 'translateY(-50%)' }}>
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
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex items-center justify-center rounded-full bg-black" style={{ width: CUST_SIZE, height: CUST_SIZE, border: '1px solid rgba(255,255,255,0.07)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo24web2025BLACK.svg.png" alt="24t" width={52} height={52} style={{ filter: 'grayscale(1) invert(1)', mixBlendMode: 'screen', opacity: 0.78 }} />
                </div>
                <span className="text-[10.5px] font-medium tracking-[0.14em] uppercase text-center leading-snug" style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 96 }}>24t Oslo Rørservice</span>
              </div>

              {/* Masala */}
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex items-center justify-center rounded-full bg-black" style={{ width: CUST_SIZE, height: CUST_SIZE, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Image src="/Asset 2.png" alt="Masala" width={54} height={54} style={{ opacity: 0.76, filter: 'invert(1)', mixBlendMode: 'screen' }} />
                </div>
                <span className="text-[10.5px] font-medium tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.78)' }}>Masala</span>
              </div>

              {/* Compho */}
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex items-center justify-center rounded-full bg-black" style={{ width: CUST_SIZE, height: CUST_SIZE, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Image src="/COMPHO_2rowsWhite.png" alt="Compho" width={54} height={26} style={{ opacity: 0.72 }} />
                </div>
                <span className="text-[10.5px] font-medium tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.78)' }}>Compho</span>
              </div>

              {/* J&Co */}
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex items-center justify-center rounded-full bg-black" style={{ width: CUST_SIZE, height: CUST_SIZE, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Image src="/Hvit skrift (2) (1).png" alt="J&Co" width={56} height={28} style={{ opacity: 0.74 }} />
                </div>
                <span className="text-[10.5px] font-medium tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.78)' }}>J&Co</span>
              </div>

              {/* Kahlon */}
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex items-center justify-center rounded-full bg-black" style={{ width: CUST_SIZE, height: CUST_SIZE, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Image src="/KG-Hoved-White.png" alt="Kahlon" width={66} height={32} style={{ opacity: 0.72 }} />
                </div>
                <span className="text-[10.5px] font-medium tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.78)' }}>Kahlon</span>
              </div>
            </div>

            {/* Kahlon annotation */}
            <div className="absolute flex items-center" style={{ left: CUST_TOTAL + 18, top: CUST_SIZE / 2, transform: 'translateY(-50%)' }}>
              <Annotation text="Konverterer når stemmen høres menneskelig ut" />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
