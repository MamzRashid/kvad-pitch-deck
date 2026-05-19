'use client'

import { motion } from 'framer-motion'
import WaveformBg from '../WaveformBg'

const ease = [0.25, 0.1, 0.25, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

// Tiny animated waveform bars — shows prosody/rhythm visually
function MicroWave() {
  const bars = [0.3, 0.7, 0.5, 0.9, 0.4, 0.8, 0.6, 0.95, 0.35, 0.7, 0.5, 0.85]
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 20 }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-white"
          style={{ width: 2, opacity: 0.22 }}
          animate={{ height: [h * 20, (0.3 + Math.abs(Math.sin(i * 0.8)) * 0.65) * 20, h * 20] }}
          transition={{ duration: 2.2 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
        />
      ))}
    </div>
  )
}

// Tiny data dots — represents proprietary data depth
function MicroDots() {
  const dots = Array.from({ length: 18 })
  return (
    <div className="flex flex-wrap gap-[5px]" style={{ width: 80 }}>
      {dots.map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-white"
          style={{ width: 3, height: 3 }}
          animate={{ opacity: [0.08, 0.32, 0.08] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.14 }}
        />
      ))}
    </div>
  )
}

// Microphone + audio level bars
function MicroStudio() {
  const bars = [0.45, 0.75, 0.55, 0.90, 0.60]
  return (
    <div className="flex items-center gap-3">
      <svg width="18" height="26" viewBox="0 0 18 26" fill="none" style={{ shapeRendering: 'geometricPrecision' }}>
        <rect x="5.5" y="0.5" width="7" height="12" rx="3.5" stroke="rgba(255,255,255,0.52)" strokeWidth="1" />
        <path d="M2 11.5 C2 18 16 18 16 11.5" stroke="rgba(255,255,255,0.38)" strokeWidth="1" strokeLinecap="round" fill="none" />
        <line x1="9" y1="18" x2="9" y2="23" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeLinecap="round" />
        <line x1="5" y1="23" x2="13" y2="23" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeLinecap="round" />
      </svg>
      <div className="flex items-center gap-[3px]" style={{ height: 22 }}>
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="rounded-full bg-white"
            style={{ width: 2.5, opacity: 0.22 }}
            animate={{ height: [h * 22, (0.25 + Math.abs(Math.sin(i * 1.2)) * 0.7) * 22, h * 22] }}
            transition={{ duration: 1.6 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
          />
        ))}
      </div>
    </div>
  )
}

// Podcast recording indicator — pulsing rec dot + episode lines
function MicroRecord() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 18, height: 18 }}>
        <motion.div
          className="absolute rounded-full"
          style={{ width: 18, height: 18, border: '1px solid rgba(255,255,255,0.15)' }}
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="rounded-full bg-white" style={{ width: 6, height: 6, opacity: 0.40 }} />
      </div>
      <div className="flex flex-col gap-1.5">
        {[0.55, 0.38, 0.70].map((w, i) => (
          <motion.div
            key={i}
            className="rounded-full bg-white"
            style={{ height: 1.5, width: w * 52, opacity: 0.20 }}
            animate={{ opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </div>
    </div>
  )
}

const moats = [
  {
    number: '01',
    title: 'Bygget på data ingen andre har tilgang til',
    desc: 'Flere hundre timer segmentert norsk tale — ikke studioopplesning, men naturlig samtale.',
    tag: 'Datafortrinn',
    visual: <MicroDots />,
  },
  {
    number: '02',
    title: 'Samtalerytme og prosodi',
    desc: 'Trent på pauser, tempo, trykk og emosjonell flyt. Ikke bare ord — men hvordan de sies.',
    tag: 'Modellfortrinn',
    visual: <MicroWave />,
  },
  {
    number: '03',
    title: 'Eksklusivt råmateriale fra norske podcastere',
    desc: 'Direkte avtaler med norske podcastere gir oss tilgang til autentiske samtaler vi trener modellene direkte på.',
    tag: 'Innholdsfortrinn',
    visual: <MicroRecord />,
  },
  {
    number: '04',
    title: 'Internt podcastrom for norsk taleinnsamling',
    desc: 'Eget opptaksrom lar teamet snakke fritt på norsk — lydfilene brukes direkte til å trene og forbedre modellene løpende.',
    tag: 'Produksjonsfortrinn',
    visual: <MicroStudio />,
  },
]

export default function WhyKvad() {
  return (
    <div className="relative w-full h-full flex items-center bg-[#030303]">
      <WaveformBg opacity={0.016} speed={0.2} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 30% 50%, #0e0e0e 0%, #030303 100%)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full h-full flex"
      >
        {/* ── LEFT — bold statement ── */}
        <div className="flex flex-col justify-center px-16 flex-shrink-0" style={{ width: '42%' }}>
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <span className="text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium">
              Konkurransefortrinn
            </span>

            <h2
              className="font-bold tracking-tight text-white leading-[1.03]"
              style={{ fontSize: 'clamp(34px, 3.8vw, 50px)' }}
            >
              Norsk conversational AI krever noe globale modeller ikke har.
            </h2>

            <p className="text-[12.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)', maxWidth: 320 }}>
              Generiske stemme-modeller er brede. Kvad er dypt optimalisert — trent på norsk rytme, norske pauser og norsk samtaleflyt.
            </p>

          </motion.div>
        </div>

        {/* Vertical separator */}
        <motion.div
          variants={fadeUp}
          className="flex-shrink-0 self-stretch"
          style={{ width: '1px', background: 'rgba(255,255,255,0.06)', margin: '48px 0' }}
        />

        {/* ── RIGHT — editorial moat rows ── */}
        <div className="flex flex-col justify-center flex-1 px-14">
          {moats.map((m, i) => (
            <motion.div key={m.number} variants={fadeUp}>
              {/* Top rule */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

              <div className="flex items-center gap-10 py-6">
                {/* Number */}
                <span className="text-[9px] font-mono tracking-[0.2em] flex-shrink-0 w-5" style={{ color: 'rgba(255,255,255,0.20)' }}>
                  {m.number}
                </span>

                {/* Text */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-[17px] font-semibold tracking-tight leading-snug" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    {m.title}
                  </h3>
                  <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
                    {m.desc}
                  </p>
                </div>

                {/* Micro visual */}
                <div className="flex-shrink-0 flex items-center justify-end" style={{ width: 90 }}>
                  {m.visual}
                </div>
              </div>

              {/* Bottom rule on last */}
              {i === moats.length - 1 && (
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
