'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import WaveformBg from '../WaveformBg'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Cover() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030303]">
      <WaveformBg opacity={0.035} speed={0.6} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#030303_100%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-8 text-center"
      >
        <motion.div variants={item}>
          <Image
            src="/kvad-logo.svg"
            alt="Kvad"
            width={380}
            height={74}
            priority
            style={{ opacity: 0.92 }}
          />
        </motion.div>

        <motion.p
          variants={item}
          className="text-[14px] font-light text-white/50 tracking-[0.14em] uppercase"
        >
          Infrastruktur for menneskelig AI-kommunikasjon.
        </motion.p>

        <motion.div variants={item} className="mt-6">
          <div className="w-[1px] h-8 bg-white/8 mx-auto" />
        </motion.div>
      </motion.div>

    </div>
  )
}
