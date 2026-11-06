'use client'

import { motion } from 'framer-motion'
import AudioPlayer from '../AudioPlayer'
import WaveformBg from '../WaveformBg'

const ease = [0.25, 0.1, 0.25, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
}

const metrics = [
  { label: 'Streaming', value: 'Real-time' },
  { label: 'Latency', value: '< 150ms' },
  { label: 'Blind test win rate', value: '76%' },
]

export default function Reveal() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303] px-16">
      <WaveformBg opacity={0.035} speed={0.8} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 45%, #121212 0%, #030303 100%)' }}
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        Product demo
      </motion.span>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-12 text-center"
      >
        <motion.div variants={item} className="flex flex-col gap-4">
          <h2 className="text-[52px] font-bold tracking-tight text-white leading-[1.05]">
            Hear the difference.
          </h2>
          <p className="text-[14px] font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Today&apos;s text-to-speech next to Kvad. Press play on both.
          </p>
        </motion.div>

        <motion.div variants={item} className="w-full grid grid-cols-2 gap-6 text-left">
          <div>
            <AudioPlayer type="ai" label="Text-to-speech today" src="/audio/ai-demo.mp3" size="large" />
          </div>
          <div>
            <AudioPlayer type="human" label="Kvad" src="/audio/demo01.wav" size="large" revealed />
          </div>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-12">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1.5">
              <span className="text-[19px] font-semibold text-white/75">{m.value}</span>
              <span className="text-[10px] text-white/30 tracking-[0.15em] uppercase">{m.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
