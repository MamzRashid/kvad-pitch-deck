'use client'

import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

const VW = 1440
const VH = 810
// Norway is the source; each phase is one wavefront further out
const SX = 130
const SY = 392
const STEP = 260
const RADII = [STEP, STEP * 2, STEP * 3, STEP * 4]
const ARC_DEG = 70
const COL_TOP = 350
const FONT = 'Inter, -apple-system, sans-serif'

type Group = { name?: string; lines: string[] }

const PHASES: {
  number: string
  status: string
  title?: string
  groups: Group[]
  note?: string[]
  strength: number
}[] = [
  {
    number: '01',
    status: 'Current focus',
    title: 'Norway',
    groups: [{ lines: ['Norwegian TTS and dialects'] }],
    note: ['Where the technology, the data', 'and the first customers are built.'],
    strength: 1,
  },
  {
    number: '02',
    status: 'Planned',
    title: 'Nordics',
    groups: [{ lines: ['Sweden · Denmark', 'Finland · Iceland'] }],
    note: ['Closest languages and markets.', 'Sweden and Denmark first.'],
    strength: 0.78,
  },
  {
    number: '03',
    status: 'Under evaluation',
    title: 'Wider Europe',
    groups: [
      { name: 'Baltics', lines: ['Estonia · Latvia · Lithuania'] },
      { name: 'Balkans', lines: ['Albania · Kosovo · Serbia', 'Bosnia and Herzegovina', 'Montenegro · Croatia', 'North Macedonia'] },
    ],
    note: ['Related languages let one model', 'family serve several countries.'],
    strength: 0.6,
  },
  {
    number: '04',
    status: 'Long-term option',
    title: 'Beyond Europe',
    groups: [
      { name: 'Caucasus', lines: ['Georgia · Armenia'] },
      { name: 'Central Asia', lines: ['Uzbekistan · Kazakhstan'] },
      { name: 'South Asia', lines: ['Nepal · Bangladesh'] },
      { name: 'Middle East', lines: ['Underserved Arabic dialects'] },
    ],
    strength: 0.46,
  },
  {
    number: '05',
    status: 'On the radar',
    groups: [{ lines: ['Nigeria · Ethiopia', 'East Africa', 'Cambodia · Mongolia'] }],
    strength: 0.32,
  },
]

function arcPath(r: number) {
  const a = (ARC_DEG * Math.PI) / 180
  const x = SX + Math.cos(a) * r
  return `M${x},${SY - Math.sin(a) * r} A${r},${r} 0 0 1 ${x},${SY + Math.sin(a) * r}`
}

const ARC_STYLES = [
  { opacity: 0.16, dash: undefined },
  { opacity: 0.11, dash: undefined },
  { opacity: 0.1, dash: '3 6' },
  { opacity: 0.09, dash: '1.5 6' },
]

// Lays out one phase column as SVG text, top-down
function PhaseColumn({ phase, x, i }: { phase: (typeof PHASES)[number]; x: number; i: number }) {
  const s = phase.strength
  const home = i === 0
  const els: JSX.Element[] = []
  let y = COL_TOP

  els.push(
    <text key="status" x={x} y={y} fontSize={10.5} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      fill={home ? '#4ade80' : `rgba(255,255,255,${0.5 * s + 0.05})`}
      style={{ letterSpacing: '0.18em', textTransform: 'uppercase' } as React.CSSProperties}>
      {phase.number}  {phase.status.toUpperCase()}
    </text>
  )
  y += 36

  if (phase.title) {
    els.push(
      <text key="title" x={x} y={y} fontSize={25} fontWeight={700} fontFamily={FONT}
        fill={`rgba(255,255,255,${0.95 * s})`} style={{ letterSpacing: '-0.02em' } as React.CSSProperties}>
        {phase.title}
      </text>
    )
    y += 34
  } else {
    y += 4
  }

  phase.groups.forEach((g, gi) => {
    if (g.name) {
      els.push(
        <text key={`g${gi}`} x={x} y={y} fontSize={10.5} fontWeight={600} fontFamily={FONT}
          fill={`rgba(255,255,255,${0.62 * s + 0.08})`}
          style={{ letterSpacing: '0.16em', textTransform: 'uppercase' } as React.CSSProperties}>
          {g.name}
        </text>
      )
      y += 19
    }
    g.lines.forEach((line, li) => {
      els.push(
        <text key={`g${gi}l${li}`} x={x} y={y} fontSize={13.5} fontWeight={300} fontFamily={FONT}
          fill={`rgba(255,255,255,${0.8 * s + 0.06})`}>
          {line}
        </text>
      )
      y += 19
    })
    y += 13
  })

  if (phase.note) {
    y += 6
    els.push(<line key="rule" x1={x} y1={y - 14} x2={x + 28} y2={y - 14} stroke="rgba(255,255,255,0.14)" strokeWidth={0.8} />)
    phase.note.forEach((line, li) => {
      els.push(
        <text key={`n${li}`} x={x} y={y + li * 17} fontSize={12} fontWeight={300} fontFamily={FONT}
          fill={`rgba(255,255,255,${0.42 * s + 0.08})`}>
          {line}
        </text>
      )
    })
  }

  return (
    <motion.g
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.55 + i * 0.16 }}
    >
      {els}
    </motion.g>
  )
}

export default function Expansion() {
  // Column starts just inside each wavefront; Norway sits beside the source
  const colX = [SX + 34, ...RADII.map((r) => SX + r + 28)]

  return (
    <div className="relative w-full h-full bg-[#030303] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 12% 60%, #0e0e0e 0%, #030303 100%)' }}
      />

      {/* Header */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        Expansion
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="absolute left-16 z-20 flex flex-col gap-4"
        style={{ top: 78, maxWidth: 640 }}
      >
        <h2 className="font-bold tracking-tight text-white leading-[1.03]" style={{ fontSize: 'clamp(32px, 3.4vw, 46px)' }}>
          Norway is the starting point.<br />Not the limit.
        </h2>
        <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 520 }}>
          Markets are grouped by language and sequenced by readiness. Norway is the commitment.
          Each next step is earned by traction in the one before.
        </p>
      </motion.div>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ shapeRendering: 'geometricPrecision' } as React.CSSProperties}
      >
        <defs>
          {/* Waves fade out above (headline) and below (footer) */}
          <linearGradient id="exp-fade" x1="0" y1="0" x2="0" y2={VH} gradientUnits="userSpaceOnUse">
            <stop offset="0.27" stopColor="white" stopOpacity="0" />
            <stop offset="0.40" stopColor="white" stopOpacity="1" />
            <stop offset="0.84" stopColor="white" stopOpacity="1" />
            <stop offset="0.96" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="exp-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={VW} height={VH}>
            <rect x="0" y="0" width={VW} height={VH} fill="url(#exp-fade)" />
          </mask>
        </defs>

        <g mask="url(#exp-mask)">
          {/* Static wavefronts, one per phase */}
          {RADII.map((r, i) => (
            <motion.path
              key={r}
              d={arcPath(r)}
              fill="none"
              stroke="white"
              strokeOpacity={ARC_STYLES[i].opacity}
              strokeWidth={0.9}
              strokeDasharray={ARC_STYLES[i].dash}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease, delay: 0.3 + i * 0.16 }}
            />
          ))}

        </g>


        {PHASES.map((p, i) => (
          <PhaseColumn key={p.number} phase={p} x={colX[i]} i={i} />
        ))}

        <motion.text
          x={SX + 34}
          y={720}
          fontSize={11}
          fontWeight={300}
          fontFamily={FONT}
          fill="rgba(255,255,255,0.32)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          Potential markets, not launch commitments. Sequence and timing follow demand, data access and local partners.
        </motion.text>
      </svg>
    </div>
  )
}
