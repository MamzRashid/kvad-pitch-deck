'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
}

const nodes = [
  { label: 'Kundeservice', angle: 0 },
  { label: 'Helsevesen', angle: 60 },
  { label: 'Restauranter', angle: 120 },
  { label: 'Enterprise AI', angle: 180 },
  { label: 'Assistenter', angle: 240 },
  { label: 'Smarte enheter', angle: 300 },
]

const RADIUS = 180

function polarToCartesian(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) }
}

export default function Vision() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303] px-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_48%,#0e0e0e_0%,#030303_100%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-6xl flex flex-col gap-14 items-center"
      >
        <motion.div variants={item} className="flex flex-col gap-4 text-center">
          <span className="text-[11px] text-white/25 tracking-[0.2em] uppercase font-medium">
            Visjon
          </span>
          <h2 className="text-[52px] font-bold tracking-tight text-white leading-[1.05]">
            Alle AI-agenter vil trenge en stemme.
          </h2>
        </motion.div>

        <motion.div variants={item} className="relative flex items-center justify-center" style={{ width: 520, height: 420 }}>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="-260 -210 520 420"
            overflow="visible"
          >
            {nodes.map((node, i) => {
              const pos = polarToCartesian(node.angle, RADIUS)
              return (
                <motion.line
                  key={i}
                  x1={0} y1={0} x2={pos.x} y2={pos.y}
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                />
              )
            })}
          </svg>

          <motion.div
            className="absolute z-10 flex flex-col items-center justify-center gap-1 w-24 h-24 rounded-full bg-[#111111] border border-white/12"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            animate={{ boxShadow: ['0 0 0 0 rgba(255,255,255,0)', '0 0 0 12px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-[18px] font-bold text-white/80 tracking-tight">Kvad</span>
            <span className="text-[9px] text-white/25 tracking-[0.15em] uppercase">Tale-API</span>
          </motion.div>

          {nodes.map((node, i) => {
            const pos = polarToCartesian(node.angle, RADIUS)
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute flex items-center justify-center"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="px-4 py-2.5 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
                  <span className="text-[12px] text-white/45 font-medium whitespace-nowrap">
                    {node.label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}
