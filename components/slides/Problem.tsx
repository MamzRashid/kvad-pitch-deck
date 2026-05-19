'use client'

import { motion } from 'framer-motion'
import AudioPlayer from '../AudioPlayer'

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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl flex flex-col gap-16"
      >
        <motion.div variants={item} className="flex flex-col gap-4">
          <span className="text-[11px] text-white/25 tracking-[0.2em] uppercase font-medium">
            Problemet
          </span>
          <h2 className="text-[52px] font-bold tracking-tight text-white leading-[1.05]">
            AI høres fortsatt ikke<br />menneskelig ut.
          </h2>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-4">
            <AudioPlayer type="ai" label="AI-stemme" />
            <div className="flex flex-col gap-2.5 pl-1">
              {['Robotaktig tale', 'Høy forsinkelse', 'Unaturlig samtaleflyt'].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-[3px] h-[3px] rounded-full bg-white/40 flex-shrink-0" />
                  <span className="text-[13px] text-white/72 font-light">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <AudioPlayer type="human" label="Menneskestemme" />
            <div className="flex flex-col gap-2.5 pl-1">
              {['Naturlig tempo', 'Sanntidssvar', 'Flytende samtale'].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-[3px] h-[3px] rounded-full bg-white/55 flex-shrink-0" />
                  <span className="text-[13px] text-white/82 font-light">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
