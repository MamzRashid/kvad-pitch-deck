'use client'

import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

const allocations = [
  { number: '01', area: 'Inference & compute infrastructure', legend: 'Infrastructure', pct: 27 },
  { number: '02', area: 'Proprietary speech data & labeling', legend: 'Data', pct: 21 },
  { number: '03', area: 'Go-to-market & outbound', legend: 'Go-to-market', pct: 19 },
  { number: '04', area: 'Legal, advisory & buffer', legend: 'Operations', pct: 19 },
  { number: '05', area: 'Engineering team', legend: 'Team', pct: 14 },
]

const SEG_COLORS = [
  '#38BDF8',
  '#818CF8',
  '#34D399',
  '#FBBF24',
  '#F472B6',
]

const BAR_COLORS = SEG_COLORS

// Donut config (pathLength=1 normalization)
const GAP = 0.013
const RADIUS = 76
const STROKE = 14

const SEGS = (() => {
  let start = 0
  return allocations.map((a) => {
    const len = a.pct / 100 - GAP
    const s = { len, start }
    start += len + GAP
    return s
  })
})()

function DonutChart() {
  return (
    <div className="flex flex-col items-center gap-5">
      <svg width={196} height={196} viewBox="-98 -98 196 196">
        {/* Background ring */}
        <circle r={RADIUS} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={STROKE} />

        <g transform="rotate(-90)">
          {SEGS.map((seg, i) => (
            <motion.circle
              key={i}
              r={RADIUS}
              fill="none"
              stroke={SEG_COLORS[i]}
              strokeWidth={STROKE}
              strokeLinecap="butt"
              pathLength={1}
              strokeDashoffset={-seg.start}
              initial={{ strokeDasharray: '0 1' }}
              animate={{ strokeDasharray: `${seg.len} ${1 - seg.len}` }}
              transition={{ duration: 1.1, ease, delay: 0.35 + i * 0.18 }}
            />
          ))}
        </g>

        {/* Center label */}
        <text
          textAnchor="middle"
          y={-7}
          fill="white"
          fontSize={24}
          fontWeight={700}
          fontFamily="Inter, -apple-system, sans-serif"
          style={{ letterSpacing: '-0.03em' } as React.CSSProperties}
        >
          6.5M
        </text>
        <text
          textAnchor="middle"
          y={11}
          fill="rgba(255,255,255,0.28)"
          fontSize={8.5}
          fontFamily="Inter, -apple-system, sans-serif"
          style={{ letterSpacing: '0.22em' } as React.CSSProperties}
        >
          NOK · PRE-SEED
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-2" style={{ minWidth: 170 }}>
        {allocations.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.6 + i * 0.12 }}
            className="flex items-center gap-2.5"
          >
            <div
              className="w-2 h-2 rounded-[2px] flex-shrink-0"
              style={{ background: SEG_COLORS[i] }}
            />
            <span className="text-[10px] font-light flex-1" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {a.legend}
            </span>
            <span className="text-[11px] font-semibold tabular-nums" style={{ color: 'rgba(255,255,255,0.60)' }}>
              {a.pct}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Ask() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#030303]">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 44%, #0f0f0f 0%, #030303 100%)' }}
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        The ask
      </motion.span>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-16 flex items-center gap-14">

        {/* Left: header + allocations */}
        <div className="flex-1 flex flex-col gap-7">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease }}
            className="flex flex-col gap-3"
          >
            <span className="text-[10px] text-white/22 tracking-[0.26em] uppercase font-medium">Pre-seed round</span>
            <div className="flex items-end gap-6">
              <div className="relative flex-shrink-0">
                <div className="absolute pointer-events-none"
                  style={{ inset: '-14px -28px', background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)', filter: 'blur(20px)' }}
                />
                <h2 className="relative text-[76px] font-bold tracking-tight text-white leading-none whitespace-nowrap">NOK 6.5M</h2>
              </div>
              <p className="text-[13px] font-light leading-relaxed pb-2" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 300 }}>
                Takes Norwegian to production and proves the playbook we repeat in every market after it.
              </p>
            </div>

          </motion.div>

          {/* Allocation rows */}
          <div className="flex flex-col">
            {allocations.map((alloc, i) => (
              <motion.div
                key={alloc.number}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.12 }}
              >
                {i > 0 && <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />}
                <div className="py-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono tracking-widest" style={{ color: 'rgba(255,255,255,0.16)' }}>
                        {alloc.number}
                      </span>
                      <h3 className="text-[18px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.88)' }}>
                        {alloc.area}
                      </h3>
                    </div>
                    <span className="text-[26px] font-bold tabular-nums tracking-tight" style={{ color: 'rgba(255,255,255,0.70)' }}>
                      {alloc.pct}%
                    </span>
                  </div>

                  {/* Animated bar */}
                  <div className="relative h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', marginLeft: 21 }}>
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: BAR_COLORS[i] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${alloc.pct}%` }}
                      transition={{ duration: 1.1, ease, delay: 0.45 + i * 0.14 }}
                    />
                  </div>


                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: donut chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease, delay: 0.15 }}
          className="flex-shrink-0"
        >
          <DonutChart />
        </motion.div>

      </div>
    </div>
  )
}
