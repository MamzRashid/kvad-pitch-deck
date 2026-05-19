'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import WaveformBg from '../WaveformBg'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Closing() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303]">
      <WaveformBg opacity={0.04} speed={0.5} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,#030303_100%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-7 text-center"
      >
        <motion.div variants={item}>
          <div className="w-[1px] h-10 bg-white/8 mx-auto" />
        </motion.div>

        <motion.div variants={item}>
          <Image
            src="/kvad-logo.svg"
            alt="Kvad"
            width={340}
            height={66}
            style={{ opacity: 0.8 }}
          />
        </motion.div>

        <motion.p
          variants={item}
          className="text-[14px] font-light text-white/30 tracking-[0.14em] uppercase"
        >
          Infrastruktur for menneskelig AI-kommunikasjon.
        </motion.p>

        <motion.div variants={item} className="mt-6">
          <div className="w-[1px] h-8 bg-white/6 mx-auto" />
        </motion.div>

        <motion.div variants={item} className="flex flex-col items-center gap-1.5 mt-2">
          <span className="text-[11px] text-white/18 tracking-[0.2em] uppercase">
            Mamoon Rashid
          </span>
          <span className="text-[11px] text-white/10 tracking-wider">
            Grunnlegger & CEO, Kvad
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
