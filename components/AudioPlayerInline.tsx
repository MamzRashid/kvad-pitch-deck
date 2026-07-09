'use client'

import { useEffect, useRef, useState } from 'react'

const BAR_COUNT = 28
const BAR_HEIGHTS = Array.from({ length: BAR_COUNT }, (_, i) =>
  4 + Math.round(Math.abs(Math.sin(i * 0.7 + 1.2)) * 12)
)
const MIN_H = 3
const MAX_H = 20

interface AudioPlayerInlineProps {
  label: string
  accent?: string
  src?: string
}

export default function AudioPlayerInline({ label, accent = 'rgba(255,255,255,0.55)', src }: AudioPlayerInlineProps) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const barsRef = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef(0)

  // Web Audio graph can only be attached once per media element
  const ensureGraph = () => {
    const el = audioRef.current
    if (!el || ctxRef.current) return
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const source = ctx.createMediaElementSource(el)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 128
    analyser.smoothingTimeConstant = 0.72
    source.connect(analyser)
    analyser.connect(ctx.destination)
    ctxRef.current = ctx
    analyserRef.current = analyser
  }

  useEffect(() => {
    if (!playing || !src) return
    const analyser = analyserRef.current
    if (!analyser) return
    const data = new Uint8Array(analyser.frequencyBinCount)
    const tick = () => {
      analyser.getByteFrequencyData(data)
      for (let i = 0; i < BAR_COUNT; i++) {
        // voice energy sits in the lower ~70% of bins
        const bin = Math.floor((i / BAR_COUNT) * data.length * 0.7)
        const v = data[bin] / 255
        const el = barsRef.current[i]
        if (el) el.style.height = `${MIN_H + v * (MAX_H - MIN_H)}px`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      barsRef.current.forEach((el, i) => { if (el) el.style.height = `${BAR_HEIGHTS[i]}px` })
    }
  }, [playing, src])

  const toggle = () => {
    const next = !playing
    setPlaying(next)
    const el = audioRef.current
    if (!el) return
    if (next) {
      ensureGraph()
      ctxRef.current?.resume()
      if (el.ended) el.currentTime = 0
      el.play().catch(() => setPlaying(false))
    } else {
      el.pause()
    }
  }

  return (
    <div
      className="flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer select-none"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      onClick={toggle}
    >
      {src && <audio ref={audioRef} src={src} preload="auto" onEnded={() => setPlaying(false)} />}
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.09)' }}
      >
        {playing ? (
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
            <rect x="0" y="0" width="2.8" height="10" rx="0.8" fill="rgba(255,255,255,0.75)" />
            <rect x="5.2" y="0" width="2.8" height="10" rx="0.8" fill="rgba(255,255,255,0.75)" />
          </svg>
        ) : (
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
            <path d="M1.5 1l5.5 4-5.5 4V1z" fill="rgba(255,255,255,0.75)" />
          </svg>
        )}
      </div>

      <div className="flex items-center gap-[2.5px] flex-1" style={{ height: 20 }}>
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            ref={(el) => { barsRef.current[i] = el }}
            className={playing && !src ? 'audio-bar-playing rounded-full flex-shrink-0' : 'rounded-full flex-shrink-0'}
            style={{
              width: 2.5,
              height: h,
              background: playing ? accent : 'rgba(255,255,255,0.12)',
              transition: src ? 'height 70ms linear' : undefined,
              '--bar-dur': `${0.5 + (i % 5) * 0.12}s`,
              '--bar-delay': `${(i % 7) * -0.09}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <span className="text-[10px] font-medium tracking-[0.08em] flex-shrink-0" style={{ color: 'rgba(255,255,255,0.28)' }}>
        {label}
      </span>
    </div>
  )
}
