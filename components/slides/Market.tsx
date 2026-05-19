'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
}

const segments = [
  {
    label: 'Samtale-AI',
    size: '$47B',
    growth: '+34% CAGR',
    desc: 'Det globale markedet for samtale-AI-systemer vokser raskt etter hvert som autonome agenter blir standarden.',
    bar: 0.85,
  },
  {
    label: 'Taleinfrastruktur',
    size: '$12B',
    growth: '+28% CAGR',
    desc: 'Dedikerte tale-APIer og infrastruktur for AI-produkter representerer et høymargins lag der vinneren tar alt.',
    bar: 0.52,
  },
  {
    label: 'Nordisk AI-marked',
    size: '$3.2B',
    growth: '+41% CAGR',
    desc: 'Det norske og nordiske AI-markedet er et av de raskest voksende i Europa, med sterk enterprise-adopsjon.',
    bar: 0.28,
  },
]

export default function Market() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303] px-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,#0f0f0f_0%,#030303_100%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl flex flex-col gap-14"
      >
        <motion.div variants={item} className="flex flex-col gap-4">
          <span className="text-[11px] text-white/25 tracking-[0.2em] uppercase font-medium">
            Markedsmulighet
          </span>
          <h2 className="text-[52px] font-bold tracking-tight text-white leading-[1.05] max-w-2xl">
            Tale blir et kjernelager i AI-interaksjon.
          </h2>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-4">
          {segments.map((seg) => (
            <div
              key={seg.label}
              className="p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl flex gap-10 items-center"
            >
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-[16px] font-semibold text-white/80">{seg.label}</h3>
                  <span className="text-[11px] text-white/25 tracking-wider font-medium bg-white/4 border border-white/6 px-2.5 py-0.5 rounded-full">
                    {seg.growth}
                  </span>
                </div>
                <p className="text-[13px] text-white/32 font-light leading-relaxed max-w-lg">
                  {seg.desc}
                </p>
              </div>
              <div className="flex flex-col items-end gap-3 flex-shrink-0 min-w-[180px]">
                <span className="text-[32px] font-bold text-white/75 tracking-tight">
                  {seg.size}
                </span>
                <div className="w-full h-[3px] bg-white/6 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${seg.bar * 100}%` }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
                    className="h-full bg-white/30 rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
