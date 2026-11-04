'use client'

import { motion } from 'framer-motion'
import WaveformBg from '../WaveformBg'

const ease = [0.25, 0.1, 0.25, 1]
const FONT = 'Inter, -apple-system, sans-serif'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'
const GREEN = '#4ade80'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

const REASONS = [
  { number: '01', title: 'Exclusive data', body: 'Once we hold the rights to the best native speech data in a language, it is no longer for sale.' },
  { number: '02', title: 'Focus', body: 'A small language is a rounding error for them. For us it is the whole business.' },
  { number: '03', title: 'Trust', body: 'Local hosting and zero data retention for businesses and the public sector.' },
]

/* ── Positioning map ──────────────────────────────────────── */

const W = 560
const H = 460
const PAD = 40
// Plot area: x = language coverage (left narrow, right broad), y = native quality (up is better)
const X0 = PAD
const X1 = W - PAD
const Y0 = H - PAD
const Y1 = PAD

const LABS = [
  { id: 'elevenlabs', name: 'ElevenLabs', logo: '/logos/elevenlabs.svg', plate: false, x: 0.86, y: 0.36 },
  { id: 'cartesia', name: 'Cartesia', logo: '/logos/cartesia.svg', plate: false, x: 0.64, y: 0.26 },
  { id: 'fish', name: 'Fish Audio', logo: '/logos/fish-audio.png', plate: true, x: 0.76, y: 0.14 },
]
const LOGO_R = 15

const px = (x: number) => X0 + x * (X1 - X0)
const py = (y: number) => Y0 - y * (Y0 - Y1)

// Kvad starts focused and native, then widens coverage without giving up quality
const KVAD = { x: 0.16, y: 0.86 }
const KVAD_NEXT = { x: 0.5, y: 0.86 }

function PositioningMap() {
  const kx = px(KVAD.x)
  const ky = py(KVAD.y)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ overflow: 'visible' }}>
      {/* Axes */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="rgba(255,255,255,0.16)" strokeWidth={1} />
        <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke="rgba(255,255,255,0.16)" strokeWidth={1} />
        <text x={X1} y={Y0 + 24} textAnchor="end" fontFamily={MONO} fontSize={10} letterSpacing="0.18em" fill="rgba(255,255,255,0.4)">
          LANGUAGE COVERAGE →
        </text>
        <text
          x={X0 - 16}
          y={Y1}
          textAnchor="end"
          fontFamily={MONO}
          fontSize={10}
          letterSpacing="0.18em"
          fill="rgba(255,255,255,0.4)"
          transform={`rotate(-90 ${X0 - 16} ${Y1})`}
        >
          NATIVE QUALITY →
        </text>
      </motion.g>

      {/* Global labs */}
      {LABS.map((lab, i) => {
        const x = px(lab.x)
        const y = py(lab.y)
        return (
          <motion.g
            key={lab.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.5 + i * 0.12 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            <defs>
              <clipPath id={`comp-logo-${lab.id}`}>
                <circle cx={x} cy={y} r={LOGO_R} />
              </clipPath>
            </defs>
            {/* Transparent marks sit on a white plate so they read on the dark slide */}
            {lab.plate && <circle cx={x} cy={y} r={LOGO_R} fill="#fff" />}
            <image
              href={lab.logo}
              // Fish Audio's mark has wide padding, so it is drawn larger inside the plate
              x={x - LOGO_R * (lab.plate ? 1.45 : 1)}
              y={y - LOGO_R * (lab.plate ? 1.45 : 1)}
              width={LOGO_R * (lab.plate ? 2.9 : 2)}
              height={LOGO_R * (lab.plate ? 2.9 : 2)}
              clipPath={`url(#comp-logo-${lab.id})`}
              preserveAspectRatio="xMidYMid slice"
            />
            <circle cx={x} cy={y} r={LOGO_R + 2.5} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1} />
            <text x={x} y={y + LOGO_R + 20} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={600} fill="rgba(255,255,255,0.7)">
              {lab.name}
            </text>
          </motion.g>
        )
      })}

      <motion.text
        x={px(0.75)}
        y={py(0.5) + 4}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={10}
        letterSpacing="0.2em"
        fill="rgba(255,255,255,0.35)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        GLOBAL GIANTS
      </motion.text>

      {/* Kvad widens coverage, quality stays native */}
      <motion.line
        x1={kx + 30}
        y1={ky}
        x2={px(KVAD_NEXT.x)}
        y2={py(KVAD_NEXT.y)}
        stroke={GREEN}
        strokeOpacity={0.6}
        strokeWidth={1}
        strokeDasharray="3 5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease, delay: 1.5 }}
      />
      <motion.path
        d={`M${px(KVAD_NEXT.x) - 6},${py(KVAD_NEXT.y) - 5} L${px(KVAD_NEXT.x)},${py(KVAD_NEXT.y)} L${px(KVAD_NEXT.x) - 6},${py(KVAD_NEXT.y) + 5}`}
        fill="none"
        stroke={GREEN}
        strokeOpacity={0.7}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.5 }}
      />
      <motion.text
        x={px(KVAD_NEXT.x) + 12}
        y={py(KVAD_NEXT.y) + 4}
        fontFamily={MONO}
        fontSize={10}
        letterSpacing="0.16em"
        fill="rgba(74,222,128,0.85)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
      >
        +5 LANGUAGES
      </motion.text>

      <motion.g
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 1.1 }}
        style={{ transformOrigin: `${kx}px ${ky}px` }}
      >
        <circle cx={kx} cy={ky} r={24} fill="#050505" stroke="rgba(255,255,255,0.9)" strokeWidth={1.4} style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.35))' }} />
        <image href="/kvad-icon.svg" x={kx - 12} y={ky - 12.5} width={24} height={25} />
        <text x={kx} y={ky + 44} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={700} letterSpacing="0.24em" fill="#fff">
          KVAD
        </text>
      </motion.g>
      <motion.circle
        cx={kx}
        cy={ky}
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={1}
        initial={{ r: 24, opacity: 0 }}
        animate={{ r: [24, 52], opacity: [0.6, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: 2 }}
      />
    </svg>
  )
}

/* ── Slide ────────────────────────────────────────────────── */

export default function Competition() {
  return (
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
        Competition
      </motion.span>

      <div className="relative z-10 w-full h-full flex">
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
            Why won&apos;t the giants just do this?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 font-semibold tracking-tight leading-[1.2]"
            style={{ fontSize: 'clamp(19px, 1.75vw, 24px)' }}
          >
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>They compete for scale. </span>
            <span className="text-white">Kvad competes for local excellence.</span>
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

        <div className="flex-1 flex flex-col items-center justify-center pr-16 pl-12 py-16">
          <div className="w-full h-full max-h-[480px]">
            <PositioningMap />
          </div>
          <span className="mt-2 self-end text-[10px] font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Illustrative positioning in smaller languages
          </span>
        </div>
      </div>
    </div>
  )
}
