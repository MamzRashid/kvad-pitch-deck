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

const moats = [
  {
    number: '01',
    title: 'Proprietære norske samtaledata',
    desc: 'Bygget på kuraterte, høykvalitets norske taledata som fanger den fulle naturlige rytmen i menneskelig samtale — ikke studioopplesning.',
    tag: 'Datafortrinn',
  },
  {
    number: '02',
    title: 'Menneskelig samtalelevering',
    desc: 'Modellene våre er finjustert spesielt for frem-og-tilbake-dialog: pustemønstre, rytme, naturlig nøling og prosodisk variasjon.',
    tag: 'Modellfortrinn',
  },
  {
    number: '03',
    title: 'Bygget for AI-agenter',
    desc: 'Kvad er designet fra grunnen av for agentsystemer — streaming, avbrytbar, kontekstbevisst tale med under 200ms forsinkelse.',
    tag: 'Infrastrukturfortrinn',
  },
]

export default function WhyKvad() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303] px-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,#0f0f0f_0%,#030303_100%)] pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl flex flex-col gap-14"
      >
        <motion.div variants={item} className="flex flex-col gap-4">
          <span className="text-[11px] text-white/25 tracking-[0.2em] uppercase font-medium">
            Konkurransefortrinn
          </span>
          <h2 className="text-[52px] font-bold tracking-tight text-white leading-[1.05] max-w-2xl">
            Bygget for naturlig norsk AI-kommunikasjon.
          </h2>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-3">
          {moats.map((moat) => (
            <div
              key={moat.number}
              className="flex items-start gap-8 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl"
            >
              <span className="text-[11px] font-mono text-white/18 tracking-widest pt-0.5 w-6 flex-shrink-0">
                {moat.number}
              </span>
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-[17px] font-semibold text-white/85 leading-snug">
                  {moat.title}
                </h3>
                <p className="text-[13px] text-white/35 font-light leading-relaxed">
                  {moat.desc}
                </p>
              </div>
              <div className="flex-shrink-0 pt-0.5">
                <span className="text-[10px] text-white/20 tracking-[0.14em] uppercase font-medium bg-white/4 border border-white/6 rounded-full px-3 py-1">
                  {moat.tag}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
