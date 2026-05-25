'use client'

import { useState } from 'react'

const BAR_COUNT = 28
const BAR_HEIGHTS = Array.from({ length: BAR_COUNT }, (_, i) =>
  4 + Math.round(Math.abs(Math.sin(i * 0.7 + 1.2)) * 12)
)

interface AudioPlayerInlineProps {
  label: string
  accent?: string
}

export default function AudioPlayerInline({ label, accent = 'rgba(255,255,255,0.55)' }: AudioPlayerInlineProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div
      className="flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer select-none"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      onClick={() => setPlaying(p => !p)}
    >
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
            className={playing ? 'audio-bar-playing rounded-full flex-shrink-0' : 'rounded-full flex-shrink-0'}
            style={{
              width: 2.5,
              height: h,
              background: playing ? accent : 'rgba(255,255,255,0.12)',
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
