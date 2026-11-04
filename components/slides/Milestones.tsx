'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import WaveformBg from '../WaveformBg'

const ease = [0.25, 0.1, 0.25, 1]
const GREEN = '#4ade80'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

// Blind test 10 Aug 2026, full data at kvad.no/blindtest
const BLIND_TEST = [
  { value: '76%', label: 'win rate, highest of five' },
  { value: '1,314', label: 'blind comparisons' },
]

// Logos render as white wordmarks; Finansavisen's badge goes grey so its letters stay readable
const WHITE = { filter: 'brightness(0) invert(1)' }
const CUSTOMERS = [
  {
    group: 'Pilots',
    logos: [
      { name: 'Finansavisen', src: '/logos/finansavisen.svg', w: 24, h: 24, style: { filter: 'grayscale(1) brightness(1.8)' } },
      { name: 'vårtOslo', src: '/logos/vartoslo.svg', w: 74, h: 22, style: WHITE },
    ],
  },
  {
    group: 'In dialogue',
    logos: [
      { name: 'Phonero', src: '/logos/phonero.svg', w: 74, h: 20, style: WHITE },
      { name: 'Telia', src: '/logos/telia.svg', w: 58, h: 23, style: WHITE },
    ],
  },
]

const STEPS: {
  number: string
  status: string
  done: boolean
  title: string
  body: string
  extra?: 'stats' | 'logos'
}[] = [
  {
    number: '01',
    status: 'Done',
    done: true,
    title: 'Blind test',
    body: '159 Norwegian listeners compared Kvad with ElevenLabs, Cartesia, Azure and Google, without knowing which was which.',
    extra: 'stats',
  },
  {
    number: '02',
    status: 'Done',
    done: true,
    title: 'Pilots and pipeline',
    body: 'Pilots running with media customers. Enterprise interest through organic inbound.',
    extra: 'logos',
  },
  {
    number: '03',
    status: '0 to 6 months',
    done: false,
    title: 'First production model',
    body: 'Norwegian, Swedish and Danish in one model. Launched within six months.',
  },
  {
    number: '04',
    status: '6 to 12 months',
    done: false,
    title: 'Five more languages',
    body: 'The same data, training and evaluation pipeline, repeated in at least five new languages.',
  },
]

function Pill({ text, done }: { text: string; done: boolean }) {
  return (
    <span
      className="text-[9px] font-medium tracking-[0.18em] uppercase px-2.5 py-1 rounded-full self-start"
      style={
        done
          ? { color: GREEN, background: 'rgba(74,222,128,0.10)' }
          : { color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.05)' }
      }
    >
      {text}
    </span>
  )
}

// Track behind the step dots: solid and green up to today, faint after
function Track() {
  return (
    <div className="absolute left-0 right-0 pointer-events-none" style={{ top: 4, height: 1 }}>
      <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.08)' }} />
      <motion.div
        className="absolute inset-y-0 left-0"
        style={{ background: 'rgba(74,222,128,0.55)' }}
        initial={{ width: 0 }}
        animate={{ width: '40%' }}
        transition={{ duration: 1.4, ease, delay: 0.5 }}
      />
      <motion.span
        className="absolute text-[9px] font-mono tracking-[0.2em] uppercase"
        style={{ left: '40%', top: -22, transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        Today
      </motion.span>
    </div>
  )
}

export default function Milestones() {
  return (
    <div className="relative w-full h-full flex items-center bg-[#030303]">
      <WaveformBg opacity={0.018} speed={0.25} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 40%, #0d0d0d 0%, #030303 100%)' }}
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        Milestones
      </motion.span>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-6xl mx-auto px-20 flex flex-col gap-14"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <h2 className="font-bold tracking-tight text-white leading-[1.02]" style={{ fontSize: 'clamp(36px, 4.4vw, 52px)' }}>
            Validated. Now we build.
          </h2>
          <p className="text-[13.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 560 }}>
            Quality and demand are proven. The next twelve months take Kvad from test to production and to new languages.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
          <Track />
          <div className="grid grid-cols-4 gap-10">
            {STEPS.map((s) => (
              <div key={s.number} className="flex flex-col gap-3.5">
                <div
                  className="w-[9px] h-[9px] rounded-full mb-3"
                  style={s.done ? { background: GREEN } : { background: '#030303', border: '1px solid rgba(255,255,255,0.35)' }}
                />
                <Pill text={s.status} done={s.done} />
                <h3 className="text-[19px] font-semibold tracking-tight leading-snug" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  {s.title}
                </h3>
                {/* Fixed height so the stats and logos under it start on one line */}
                <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', minHeight: 78 }}>
                  {s.body}
                </p>

                {s.extra === 'stats' && (
                  <div className="flex gap-8 pt-7">
                    {BLIND_TEST.map((b) => (
                      <div key={b.label} className="flex flex-col gap-1.5">
                        <span className="text-[24px] font-bold tracking-tight text-white tabular-nums">{b.value}</span>
                        <span className="text-[10px] font-light" style={{ color: 'rgba(255,255,255,0.42)' }}>{b.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {s.extra === 'logos' && (
                  <div className="flex flex-col gap-10 pt-7">
                    {CUSTOMERS.map((g, gi) => (
                      <div key={g.group} className="flex flex-col gap-3">
                        <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          {g.group}
                        </span>
                        <div className="flex items-center gap-6">
                          {g.logos.map((c) => (
                            // Prospects sit a step back from live pilots
                            <Image key={c.name} src={c.src} alt={c.name} width={c.w} height={c.h} style={{ opacity: gi === 0 ? 0.85 : 0.5, ...c.style }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
