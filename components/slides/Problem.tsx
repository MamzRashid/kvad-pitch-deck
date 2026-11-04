'use client'

import { useEffect, useState } from 'react'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'
import WaveformBg from '../WaveformBg'

const ease = [0.25, 0.1, 0.25, 1]
const FONT = 'Inter, -apple-system, sans-serif'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

// The text is all there from the start; only the drawing plays out:
// the race, the gap, Kvad, the expansion (beat 1 is a held beat of the race)
const BEAT_AT = [200, 1600, 1600, 2600, 3600]
const LAST = BEAT_AT.length - 1

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

const REASONS = [
  { number: '01', title: 'Smaller languages are poorly served', body: 'Pronunciation, prosody and dialects fall apart outside the top languages. Supported is not native.' },
  { number: '02', title: 'The leaders race for the big languages', body: 'Customers, benchmarks and revenue are in English and a few others. That is where they compete.' },
  { number: '03', title: 'No capacity for the rest', body: 'Every team moved to a small language lets rivals pull ahead where the money is.' },
]

/* ── Language map ─────────────────────────────────────────── */

const VB_W = 700
const VB_H = 540

type Lang = {
  id: string
  label: string
  x: number
  y: number
  r: number
  tier: 'big' | 'mid' | 'small'
  wave?: 1 | 2
  // Label placement for the small languages, kept clear of the links
  lx?: number
  ly?: number
  anchor?: 'start' | 'middle'
}

// Bubble size suggests relative market scale only, it is illustrative
const LANGS: Lang[] = [
  { id: 'en', label: 'English', x: 205, y: 195, r: 100, tier: 'big' },
  { id: 'zh', label: 'Mandarin', x: 370, y: 108, r: 58, tier: 'big' },
  { id: 'es', label: 'Spanish', x: 362, y: 278, r: 54, tier: 'big' },
  { id: 'ja', label: 'Japanese', x: 478, y: 190, r: 32, tier: 'mid' },
  { id: 'fr', label: 'French', x: 90, y: 360, r: 36, tier: 'mid' },
  { id: 'de', label: 'German', x: 205, y: 368, r: 34, tier: 'mid' },
  { id: 'no', label: 'Norwegian', x: 520, y: 395, r: 15, tier: 'small', lx: 520, ly: 440 },
  { id: 'sv', label: 'Swedish', x: 600, y: 318, r: 15, tier: 'small', lx: 600, ly: 294 },
  { id: 'fi', label: 'Finnish', x: 668, y: 352, r: 13, tier: 'small', wave: 1, lx: 668, ly: 330 },
  { id: 'da', label: 'Danish', x: 612, y: 452, r: 12, tier: 'small', lx: 631, ly: 456, anchor: 'start' },
  { id: 'et', label: 'Estonian', x: 688, y: 402, r: 10, tier: 'small', wave: 2, lx: 688, ly: 427 },
  { id: 'lv', label: 'Latvian', x: 628, y: 512, r: 9, tier: 'small', wave: 2, lx: 644, ly: 516, anchor: 'start' },
  { id: 'lt', label: 'Lithuanian', x: 440, y: 458, r: 9, tier: 'small', wave: 2, lx: 440, ly: 482 },
]
const NO = LANGS.find((l) => l.id === 'no')!
// Kvad's first model covers the Scandinavian languages together
const HOME = new Set(['no', 'sv', 'da'])
const EN = LANGS[0]

// Faint field of unnamed languages, the long tail
const rand = (n: number) => {
  const v = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return v - Math.floor(v)
}
const TAIL = Array.from({ length: 80 }, (_, i) => ({
  x: 20 + rand(i) * (VB_W - 40),
  y: 20 + rand(i + 500) * (VB_H - 40),
  r: 1.1 + rand(i + 900) * 1.4,
})).filter((d) => LANGS.every((l) => Math.hypot(d.x - l.x, d.y - l.y) > l.r + 22))

// Global labs sit spread around the English bubble's outline, in the gaps between the other languages
const LOGO_R = 15
function onEdge(deg: number, extra = 0) {
  const a = (deg * Math.PI) / 180
  return { x: EN.x + Math.cos(a) * (EN.r + extra), y: EN.y + Math.sin(a) * (EN.r + extra) }
}
// A gentle slide along the outline: the race never settles
function drift(deg: number) {
  const pts = [0, 3, 0, -3, 0].map((d) => onEdge(deg + d))
  return { x: pts.map((p) => p.x), y: pts.map((p) => p.y) }
}
const LABS = [
  { id: 'elevenlabs', name: 'ElevenLabs', logo: '/logos/elevenlabs.svg', plate: false, deg: 150, dur: 4.6 },
  { id: 'cartesia', name: 'Cartesia', logo: '/logos/cartesia.svg', plate: false, deg: 0, dur: 5.4 },
  { id: 'fish', name: 'Fish Audio', logo: '/logos/fish-audio.png', plate: true, deg: 265, dur: 5 },
].map((lab) => {
  const home = onEdge(lab.deg)
  // Names go beside logos on the left and right, above the logo at the top
  const cos = Math.cos((lab.deg * Math.PI) / 180)
  const label =
    cos < -0.6
      ? { x: home.x - LOGO_R - 9, y: home.y, anchor: 'end' as const }
      : cos > 0.6
        ? { x: home.x + LOGO_R + 9, y: home.y, anchor: 'start' as const }
        : { x: home.x, y: home.y - LOGO_R - 13, anchor: 'middle' as const }
  return { ...lab, home, drift: drift(lab.deg), label }
})

// Kvad icon above the Scandinavian cluster (viewBox 415 x 430)
const KVAD_W = 24
const KVAD_RATIO = 430 / 415

function langStyle(l: Lang, beat: number) {
  const early = beat < 2
  if (l.tier !== 'small') {
    const big = l.tier === 'big'
    if (early) return { fill: big ? 0.07 : 0.04, stroke: big ? 0.34 : 0.2, text: big ? 0.92 : 0.6 }
    return { fill: 0.025, stroke: beat === LAST ? 0.1 : 0.13, text: beat === LAST ? 0.28 : 0.34 }
  }
  if (HOME.has(l.id)) {
    if (early) return { fill: 0.08, stroke: 0.3, text: 0.45 }
    if (beat === 2) return { fill: 0.16, stroke: 0.7, text: 0.95 }
    return { fill: 0.9, stroke: 0.95, text: 1 }
  }
  if (beat === LAST) return l.wave === 1 ? { fill: 0.22, stroke: 0.8, text: 0.85 } : { fill: 0.1, stroke: 0.5, text: 0.55 }
  if (early) return { fill: 0.04, stroke: 0.16, text: 0.22 }
  return { fill: 0.06, stroke: 0.32, text: 0.5 }
}

function LanguageMap({ beat, reduce }: { beat: number; reduce: boolean }) {
  const loop = !reduce
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-full" style={{ overflow: 'visible' }}>
      {/* Long tail of languages */}
      {TAIL.map((d, i) => (
        <motion.circle
          key={`t${i}`}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="#fff"
          initial={{ opacity: 0 }}
          animate={{ opacity: beat < 0 ? 0 : beat === 2 || beat === 3 ? 0.2 : 0.07 }}
          transition={{ duration: 0.9, delay: beat === 0 ? 0.6 + (i % 10) * 0.05 : 0 }}
        />
      ))}

      {/* Heat around English while the race is on */}
      {loop && (
        <motion.circle
          cx={EN.x}
          cy={EN.y}
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={1}
          initial={{ r: EN.r, opacity: 0 }}
          animate={beat >= 0 && beat < 2 ? { r: [EN.r, EN.r + 34], opacity: [0.5, 0] } : { r: EN.r, opacity: 0 }}
          transition={beat < 2 ? { duration: 2.4, repeat: Infinity, ease: 'easeOut' } : { duration: 0.4 }}
        />
      )}

      {/* Language bubbles */}
      {LANGS.map((l, i) => {
        const s = langStyle(l, beat)
        const small = l.tier === 'small'
        const isNo = HOME.has(l.id)
        const lit = beat === LAST && l.wave
        return (
          <g key={l.id}>
            <motion.circle
              cx={l.x}
              cy={l.y}
              initial={{ r: 0 }}
              animate={{
                r: beat < 0 ? 0 : l.r,
                fill: `rgba(255,255,255,${s.fill})`,
                stroke: `rgba(255,255,255,${s.stroke})`,
              }}
              strokeWidth={1}
              transition={{
                r: { duration: 0.9, ease, delay: beat === 0 ? 0.05 * i : 0 },
                default: { duration: 0.7, ease, delay: lit ? (l.wave === 1 ? 0.3 : 0.8) + i * 0.05 : 0 },
              }}
            />
            <motion.text
              x={small ? l.lx : l.x}
              y={small ? l.ly : l.y + 4}
              textAnchor={l.anchor ?? 'middle'}
              fontFamily={small ? MONO : FONT}
              fontSize={small ? (isNo ? 12 : 10.5) : l.tier === 'big' ? 15 : 11.5}
              fontWeight={small ? (isNo ? 600 : 400) : 600}
              letterSpacing={small ? '0.08em' : '-0.01em'}
              fill="#fff"
              initial={{ opacity: 0 }}
              animate={{ opacity: beat < 0 ? 0 : s.text }}
              transition={{ duration: 0.7, delay: beat === 0 ? 0.4 + 0.05 * i : lit ? (l.wave === 1 ? 0.4 : 0.9) : 0 }}
            >
              {small ? l.label.toUpperCase() : l.label}
            </motion.text>
          </g>
        )
      })}

      {/* "Supported" ring: the language works, but not natively */}
      <motion.circle
        cx={NO.x}
        cy={NO.y}
        r={NO.r + 9}
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={1}
        strokeDasharray="2 3"
        initial={{ opacity: 0 }}
        animate={{ opacity: beat === 2 ? 1 : 0 }}
        transition={{ duration: 0.6, delay: beat === 2 ? 0.8 : 0 }}
      />

      {/* Global labs */}
      {LABS.map((lab) => {
                const animate = loop ? lab.drift : lab.home
        const transition = loop ? { duration: lab.dur, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }
        return (
          <motion.g
            key={lab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: beat < 0 ? 0 : beat >= 3 ? 0.5 : 1 }}
            transition={{ duration: 0.7, delay: beat === 0 ? 0.7 : 0 }}
          >
            <motion.g initial={lab.home} animate={animate} transition={transition}>
              <defs>
                <clipPath id={`logo-${lab.id}`}>
                  <circle r={LOGO_R} />
                </clipPath>
              </defs>
              {/* Transparent marks sit on a white plate so they read on the dark slide */}
              {lab.plate && <circle r={LOGO_R} fill="#fff" />}
              <image
                href={lab.logo}
                // Fish Audio's mark has wide padding, so it is drawn larger inside the plate
                x={-LOGO_R * (lab.plate ? 1.45 : 1)}
                y={-LOGO_R * (lab.plate ? 1.45 : 1)}
                width={LOGO_R * (lab.plate ? 2.9 : 2)}
                height={LOGO_R * (lab.plate ? 2.9 : 2)}
                clipPath={`url(#logo-${lab.id})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <circle r={LOGO_R + 2.5} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1} />
            </motion.g>
            <text
              x={lab.label.x}
              y={lab.label.y + 4}
              textAnchor={lab.label.anchor}
              fontFamily={FONT}
              fontSize={11}
              fontWeight={600}
              fill="rgba(255,255,255,0.8)"
            >
              {lab.name}
            </text>
          </motion.g>
        )
      })}

      <motion.text
        x={EN.x}
        y={EN.y - EN.r - 62}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={10.5}
        letterSpacing="0.2em"
        fill="#fff"
        initial={{ opacity: 0 }}
        animate={{ opacity: beat < 0 ? 0 : beat === LAST ? 0.6 : beat >= 2 ? 0.25 : 0.5 }}
        transition={{ duration: 0.7, delay: beat === 0 ? 0.9 : 0 }}
      >
        {beat === LAST ? 'GLOBAL GIANTS  |  SCALE' : 'GLOBAL LABS'}
      </motion.text>

      {/* Kvad lands on Scandinavia */}
      <motion.circle
        cx={NO.x}
        cy={NO.y}
        r={NO.r + 11}
        fill="none"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth={1.4}
        initial={{ opacity: 0, scale: 1.6 }}
        animate={beat >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.6 }}
        transition={{ duration: 0.9, ease, delay: beat === 3 ? 0.2 : 0 }}
        style={{ transformOrigin: `${NO.x}px ${NO.y}px`, filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.45))' }}
      />
      {loop && (
        <motion.circle
          cx={NO.x}
          cy={NO.y}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={1}
          initial={{ r: NO.r + 11, opacity: 0 }}
          animate={beat >= 3 ? { r: [NO.r + 11, NO.r + 40], opacity: [0.6, 0] } : { r: NO.r + 11, opacity: 0 }}
          transition={beat >= 3 ? { duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: 1 } : { duration: 0.3 }}
        />
      )}
      <motion.image
        href="/kvad-icon.svg"
        x={NO.x - KVAD_W / 2}
        y={NO.y - NO.r - 20 - KVAD_W * KVAD_RATIO}
        width={KVAD_W}
        height={KVAD_W * KVAD_RATIO}
        initial={{ opacity: 0, y: 6 }}
        animate={beat >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.6, ease, delay: beat === 3 ? 0.6 : 0 }}
      />

      {/* The playbook spreads to the next underserved languages */}
      {LANGS.filter((l) => l.wave || (HOME.has(l.id) && l.id !== 'no')).map((l, i) => {
        const home = !l.wave
        const show = home ? beat >= 3 : beat === LAST
        const len = Math.hypot(l.x - NO.x, l.y - NO.y)
        const ux = (l.x - NO.x) / len
        const uy = (l.y - NO.y) / len
        const from = { x: NO.x + ux * (NO.r + 13), y: NO.y + uy * (NO.r + 13) }
        const to = { x: l.x - ux * (l.r + 4), y: l.y - uy * (l.r + 4) }
        return (
          <motion.line
            key={`link-${l.id}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={`rgba(255,255,255,${home ? 0.75 : l.wave === 1 ? 0.5 : 0.3})`}
            strokeWidth={1}
            strokeDasharray={home || l.wave === 1 ? undefined : '2 3'}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease, delay: show ? (home ? 0.5 : l.wave === 1 ? 0.1 : 0.6) + i * 0.06 : 0 }}
          />
        )
      })}
      <motion.text
        x={600}
        y={258}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={10.5}
        letterSpacing="0.2em"
        fill="#fff"
        initial={{ opacity: 0 }}
        animate={{ opacity: beat === LAST ? 0.85 : 0 }}
        transition={{ duration: 0.7, delay: beat === LAST ? 1.0 : 0 }}
      >
        THE OPPORTUNITY
      </motion.text>
    </svg>
  )
}

/* ── Slide ────────────────────────────────────────────────── */

export default function Problem() {
  const reduce = useReducedMotion() ?? false
  const [beat, setBeat] = useState(-1)

  useEffect(() => {
    // Reduced motion: show the finished drawing right away
    if (reduce) {
      setBeat(LAST)
      return
    }
    const timers = BEAT_AT.map((t, i) => setTimeout(() => setBeat(i), t))
    return () => timers.forEach(clearTimeout)
  }, [reduce])

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative w-full h-full flex items-center bg-[#030303]">
        <WaveformBg opacity={0.016} speed={0.2} />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 65% 50%, #0e0e0e 0%, #030303 100%)' }}
        />

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
        >
          Problem and opportunity
        </motion.span>

        <div className="relative z-10 w-full h-full flex">
          {/* ── LEFT: question, answer, why ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center pl-16 pr-6 flex-shrink-0"
            style={{ width: '43%' }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-bold tracking-tight text-white leading-[1.04]"
              style={{ fontSize: 'clamp(30px, 3.3vw, 46px)' }}
            >
              Smaller languages are left behind.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 font-semibold tracking-tight leading-[1.2]"
              style={{ fontSize: 'clamp(19px, 1.75vw, 24px)' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>The giants compete for scale. </span>
              <span className="text-white">That leaves whole language markets without a leader.</span>
            </motion.p>

            <div className="mt-8 flex flex-col">
              {REASONS.map((r, i) => (
                <motion.div key={r.number} variants={fadeUp}>
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                  <div className="flex gap-5 py-3.5">
                    <span className="text-[9px] font-mono tracking-[0.2em] pt-[5px] w-5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {r.number}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-[16px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.92)' }}>
                        {r.title}
                      </span>
                      <span className="text-[13px] font-light leading-relaxed max-w-[440px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {r.body}
                      </span>
                    </div>
                  </div>
                  {i === REASONS.length - 1 && <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: the language map ── */}
          <div className="flex-1 flex items-center justify-center pr-16 pl-4 py-16">
            <div className="w-full h-full max-h-[560px]">
              <LanguageMap beat={beat} reduce={reduce} />
            </div>
          </div>
        </div>

      </div>
    </MotionConfig>
  )
}
