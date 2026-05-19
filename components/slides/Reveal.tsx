'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AudioPlayer from '../AudioPlayer'
import WaveformBg from '../WaveformBg'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
}

const metrics = [
  { label: 'Streaming', value: 'Sanntid' },
  { label: 'Forsinkelse', value: '< 200ms' },
  { label: 'Levering', value: 'Menneskelig' },
]

export default function Reveal() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303] px-16">
      <WaveformBg opacity={revealed ? 0.05 : 0.025} speed={revealed ? 1.1 : 0.7} />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: revealed
            ? 'radial-gradient(ellipse 70% 55% at 50% 45%, #141414 0%, #030303 100%)'
            : 'radial-gradient(ellipse 60% 50% at 50% 45%, #0e0e0e 0%, #030303 100%)',
        }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-12 text-center"
      >
        <motion.div variants={item} className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.span
                key="label-pre"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[11px] text-white/25 tracking-[0.2em] uppercase font-medium"
              >
                Menneskestemme
              </motion.span>
            ) : (
              <motion.span
                key="label-post"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[11px] text-white/25 tracking-[0.2em] uppercase font-medium"
              >
                Avsløring
              </motion.span>
            )}
          </AnimatePresence>

          <div className="relative">
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.h2
                  key="pre"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-[52px] font-bold tracking-tight text-white leading-[1.05]"
                >
                  Husker du<br />menneskestemmen?
                </motion.h2>
              ) : (
                <motion.h2
                  key="post"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
                  className="text-[52px] font-bold tracking-tight text-white leading-[1.05]"
                >
                  «Menneskestemmen»<br />ble generert av Kvad.
                </motion.h2>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={item} className="w-full max-w-xl">
          <AudioPlayer
            type="human"
            label="Menneskestemme"
            size="large"
            revealMode
            revealed={revealed}
            onReveal={() => setRevealed(true)}
          />

          <AnimatePresence>
            {!revealed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[11px] text-white/18 tracking-[0.15em] uppercase mt-5"
              >
                Trykk play for å avsløre
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
              className="flex items-center gap-10"
            >
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 + i * 0.1 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span className="text-[19px] font-semibold text-white/70">{m.value}</span>
                  <span className="text-[10px] text-white/28 tracking-[0.15em] uppercase">
                    {m.label}
                  </span>
                </motion.div>
              ))}

              <div className="w-[1px] h-8 bg-white/8 mx-2" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-[12px] text-white/28 font-light tracking-wide"
              >
                Drevet av Kvad
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
