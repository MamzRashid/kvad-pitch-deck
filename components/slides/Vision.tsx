'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

function WaveField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // 46 wave lines — amplitude and opacity peak at the vertical center
    // suggesting the "voice layer" is most active where Kvad lives
    const waves = Array.from({ length: 46 }, (_, i) => {
      const yFrac = i / 45
      const center = Math.max(0, 1 - Math.abs(yFrac - 0.5) * 2.4)
      return {
        yFrac,
        amplitude: (3 + Math.random() * 10) * (0.5 + center * 2.8),
        frequency: 0.0015 + Math.random() * 0.005,
        speed: (0.0008 + Math.random() * 0.0018) * (Math.random() > 0.5 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        opacity: (0.022 + Math.random() * 0.03) * (0.35 + center * 1.4),
      }
    })

    // Signal particles riding the waves — conversation packets in motion
    const riders = Array.from({ length: 32 }, () => ({
      wi: Math.floor(Math.random() * waves.length),
      x: Math.random() * 1440,
      speed: (0.3 + Math.random() * 0.75) * (Math.random() > 0.5 ? 1 : -1),
      r: 1.0 + Math.random() * 0.9,
      op: 0.15 + Math.random() * 0.32,
    }))

    // Ambient floating particles
    const ambient = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 0.6 + 0.1,
      baseOp: Math.random() * 0.04 + 0.005,
      oscSpeed: 0.018 + Math.random() * 0.022,
      phase: Math.random() * Math.PI * 2,
    }))

    // Emanations from center — Kvad sending signals outward
    const emanations: { r: number; op: number }[] = []

    let raf: number
    let t = 0

    const draw = () => {
      const cw = canvas.width
      const ch = canvas.height
      ctx.clearRect(0, 0, cw, ch)

      const cx = cw * 0.5
      const cy = ch * 0.5

      // Spawn emanation every ~3.5s (210 frames at 60fps)
      if (t > 0 && t % 210 === 0) {
        emanations.push({ r: 0, op: 0.16 })
      }

      // Draw emanations (expanding circles from Kvad)
      for (let i = emanations.length - 1; i >= 0; i--) {
        const e = emanations[i]
        ctx.beginPath()
        ctx.arc(cx, cy, e.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,255,255,${e.op})`
        ctx.lineWidth = 0.55
        ctx.stroke()
        e.r += 0.9
        e.op -= 0.00076
        if (e.op <= 0) emanations.splice(i, 1)
      }

      // Draw wave field
      for (const w of waves) {
        ctx.beginPath()
        for (let x = 0; x <= cw; x += 2) {
          const y = w.yFrac * ch + Math.sin(x * w.frequency + t * w.speed + w.phase) * w.amplitude
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(255,255,255,${w.opacity})`
        ctx.lineWidth = 0.7
        ctx.stroke()
      }

      // Draw signal riders
      for (const p of riders) {
        const w = waves[p.wi]
        const y = w.yFrac * ch + Math.sin(p.x * w.frequency + t * w.speed + w.phase) * w.amplitude
        ctx.beginPath()
        ctx.arc(p.x, y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.op})`
        ctx.fill()
        p.x += p.speed
        if (p.x > cw + 20) p.x = -20
        else if (p.x < -20) p.x = cw + 20
      }

      // Ambient particles
      for (const p of ambient) {
        const op = p.baseOp * (0.3 + 0.7 * Math.sin(t * p.oscSpeed + p.phase))
        ctx.beginPath()
        ctx.arc(p.x * cw, p.y * ch, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, op)})`
        ctx.fill()
      }

      t += 1
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Vision() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#030303]">
      <WaveField />

      {/* Brighten center slightly, darken edges — focus the eye inward */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 58% 48% at 50% 50%, rgba(255,255,255,0.016) 0%, transparent 62%)',
            'radial-gradient(ellipse 95% 95% at 50% 50%, transparent 28%, rgba(3,3,3,0.68) 100%)',
          ].join(', '),
        }}
      />

      {/* Dark band top — headline readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #030303 0%, rgba(3,3,3,0.88) 10%, transparent 30%)',
        }}
      />

      {/* Dark band bottom — deeper, for manifesto readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #030303 0%, rgba(3,3,3,0.94) 18%, rgba(3,3,3,0.6) 36%, transparent 52%)',
        }}
      />

      {/* Kvad — diffuse light source at the center of the voice layer */}
      <motion.div
        className="absolute z-10"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.6, ease: 'easeOut' }}
      >
        {/* Glow */}
        <motion.div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 520,
            height: 210,
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.048) 0%, transparent 68%)',
            filter: 'blur(48px)',
            borderRadius: '50%',
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Wordmark with flanking lines */}
        <div className="relative flex items-center gap-4">
          <div
            className="h-px w-10"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12))' }}
          />
          <span className="text-[11px] font-medium text-white/32 tracking-[0.55em] uppercase">
            Kvad
          </span>
          <div
            className="h-px w-10"
            style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.12))' }}
          />
        </div>
      </motion.div>

      {/* Headline — top */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute left-0 right-0 z-20 flex flex-col items-center pointer-events-none"
        style={{ top: '9%' }}
      >
        <motion.span
          variants={fadeUp}
          className="text-[10px] text-white/20 tracking-[0.28em] uppercase font-medium mb-5"
        >
          Vision
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="text-[66px] font-bold tracking-tight text-white leading-[1.04] text-center"
          style={{ maxWidth: 760 }}
        >
          The AI of the future<br />will be spoken to.
        </motion.h2>
      </motion.div>

      {/* Vision statement — bottom */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute left-0 right-0 z-20 flex flex-col items-center pointer-events-none"
        style={{ bottom: '8%' }}
      >
        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-[15px] font-medium text-white/55 tracking-wide leading-snug text-center"
          style={{ maxWidth: 560 }}
        >
          Kvad builds conversational infrastructure<br />for the next generation of AI systems.
        </motion.p>

        {/* Separator */}
        <motion.div
          variants={fadeUp}
          className="my-5 w-px h-8 bg-white/10"
        />

        {/* Manifesto */}
        <motion.p
          variants={fadeUp}
          className="text-[12.5px] text-white/28 font-normal leading-[1.75] text-center"
          style={{ maxWidth: 460 }}
        >
          AI agents are replacing digital interfaces. To be accepted
          by people, they must communicate naturally: in real time, fluently
          and like a human. Kvad builds the infrastructure that makes it possible.
        </motion.p>
      </motion.div>
    </div>
  )
}
