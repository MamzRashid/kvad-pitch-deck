'use client'

import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

// Pricing band: many rapid vertical bars (volume/usage)
function ApiVisual() {
  const bars = Array.from({ length: 28 }, (_, i) => ({
    h: 0.25 + Math.abs(Math.sin(i * 0.7)) * 0.65,
    delay: i * 0.06,
    dur: 0.8 + (i % 5) * 0.14,
  }))
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 40 }}>
      {bars.map((b, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-white flex-shrink-0"
          style={{ width: 2, opacity: 0.18 }}
          animate={{ height: [b.h * 40, (0.15 + Math.abs(Math.sin(i * 0.9 + 1.2)) * 0.75) * 40, b.h * 40] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}
    </div>
  )
}

// Data band: smooth slow sine wave
function AgentVisual() {
  return (
    <svg width={180} height={36} viewBox="0 0 180 36" style={{ overflow: 'visible' }}>
      {[
        { amp: 0.55, freq: 1.8, phase: 0,   opacity: 0.22, width: 1.4 },
        { amp: 0.28, freq: 3.2, phase: 1.1, opacity: 0.12, width: 0.8 },
      ].map((layer, i) => {
        const cy = 18
        const n = 200
        const pts = Array.from({ length: n }, (_, j) => ({
          x: (j / (n - 1)) * 180,
          y: cy + Math.sin((j / (n - 1)) * Math.PI * 2 * layer.freq + layer.phase) * layer.amp * cy,
        }))
        let d = `M${pts[0].x},${pts[0].y}`
        for (let j = 1; j < pts.length; j++) {
          const mx = (pts[j - 1].x + pts[j].x) / 2
          d += ` C${mx},${pts[j - 1].y} ${mx},${pts[j].y} ${pts[j].x},${pts[j].y}`
        }
        return (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="white"
            strokeWidth={layer.width}
            opacity={layer.opacity}
            animate={{ opacity: [layer.opacity * 0.5, layer.opacity, layer.opacity * 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          />
        )
      })}
    </svg>
  )
}

// Enterprise band: single bold line with slow travelling pulse
function EnterpriseVisual() {
  return (
    <div className="relative flex items-center" style={{ width: 180, height: 2 }}>
      <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }} />
      <motion.div
        className="absolute rounded-full bg-white"
        style={{ width: 32, height: 2, top: 0 }}
        animate={{ left: [-32, 180] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.8 }}
      />
    </div>
  )
}

const BANDS = [
  {
    number: '01',
    title: 'Usage-based pricing',
    tag: 'Pay per character',
    desc: 'Customers pay for every character Kvad speaks. The more they use, the more we earn.',
    detail: ['Per-character billing', 'Streaming and real-time dialogue', 'Free tier for developers'],
    visual: <ApiVisual />,
    bg: 'rgba(255,255,255,0.012)',
  },
  {
    number: '02',
    title: 'Data exclusivity',
    tag: 'Exclusive rights',
    desc: 'We license the best native speech data in each language exclusively. Once we hold it, no one else can train on it.',
    detail: ['Exclusively licensed, not scraped', 'Natural conversation, not studio reads', 'Unavailable to competitors'],
    visual: <AgentVisual />,
    bg: 'transparent',
  },
  {
    number: '03',
    title: 'Enterprise Licensing',
    tag: 'Custom contracts',
    desc: 'Large players license Kvad as their own voice layer, white-label and on-premise.',
    detail: ['Custom voice models', 'On-premise integrations', 'White-label distribution'],
    visual: <EnterpriseVisual />,
    bg: 'rgba(255,255,255,0.008)',
  },
]

export default function BusinessModel() {
  return (
    <div className="relative w-full h-full bg-[#030303] flex flex-col overflow-hidden">

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.05 }}
        className="absolute top-8 left-16 z-20 flex items-center gap-6"
      >
        <span className="text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium">
          Business model
        </span>
        <div className="h-px w-8" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <span className="text-[10px] font-light" style={{ color: 'rgba(255,255,255,0.22)' }}>
          Kvad scales with every AI conversation
        </span>
      </motion.div>

      {/* Three full-width bands */}
      {BANDS.map((band, i) => (
        <motion.div
          key={i}
          className="flex-1 flex items-center relative"
          style={{ background: band.bg, borderTop: i > 0 ? '1px solid rgba(255,255,255,0.055)' : 'none' }}
          initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.18 + i * 0.2 }}
        >
          {/* Large faded number — background */}
          <div
            className="absolute left-10 font-bold select-none pointer-events-none"
            style={{
              fontSize: 160,
              lineHeight: 1,
              color: 'rgba(255,255,255,0.028)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.04em',
            }}
          >
            {band.number}
          </div>

          {/* Left — number + title + desc */}
          <div className="relative z-10 flex flex-col gap-2 pl-20" style={{ width: '44%' }}>
            <span className="text-[9px] font-mono tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.22)' }}>
              {band.number}
            </span>
            <h2
              className="font-bold tracking-tight text-white leading-[1.0]"
              style={{ fontSize: 'clamp(28px, 3.2vw, 42px)' }}
            >
              {band.title}
            </h2>
            <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.40)', maxWidth: 340 }}>
              {band.desc}
            </p>
          </div>

          {/* Center — visual */}
          <div className="relative z-10 flex items-center justify-center flex-1">
            {band.visual}
          </div>

          {/* Right — billing tag + details */}
          <div className="relative z-10 flex flex-col gap-3 pr-20" style={{ width: '26%' }}>
            <span
              className="text-[9px] font-medium tracking-[0.16em] uppercase px-2.5 py-1 rounded-full self-start"
              style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              {band.tag}
            </span>
            <div className="flex flex-col gap-2">
              {band.detail.map((d, j) => (
                <div key={j} className="flex items-center gap-2.5">
                  <div className="w-[3px] h-[3px] rounded-full bg-white flex-shrink-0" style={{ opacity: 0.22 }} />
                  <span className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.42)' }}>
                    {d}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Bottom border */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.055)' }} />
    </div>
  )
}
