'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const PIN_LENGTH = 4

export default function UnlockPage() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const submit = async (code: string) => {
    setLoading(true)
    const res = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: code }),
    })
    if (res.ok) {
      window.location.href = '/'
      return
    }
    setLoading(false)
    setError(true)
    setPin('')
    inputRef.current?.focus()
  }

  const onChange = (value: string) => {
    if (loading) return
    const digits = value.replace(/\D/g, '').slice(0, PIN_LENGTH)
    setPin(digits)
    setError(false)
    if (digits.length === PIN_LENGTH) submit(digits)
  }

  return (
    <div
      className="relative w-screen flex items-center justify-center bg-[#030303] px-6"
      style={{ height: '100dvh' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, #0f0f0f 0%, #030303 100%)' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 flex flex-col items-center gap-9"
      >
        <Image src="/kvad-logo.svg" alt="Kvad" width={180} height={41} priority style={{ opacity: 0.9 }} />

        <div className="flex flex-col items-center gap-5">
          <span className="text-[10px] text-white/30 tracking-[0.26em] uppercase font-medium">
            Enter code to view the deck
          </span>

          {/* One real input drives the four boxes, so iOS shows the number pad and one-time-code autofill works */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            autoFocus
            maxLength={PIN_LENGTH}
            value={pin}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Access code"
            className="absolute opacity-0 w-px h-px pointer-events-none"
          />

          <motion.div
            className="flex gap-3"
            animate={error ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {Array.from({ length: PIN_LENGTH }, (_, i) => {
              const filled = i < pin.length
              const active = i === pin.length && !loading
              return (
                <div
                  key={i}
                  className="w-14 h-16 rounded-xl flex items-center justify-center bg-[#0c0c0c] transition-colors duration-200"
                  style={{
                    border: `1px solid ${
                      error ? 'rgba(248,113,113,0.45)' : active ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.09)'
                    }`,
                  }}
                >
                  {filled && (
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.18 }}
                      className="w-2.5 h-2.5 rounded-full bg-white/90"
                    />
                  )}
                </div>
              )
            })}
          </motion.div>

          <span className="h-4 text-[12px] font-light" style={{ color: 'rgba(248,113,113,0.8)' }}>
            {error ? 'Wrong code' : ''}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
