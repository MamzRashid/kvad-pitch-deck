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

const allocations = [
  {
    number: '01',
    area: 'Modell- og taleoptimalisering',
    desc: 'Fortsatt forbedring av vår norske talemodell — naturlighet, prosodi og taler-mangfold.',
    pct: 45,
  },
  {
    number: '02',
    area: 'Infrastrukturskalering',
    desc: 'Lav-forsinkelse streaming-infrastruktur og pålitelighetsteknikk for produksjonsskala distribusjoner.',
    pct: 30,
  },
  {
    number: '03',
    area: 'Produkt- og markedsekspansjon',
    desc: 'Utvikleropplevelse, API-finpuss og innledende go-to-market i norsk enterprise.',
    pct: 25,
  },
]

export default function Ask() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303] px-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,#0f0f0f_0%,#030303_100%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl flex flex-col gap-14"
      >
        <motion.div variants={item} className="flex flex-col gap-5">
          <span className="text-[11px] text-white/25 tracking-[0.2em] uppercase font-medium">
            Vi søker
          </span>
          <div className="flex items-baseline gap-5">
            <h2 className="text-[72px] font-bold tracking-tight text-white leading-none">$2M</h2>
            <span className="text-[22px] font-light text-white/30">Seed-runde</span>
          </div>
          <p className="text-[15px] text-white/35 font-light max-w-lg">
            For å bygge den definitive norske taleinfrastrukturen for samtale-AI-alderen.
          </p>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-3">
          {allocations.map((alloc, i) => (
            <div
              key={alloc.number}
              className="flex items-start gap-8 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl"
            >
              <span className="text-[11px] font-mono text-white/18 tracking-widest pt-0.5 w-6 flex-shrink-0">
                {alloc.number}
              </span>
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-[16px] font-semibold text-white/80">{alloc.area}</h3>
                <p className="text-[13px] text-white/32 font-light leading-relaxed">{alloc.desc}</p>
                <div className="mt-2 h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${alloc.pct}%` }}
                    transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 + i * 0.1 }}
                    className="h-full bg-white/25 rounded-full"
                  />
                </div>
              </div>
              <span className="text-[22px] font-bold text-white/45 tracking-tight flex-shrink-0 pt-0.5">
                {alloc.pct}%
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
