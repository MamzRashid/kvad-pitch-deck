'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AudioPlayerProps {
  type: 'ai' | 'human'
  label: string
  src?: string
  size?: 'compact' | 'large'
  revealMode?: boolean
  onReveal?: () => void
  revealed?: boolean
}

const DURATION = 28
const W = 500
const WAVE_H = 72
const BAR_COUNT = 52

// Compute bar height for AI spectrum from phase
function barHeight(index: number, phase: number, playing: boolean): number {
  if (!playing) return 0.06 + Math.abs(Math.sin(index * 0.63)) * 0.10
  const a = Math.abs(Math.sin(index * 0.38 + phase * 2.2)) * 0.55
  const b = Math.abs(Math.sin(index * 0.71 + phase * 3.5 + 1.4)) * 0.35
  const c = Math.abs(Math.sin(index * 1.1 + phase * 1.1 + 2.8)) * 0.10
  return Math.min(0.95, a + b + c + 0.05)
}

// Smooth bezier path through sine wave points
function smoothPath(amp: number, freq: number, phase: number): string {
  const cy = WAVE_H / 2
  const n = 320
  const pts = Array.from({ length: n }, (_, i) => ({
    x: (i / (n - 1)) * W,
    y: cy + Math.sin((i / (n - 1)) * Math.PI * 2 * freq + phase) * amp * cy,
  }))
  let d = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`
  for (let i = 1; i < pts.length; i++) {
    const mx = (pts[i - 1].x + pts[i].x) / 2
    d += ` C${mx.toFixed(2)},${pts[i - 1].y.toFixed(2)} ${mx.toFixed(2)},${pts[i].y.toFixed(2)} ${pts[i].x.toFixed(2)},${pts[i].y.toFixed(2)}`
  }
  return d
}

export default function AudioPlayer({
  type,
  label,
  src,
  size = 'compact',
  revealMode = false,
  onReveal,
  revealed = false,
}: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(DURATION)
  const [phase, setPhase] = useState(0)
  const phaseRef = useRef(0)
  const animRef = useRef<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const levelRef = useRef(0)
  const freqRef = useRef<Uint8Array<ArrayBuffer> | null>(null)

  // Web Audio graph can only be attached once per media element
  const ensureGraph = () => {
    const el = audioRef.current
    if (!el || ctxRef.current) return
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const source = ctx.createMediaElementSource(el)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.8
    source.connect(analyser)
    analyser.connect(ctx.destination)
    ctxRef.current = ctx
    analyserRef.current = analyser
    freqRef.current = new Uint8Array(analyser.frequencyBinCount)
  }

  const isLarge = size === 'large'

  // Only one sample plays at a time: starting another player pauses this one
  useEffect(() => {
    const onPlay = (e: Event) => {
      if (e.target !== audioRef.current) setPlaying(false)
    }
    document.addEventListener('play', onPlay, true)
    return () => document.removeEventListener('play', onPlay, true)
  }, [])

  useEffect(() => {
    if (!playing) return
    const speed = type === 'human' ? 0.016 : 0.042
    const analyser = analyserRef.current
    const data = analyser ? new Uint8Array(analyser.fftSize) : null
    const tick = () => {
      if (analyser && data) {
        analyser.getByteTimeDomainData(data)
        if (freqRef.current) analyser.getByteFrequencyData(freqRef.current)
        let sum = 0
        for (let i = 0; i < data.length; i++) {
          const d = (data[i] - 128) / 128
          sum += d * d
        }
        const rms = Math.sqrt(sum / data.length)
        levelRef.current = levelRef.current * 0.6 + rms * 0.4
      }
      // With live audio: wave moves fast when voice is loud, nearly freezes in silence
      const speedScale = analyser ? 0.2 + Math.min(3, levelRef.current * 12) : 1
      phaseRef.current += speed * speedScale
      setPhase(phaseRef.current)
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(animRef.current); levelRef.current = 0 }
  }, [playing, type])

  useEffect(() => {
    if (src) {
      const el = audioRef.current
      if (!el) return
      if (playing) { el.play().catch(() => setPlaying(false)) } else { el.pause() }
      return
    }
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { setPlaying(false); return 100 }
          return p + 100 / (DURATION * 10)
        })
      }, 100)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing, src])

  const togglePlay = () => {
    if (progress >= 100) {
      setProgress(0)
      if (audioRef.current) audioRef.current.currentTime = 0
    }
    if (!playing && src) {
      ensureGraph()
      ctxRef.current?.resume()
    }
    setPlaying((p) => !p)
    if (revealMode && onReveal && !revealed) onReveal()
  }

  const formatTime = (pct: number) => {
    const s = Math.floor((pct / 100) * duration)
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

  const barW = W / BAR_COUNT
  const barGap = 2.5

  // Live level drives amplitude when real audio is attached
  const dyn = src && playing ? Math.min(2.1, 0.08 + levelRef.current * 8) : 1

  // Human paths: 3 overlapping sine layers
  const humanLayers = [
    { amp: 0.38 * dyn, freq: 2.0, phaseOffset: 0,   opacity: playing ? 0.88 : 0.55, width: 1.4 },
    { amp: 0.22 * dyn, freq: 3.4, phaseOffset: 1.1,  opacity: playing ? 0.55 : 0.30, width: 1.0 },
    { amp: 0.13 * dyn, freq: 5.2, phaseOffset: 2.3,  opacity: playing ? 0.32 : 0.18, width: 0.6 },
  ]

  return (
    <div className={`
      relative flex flex-col overflow-hidden rounded-2xl
      ${isLarge ? 'gap-6 p-8' : 'gap-4 p-6'}
      border transition-all duration-500
      ${revealed
        ? 'bg-[#090909] border-white/12 reveal-glow'
        : 'bg-[#080808] border-white/[0.065]'
      }
    `}>
      {src && (
        <audio
          ref={audioRef}
          src={src}
          preload="auto"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => {
            const el = e.currentTarget
            if (el.duration > 0) setProgress((el.currentTime / el.duration) * 100)
          }}
          onEnded={() => { setPlaying(false); setProgress(100) }}
        />
      )}
      {/* Top edge highlight */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

      {/* Ambient glow when playing */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.035) 0%, transparent 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="overflow-hidden" style={{ height: 16 }}>
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.span
                key="orig"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.35 }}
                className="block text-[9px] font-semibold tracking-[0.25em] uppercase"
                style={{ color: type === 'ai' ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.68)' }}
              >
                {label}
              </motion.span>
            ) : (
              <motion.span
                key="rev"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="block text-[9px] font-semibold tracking-[0.25em] uppercase text-white/60"
              >
                Generated by Kvad
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {playing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.4, 1, 0.4], scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ opacity: { duration: 1.3, repeat: Infinity }, scale: { duration: 0.2 } }}
                className="w-1 h-1 rounded-full bg-white/45"
              />
            )}
          </AnimatePresence>
          <span className="font-mono text-[9px] tabular-nums" style={{ color: 'rgba(255,255,255,0.38)' }}>
            {formatTime(progress)} / {formatTime(100)}
          </span>
        </div>
      </div>

      {/* Waveform */}
      <div className="relative z-10 w-full" style={{ height: WAVE_H }}>
        {type === 'ai' || src ? (
          <svg viewBox={`0 0 ${W} ${WAVE_H}`} preserveAspectRatio="none" className="w-full h-full">
            {Array.from({ length: BAR_COUNT }, (_, i) => {
              let h = barHeight(i, phase, playing)
              // live spectrum when real audio plays; voice energy sits in lower bins
              if (src && playing && freqRef.current) {
                const bin = Math.floor((i / BAR_COUNT) * freqRef.current.length * 0.7)
                h = 0.05 + (freqRef.current[bin] / 255) * 0.92
              }
              const bh = h * WAVE_H * 0.88
              const x = i * barW + barGap / 2
              const bw = Math.max(1, barW - barGap)
              const cy = WAVE_H / 2
              const opacity = playing ? 0.55 + h * 0.45 : 0.35 + h * 0.32
              return (
                <rect
                  key={i}
                  x={x}
                  y={cy - bh / 2}
                  width={bw}
                  height={bh}
                  rx={1.2}
                  fill="white"
                  opacity={opacity}
                />
              )
            })}
          </svg>
        ) : (
          <svg viewBox={`0 0 ${W} ${WAVE_H}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full" style={{ shapeRendering: 'geometricPrecision' }}>
            <line x1={0} y1={WAVE_H / 2} x2={W} y2={WAVE_H / 2} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
            {humanLayers.map((layer, i) => (
              <path
                key={i}
                d={smoothPath(layer.amp, layer.freq, phase + layer.phaseOffset)}
                fill="none"
                stroke="white"
                strokeWidth={layer.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={layer.opacity}
                style={{ transition: 'opacity 0.6s ease' }}
              />
            ))}
            {playing && progress > 0 && (
              <line
                x1={(progress / 100) * W} y1={0}
                x2={(progress / 100) * W} y2={WAVE_H}
                stroke="rgba(255,255,255,0.12)" strokeWidth={0.8}
              />
            )}
          </svg>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="relative z-10 w-full rounded-full overflow-hidden cursor-pointer"
        style={{ height: 1.5, background: 'rgba(255,255,255,0.05)' }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
          setProgress(pct)
          if (audioRef.current) audioRef.current.currentTime = (pct / 100) * duration
        }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${progress}%`, background: 'rgba(255,255,255,0.22)', transition: 'width 0.1s linear' }}
        />
      </div>

      {/* Controls */}
      <div className="relative z-10 flex items-center gap-4">
        <button
          onClick={togglePlay}
          className={`
            flex-shrink-0 flex items-center justify-center rounded-full border
            transition-all duration-200 active:scale-95
            ${playing
              ? 'bg-white/[0.10] border-white/[0.14] hover:bg-white/[0.15]'
              : 'bg-white/[0.05] border-white/[0.08] hover:bg-white/[0.09]'
            }
            ${isLarge ? 'w-11 h-11' : 'w-9 h-9'}
          `}
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1" y="0.5" width="3" height="9" rx="1" fill="rgba(255,255,255,0.62)" />
              <rect x="6" y="0.5" width="3" height="9" rx="1" fill="rgba(255,255,255,0.62)" />
            </svg>
          ) : (
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
              <path d="M1.5 1L9.5 5.5L1.5 10V1Z" fill="rgba(255,255,255,0.62)" />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-2">
          <div
            className="w-[3px] h-[3px] rounded-full flex-shrink-0"
            style={{ background: type === 'ai' ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.50)' }}
          />
          <span
            className="text-[11px] font-light tracking-wide"
            style={{ color: type === 'ai' ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.65)' }}
          >
            {type === 'ai'
              ? 'Generic pronunciation · Flat delivery'
              : revealed ? 'Real-time · < 200ms · Human-like' : 'Natural pace · Conversational'}
          </span>
        </div>
      </div>
    </div>
  )
}
