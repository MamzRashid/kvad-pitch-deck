'use client'

import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

const phases = [
  {
    number: '01',
    timeframe: '0 – 6 months',
    title: 'Developer API',
    desc: 'Open API with a free tier. Reach Norwegian developers and product teams early.',
    bullets: ['Free tier lowers the barrier', 'Simple API documentation', 'Goal: 50 active integrations'],
    verticalPos: '34%',
  },
  {
    number: '02',
    timeframe: '6 – 18 months',
    title: 'Vertical expansion',
    desc: 'Direct sales to customer service, media and healthcare in Norway.',
    bullets: ['10 paying enterprise customers', 'Partnerships with digital agencies', 'Focus: media & customer service'],
    verticalPos: '52%',
  },
  {
    number: '03',
    timeframe: '18 – 36 months',
    title: 'Nordic scaling',
    desc: 'Expansion to Sweden and Denmark through white-label and partner networks.',
    bullets: ['Sweden and Denmark in year 2', 'White-label for large players', 'The Nordic voice infrastructure standard'],
    verticalPos: '70%',
  },
]

export default function GoToMarket() {
  return (
    <div className="relative w-full h-full bg-[#030303] flex overflow-hidden">

      {/* Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="absolute top-8 left-16 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium z-30"
      >
        Go-to-Market
      </motion.span>

      {phases.map((phase, i) => (
        <motion.div
          key={i}
          className="relative flex-1 h-full overflow-hidden"
          style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease, delay: 0.1 + i * 0.15 }}
        >

          {/* Giant watermark number */}
          <motion.div
            className="absolute font-bold select-none pointer-events-none"
            style={{
              fontSize: 'clamp(200px, 22vw, 300px)',
              lineHeight: 1,
              color: 'rgba(255,255,255,0.028)',
              letterSpacing: '-0.06em',
              bottom: -30,
              right: -10,
            }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 1.4, ease, delay: 0.3 + i * 0.15 },
              scale:   { duration: 1.4, ease, delay: 0.3 + i * 0.15 },
              y:       { duration: 8 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 },
            }}
          >
            {phase.number}
          </motion.div>

          {/* Content block — staggered vertically */}
          <div
            className="absolute left-10 right-10 flex flex-col gap-5"
            style={{ top: phase.verticalPos, transform: 'translateY(-50%)' }}
          >
            {/* Timeframe badge */}
            <motion.span
              className="text-[9px] font-medium tracking-[0.18em] uppercase px-2.5 py-1 rounded-full self-start"
              style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.09)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.4 + i * 0.15 }}
            >
              {phase.timeframe}
            </motion.span>

            {/* Title */}
            <motion.h2
              className="font-bold tracking-tight text-white leading-[1.04]"
              style={{ fontSize: 'clamp(24px, 2.4vw, 30px)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.5 + i * 0.15 }}
            >
              {phase.title}
            </motion.h2>

            {/* Divider — grows from left */}
            <motion.div
              style={{ height: 1, background: 'rgba(255,255,255,0.07)', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.6 + i * 0.15 }}
            />

            {/* Description */}
            <motion.p
              className="text-[12px] font-light leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.62)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 + i * 0.15 }}
            >
              {phase.desc}
            </motion.p>

            {/* Bullets */}
            <div className="flex flex-col gap-2">
              {phase.bullets.map((b, j) => (
                <motion.div
                  key={j}
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, ease, delay: 0.75 + i * 0.15 + j * 0.07 }}
                >
                  <div className="w-[3px] h-[3px] rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.22)' }} />
                  <span className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.52)' }}>{b}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      ))}
    </div>
  )
}
