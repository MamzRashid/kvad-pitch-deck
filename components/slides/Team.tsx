'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.25, 0.1, 0.25, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

// Each founder is described by the other. Drafts, to be rewritten by Mamoon and Vebjørn.
// Set photo to e.g. '/team/vebjorn.jpg' once the file is in public/; until then the frame shows initials
const founders: { about: string; role: string; by: string; photo: string | null; quote: string }[] = [
  {
    about: 'Vebjørn Pedersen',
    role: 'Co-founder & CTO',
    by: 'Mamoon',
    photo: null,
    quote:
      'Vebjørn has been coding since he was twelve, and for the last five years almost only with AI. He does not stop until latency is lower than others say is possible. Every part of the model behind Kvad is built by him.',
  },
  {
    about: 'Mamoon Rashid',
    role: 'Co-founder & CEO',
    by: 'Vebjørn',
    photo: null,
    quote:
      'Mamoon has sold for more than ten years: on the phone, as a sales manager and in new-build real estate. He knows how our customers buy, and he gets people to say yes. He makes sure what I build actually reaches the market.',
  },
]

export default function Team() {
  return (
    <div className="relative w-full h-full flex items-center bg-[#030303]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,#0e0e0e_0%,#030303_100%)] pointer-events-none" />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-16 z-20 text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium"
      >
        The team
      </motion.span>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl mx-auto px-20 flex flex-col gap-10"
      >
        <motion.h2
          variants={fadeUp}
          className="font-bold tracking-tight text-white leading-[1.02]"
          style={{ fontSize: 'clamp(36px, 4.4vw, 52px)' }}
        >
          In each other’s words.
        </motion.h2>

        <div className="grid grid-cols-2 gap-14">
          {founders.map((f) => (
            <motion.div key={f.about} variants={fadeUp} className="flex gap-6">
              {/* Portrait */}
              <div
                className="relative flex-shrink-0 rounded-xl overflow-hidden bg-[#0c0c0c] border border-[#181818]"
                style={{ width: 150, height: 190 }}
              >
                {f.photo ? (
                  <Image src={f.photo} alt={f.about} fill sizes="150px" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[40px] font-bold text-white/[0.07] tracking-tight select-none">
                      {f.about.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[17px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {f.about}
                  </span>
                  <span className="text-[10px] tracking-[0.14em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {f.role}
                  </span>
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                <p className="text-[12.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  “{f.quote}”
                </p>
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Written by {f.by}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
