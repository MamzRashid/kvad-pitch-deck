'use client'

import { motion } from 'framer-motion'
import AudioPlayerInline from '../AudioPlayerInline'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Problem() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303] px-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,#0f0f0f_0%,#030303_100%)] pointer-events-none" />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        The problem
      </motion.span>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl flex flex-col gap-10"
      >
        <motion.div variants={item}>
          <h2 className="text-[52px] font-bold tracking-tight text-white leading-[1.05]">
            AI still doesn&apos;t<br />sound human.
          </h2>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-5 p-7 bg-[#0c0c0c] border border-[#1e1e1e] rounded-2xl">
            <span className="text-[10.5px] tracking-[0.18em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Generic AI voice today
            </span>
            <AudioPlayerInline label="DEMO" accent="rgba(255,255,255,0.40)" src="/audio/ai-demo.mp3" />
            <div className="h-px bg-white/[0.05]" />
            <div className="flex flex-col gap-3">
              {[
                ['Robotic speech', 'Trained on studio reads, lacks Norwegian rhythm'],
                ['High latency', '300–800ms breaks natural conversation flow'],
                ['No Norwegian adaptation', 'Global models aren\'t built for Norwegian conversational AI'],
              ].map(([title, sub]) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-[3px] h-[3px] rounded-full bg-white/30 flex-shrink-0 mt-[7px]" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] text-white/65 font-light">{title}</span>
                    <span className="text-[11px] text-white/28 font-light leading-snug">{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 p-7 bg-[#0c0c0c] border border-[#1e1e1e] rounded-2xl">
            <span className="text-[10.5px] tracking-[0.18em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Human voice
            </span>
            <AudioPlayerInline label="HUMAN" accent="rgba(255,255,255,0.70)" src="/audio/demo01.wav" />
            <div className="h-px bg-white/[0.05]" />
            <div className="flex flex-col gap-3">
              {[
                ['Natural pace and rhythm', 'Fluent Norwegian intonation and conversational dynamics'],
                ['Emotional credibility', 'Pauses, stress and variation that build trust'],
                ['Conversational flow', 'Responses that feel human, not generated'],
              ].map(([title, sub]) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-[3px] h-[3px] rounded-full bg-white/50 flex-shrink-0 mt-[7px]" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] text-white/82 font-light">{title}</span>
                    <span className="text-[11px] text-white/35 font-light leading-snug">{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
