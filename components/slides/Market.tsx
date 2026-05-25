'use client'

import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

const VW = 1440
const VH = 820
const CX = 940
const CY = 410
const R = 205

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
  { label: 'Mediahus',     sub: 'Nyhetsopplesning & radio' },
  { label: 'Offentlig',    sub: 'NAV, kommuner & stat' },
  { label: 'Finans',       sub: 'Rådgivning & service' },
  { label: 'Innhold',      sub: 'Lydbok, podkast & e-læring' },
  { label: 'Dubing',       sub: 'Film & TV' },
  { label: 'Kundeservice', sub: 'Live support' },
  { label: 'AI-agenter',   sub: 'Samtale & automatisering' },
]

const STARS = Array.from({ length: 72 }, (_, i) => ({
  x: 260 + ((i * 137 + 23) % (VW - 260)),
  y: 10 + ((i * 97 + 41) % (VH - 20)),
  r: 0.3 + (i % 6) * 0.18,
  opacity: 0.025 + (i % 10) * 0.013,
}))

const MARKETS = [
  {
    label: 'TAM',
    desc: 'Global voice AI-markedsverdi innen 2029',
    value: '$47B',
    bar: 1.0,
    source: 'MarketsandMarkets',
  },
  {
    label: 'SAM',
    desc: 'Nordisk enterprise voice AI',
    value: '$2.4B',
    bar: 0.30,
    source: 'Estimert',
  },
  {
    label: 'SOM',
    desc: 'Kvads adresserbart marked — år 1–3',
    value: '$85M',
    bar: 0.10,
    source: 'Intern estimat',
  },
]

function getPos(i: number, n: number, radius: number) {
  const angle = ((i * 360 / n) - 90) * Math.PI / 180
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
}

function getLabelProps(px: number, py: number) {
  if (px > 80)  return { anchor: 'start' as const,  dx: 36,  dy: py > 0 ? 42 : -50 }
  if (px < -80) return { anchor: 'end'   as const,  dx: -36, dy: py > 0 ? 42 : -50 }
  return          { anchor: 'middle' as const, dx: 0,   dy: py > 0 ? 52 : -52 }
}

export default function Market() {
  const n = nodes.length

  return (
    <div className="relative w-full h-full bg-[#030303] overflow-hidden">

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        Markedsmulighet
      </motion.span>

      {/* Left panel */}
      <div className="absolute top-0 left-0 h-full z-20 flex flex-col justify-center"
        style={{ width: 420, paddingLeft: 64, paddingRight: 32 }}>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.12 }}
          className="font-bold tracking-tight text-white leading-[1.04] mb-4"
          style={{ fontSize: 'clamp(26px, 2.6vw, 34px)' }}
        >
          Tekst til tale er et milliardmarked. Norsk har ingen leder.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.22 }}
          className="text-[13px] font-light leading-relaxed mb-10"
          style={{ color: 'rgba(255,255,255,0.42)' }}
        >
          Voice AI er et av de raskest voksende segmentene innen enterprise-teknologi. Kvad er infrastrukturlaget for norsk og nordisk tale — på tvers av alle bransjer.
        </motion.p>

        {/* TAM / SAM / SOM */}
        <div className="flex flex-col gap-5">
          {MARKETS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.38 + i * 0.14 }}
            >
              <div className="flex items-baseline justify-between mb-1.5">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.28)' }}>
                    {m.label}
                  </span>
                  <span className="text-[11px] font-light"
                    style={{ color: 'rgba(255,255,255,0.38)' }}>
                    {m.desc}
                  </span>
                </div>
                <span className="text-[15px] font-bold tracking-tight text-white ml-3 flex-shrink-0">
                  {m.value}
                </span>
              </div>

              {/* Bar track */}
              <div className="relative h-[3px] rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.07)' }}>
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ background: i === 0 ? 'rgba(255,255,255,0.55)' : i === 1 ? 'rgba(255,255,255,0.36)' : 'rgba(74,222,128,0.70)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${m.bar * 100}%` }}
                  transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1], delay: 0.55 + i * 0.14 }}
                />
              </div>

              <div className="mt-1">
                <span className="text-[9px] font-medium tracking-wide"
                  style={{ color: 'rgba(255,255,255,0.20)' }}>
                  {m.source}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Full-screen SVG — ecosystem diagram */}
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

        {/* Animated green dots flowing outward */}
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

        {/* Ecosystem nodes */}
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
              <circle cx={nx} cy={ny} r={26}
                fill="#060606"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="0.8"
              />
              <circle cx={nx} cy={ny} r={4.5} fill="rgba(255,255,255,0.42)" />
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

        {/* Kvad center node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease, delay: 0.28 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle cx={CX} cy={CY} r={50}
            fill="#040404"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <image
            href="/kvad-icon.svg"
            x={CX - 19} y={CY - 19}
            width={38} height={38}
            opacity={0.92}
          />
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
