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

const models = [
  {
    number: '01',
    title: 'API-bruk',
    subtitle: 'Betal per bruk',
    points: [
      'Fakturering per tegn eller per sekund',
      'Forutsigbar, skalerbar prising',
      'Gratis nivå for utviklere',
    ],
    highlight: true,
  },
  {
    number: '02',
    title: 'AI-agentinfrastruktur',
    subtitle: 'Abonnement',
    points: [
      'Dedikert infrastruktur for agentsystemer',
      'SLA-støttet oppetidsgaranti',
      'Volumrabatter ved skala',
    ],
    highlight: false,
  },
  {
    number: '03',
    title: 'Enterprise-partnerskap',
    subtitle: 'Egendefinerte kontrakter',
    points: [
      'Egendefinert talemodell-trening',
      'On-premise distribusjonsmuligheter',
      'White-label taleinfrastruktur',
    ],
    highlight: false,
  },
]

export default function BusinessModel() {
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
            Forretningsmodell
          </span>
          <h2 className="text-[52px] font-bold tracking-tight text-white leading-[1.05] max-w-2xl">
            Bygget for å drive neste generasjon AI-produkter.
          </h2>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-3 gap-4">
          {models.map((model) => (
            <div
              key={model.number}
              className={`flex flex-col gap-6 p-7 rounded-2xl border ${
                model.highlight ? 'bg-[#101010] border-white/10' : 'bg-[#0c0c0c] border-[#181818]'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-mono text-white/18 tracking-widest">
                  {model.number}
                </span>
                <span className="text-[10px] text-white/22 tracking-[0.12em] uppercase font-medium bg-white/4 border border-white/6 rounded-full px-2.5 py-0.5">
                  {model.subtitle}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-[18px] font-semibold text-white/85">{model.title}</h3>
                <div className="flex flex-col gap-2.5">
                  {model.points.map((p) => (
                    <div key={p} className="flex items-start gap-3">
                      <div className="w-[3px] h-[3px] rounded-full bg-white/25 flex-shrink-0 mt-[7px]" />
                      <span className="text-[13px] text-white/38 font-light leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
