'use client'

import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

const VW = 1440
const VH = 820
const CX = 860   // Kvad center
const CY = 410
const R = 215    // orbit radius

// Random-feeling dot timing per node
const DOT_CONFIGS = [
  { duration: 1.4, delay: 1.2, repeatDelay: 5.8 },
  { duration: 1.8, delay: 2.6, repeatDelay: 6.2 },
  { duration: 1.3, delay: 0.8, repeatDelay: 7.1 },
  { duration: 1.6, delay: 3.4, repeatDelay: 5.4 },
  { duration: 1.5, delay: 1.9, repeatDelay: 6.8 },
  { duration: 1.7, delay: 4.1, repeatDelay: 5.9 },
  { duration: 1.4, delay: 2.2, repeatDelay: 7.4 },
]

const nodes = [
  { label: 'Mediahus',           sub: 'Nyheter & innhold' },
  { label: 'Utdanning',          sub: 'Læringsverktøy' },
  { label: 'Finans',             sub: 'Rådgivning & service' },
  { label: 'Booking',            sub: 'Reservasjon & service' },
  { label: 'Helse',              sub: 'Pasientdialog' },
  { label: 'Kundeservice',       sub: 'Live support' },
  { label: 'Restauranter',       sub: 'Bestilling & hjelp' },
]

const signals = [
  '+38% vekst i conversational AI',
  'Norske selskaper adopterer stemmebaserte løsninger',
  'Voice AI-adopsjon øker i Norden',
  'Nordisk enterprise-AI vokser raskt',
]

// Deterministic star field
const STARS = Array.from({ length: 72 }, (_, i) => ({
  x: 260 + ((i * 137 + 23) % (VW - 260)),
  y: 10 + ((i * 97 + 41) % (VH - 20)),
  r: 0.3 + (i % 6) * 0.18,
  opacity: 0.025 + (i % 10) * 0.013,
}))

function getPos(i: number, n: number, radius: number) {
  const angle = ((i * 360 / n) - 90) * Math.PI / 180
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
}

function getLabelProps(px: number, py: number) {
  if (px > 80)  return { anchor: 'start' as const,  dx: 36,  dy: py > 0 ? 42 : -50 }
  if (px < -80) return { anchor: 'end'   as const,  dx: -36, dy: py > 0 ? 42 : -50 }
  return          { anchor: 'middle' as const, dx: 0,   dy: py > 0 ? 52 : -52 }
}

const SIGNALS = [
  { stat: '$47B',  text: 'global voice AI-markedsverdi innen 2029',     source: 'MarketsandMarkets' },
  { stat: '4 mrd', text: 'samtaler håndtert av AI daglig globalt i 2024', source: 'Gartner' },
  { stat: '40%',   text: 'av kundeservice-interaksjoner håndteres av AI innen 2025', source: 'Gartner' },
]

function NordicSignals({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col gap-4"
          style={{ maxWidth: 300 }}
        >
          <span className="text-[9px] tracking-[0.22em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.20)' }}>
            Markedssignaler
          </span>

          <div className="flex flex-col">
            {SIGNALS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.12 }}
              >
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                <div className="flex items-center gap-5 py-3">
                  <span className="font-bold tracking-tight text-white flex-shrink-0" style={{ fontSize: 26, lineHeight: 1, minWidth: 72 }}>
                    {s.stat}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-light leading-tight" style={{ color: 'rgba(255,255,255,0.95)' }}>
                      {s.text}
                    </span>
                    <span className="text-[9px] font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {s.source}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Market({ showSignals = false }: { showSignals?: boolean }) {
  const n = nodes.length

  return (
    <div className="relative w-full h-full bg-[#030303] overflow-hidden">

      {/* Header — top-left */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease, delay: 0.06 }}
        className="absolute top-8 left-16 z-20 flex flex-col gap-4"
        style={{ maxWidth: 280 }}
      >
        <span className="text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium">
          Markedsmulighet
        </span>
        <h2
          className="font-bold tracking-tight text-white leading-[1.04]"
          style={{ fontSize: 'clamp(26px, 2.8vw, 36px)' }}
        >
          Norden beveger seg mot conversational AI.
        </h2>

      </motion.div>

      {/* Chart — bottom-left */}
      <div className="absolute bottom-12 left-16 z-20">
        <NordicSignals show={showSignals} />
      </div>

      {/* ── Full-screen SVG — everything in one coordinate system ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ shapeRendering: 'geometricPrecision' } as React.CSSProperties}
      >
        <defs>
          <radialGradient id="kvad-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.10" />
            <stop offset="45%"  stopColor="white" stopOpacity="0.03" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula" cx="65%" cy="50%" r="38%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.016" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Stars */}
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.opacity} />
        ))}

        {/* Outer orbit ring */}
        <motion.circle
          cx={CX} cy={CY} r={R}
          fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          transition={{ duration: 1.4, ease, delay: 0.4 }}
        />

        {/* Animated green dots flowing outward — randomised timing */}
        {nodes.map((_, i) => {
          const pos = getPos(i, n, R * 0.84)
          const cfg = DOT_CONFIGS[i]
          return (
            <motion.circle key={i}
              r={2.0}
              fill="#4ade80"
              animate={{
                cx: [CX, CX + pos.x],
                cy: [CY, CY + pos.y],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: cfg.duration,
                delay: cfg.delay,
                repeat: Infinity,
                repeatDelay: cfg.repeatDelay,
                ease: 'easeInOut',
                times: [0, 0.18, 0.82, 1],
              }}
            />
          )
        })}

        {/* Ecosystem nodes — on the ring */}
        {nodes.map((node, i) => {
          const pos = getPos(i, n, R)
          const nx = CX + pos.x
          const ny = CY + pos.y
          const { anchor, dx, dy } = getLabelProps(pos.x, pos.y)

          return (
            <motion.g key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease, delay: 0.95 + i * 0.11 }}
              style={{ transformOrigin: `${nx}px ${ny}px` }}
            >
              {/* Node circle */}
              <circle cx={nx} cy={ny} r={26}
                fill="#060606"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="0.8"
              />
              {/* Center dot */}
              <circle cx={nx} cy={ny} r={4.5} fill="rgba(255,255,255,0.42)" />

              {/* Label */}
              <text
                x={nx + dx} y={ny + dy}
                textAnchor={anchor}
                fill="rgba(255,255,255,0.95)"
                fontSize="13"
                fontFamily="Inter, -apple-system, sans-serif"
                fontWeight="600"
                style={{ letterSpacing: '0.10em', textTransform: 'uppercase' } as React.CSSProperties}
              >
                {node.label}
              </text>
              {/* Sub label */}
              <text
                x={nx + dx} y={ny + dy + 18}
                textAnchor={anchor}
                fill="rgba(255,255,255,0.32)"
                fontSize="11"
                fontFamily="Inter, -apple-system, sans-serif"
                fontWeight="300"
                style={{ letterSpacing: '0.06em' } as React.CSSProperties}
              >
                {node.sub}
              </text>
            </motion.g>
          )
        })}

        {/* ── Kvad center node ── */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease, delay: 0.28 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {/* Main circle */}
          <circle
            cx={CX} cy={CY} r={50}
            fill="#040404"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          {/* Kvad icon */}
          <image
            href="/kvad-icon.svg"
            x={CX - 19} y={CY - 19}
            width={38} height={38}
            opacity={0.92}
          />
          {/* Label */}
          <text
            x={CX} y={CY + 72}
            textAnchor="middle"
            fill="rgba(255,255,255,0.88)"
            fontSize="10"
            fontFamily="Inter, -apple-system, sans-serif"
            fontWeight="600"
            style={{ letterSpacing: '0.28em' } as React.CSSProperties}
          >
            KVAD
          </text>
          <text
            x={CX} y={CY + 87}
            textAnchor="middle"
            fill="rgba(255,255,255,0.30)"
            fontSize="8.5"
            fontFamily="Inter, -apple-system, sans-serif"
            fontWeight="300"
            style={{ letterSpacing: '0.14em' } as React.CSSProperties}
          >
            Stemmelaget
          </text>
        </motion.g>
      </svg>
    </div>
  )
}
