'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

const PIN_LENGTH = 4
const ACCENT = '#ffffff'
const ease = [0.25, 0.1, 0.25, 1] as const

// Bar heights for the waveform the code boxes turn into (Kvad-icon rhythm)
const WAVE = [0.25, 0.45, 0.7, 0.95, 0.6, 1, 0.75, 0.5, 0.85, 0.4, 0.65, 0.3, 0.2]

type Phase = 'idle' | 'checking' | 'success'

export default function UnlockPage() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  const submit = async (code: string) => {
    setPhase('checking')
    const res = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: code }),
    })
    if (res.ok) {
      setPhase('success')
      router.prefetch('/')
      // Navigate once the light has filled the screen
      setTimeout(() => router.replace('/'), 2600)
      return
    }
    setPhase('idle')
    setError(true)
    setPin('')
    inputRef.current?.focus()
  }

  const onChange = (value: string) => {
    if (phase !== 'idle') return
    const digits = value.replace(/\D/g, '').slice(0, PIN_LENGTH)
    setPin(digits)
    setError(false)
    if (digits.length === PIN_LENGTH) submit(digits)
  }

  const success = phase === 'success'

  return (
    <div
      className="relative w-screen flex items-center justify-center bg-[#030303] px-6 overflow-hidden"
      style={{ height: '100dvh' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Ambient background, brightens as the code fills in */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: success
            ? 'radial-gradient(ellipse 60% 50% at 50% 50%, #171717 0%, #030303 100%)'
            : `radial-gradient(ellipse 60% 50% at 50% 45%, ${['#0f0f0f', '#111111', '#131313', '#151515', '#171717'][pin.length]} 0%, #030303 100%)`,
        }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative z-10 flex flex-col items-center gap-9">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={success ? { opacity: 1, y: 0, scale: 1.08 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: success ? 1.2 : 0.8, ease }}
          style={{ filter: success ? 'drop-shadow(0 0 24px rgba(255,255,255,0.35))' : 'none', transition: 'filter 1s ease' }}
        >
          <Image src="/kvad-logo.svg" alt="Kvad" width={180} height={41} priority style={{ opacity: 0.9 }} />
        </motion.div>

        <div className="relative flex flex-col items-center gap-5">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: success ? 0 : 1 }}
            transition={{ duration: 0.4, delay: success ? 0 : 0.3 }}
            className="text-[10px] text-white/30 tracking-[0.26em] uppercase font-medium"
          >
            Enter code to view the deck
          </motion.span>

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

          <div className="relative flex items-center justify-center" style={{ height: 64 }}>
            {/* Code boxes */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={error ? { opacity: 1, y: 0, x: [0, -10, 10, -6, 6, 0] } : { opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {Array.from({ length: PIN_LENGTH }, (_, i) => {
                const filled = i < pin.length
                const active = i === pin.length && phase === 'idle'
                // On success each box turns green, then collapses towards the centre
                const towardsCentre = ((PIN_LENGTH - 1) / 2 - i) * 68
                return (
                  <motion.div
                    key={i}
                    className="relative w-14 h-16 rounded-xl flex items-center justify-center bg-[#0c0c0c]"
                    style={{ border: '1px solid rgba(255,255,255,0.09)' }}
                    animate={
                      success
                        ? {
                            borderColor: ['rgba(255,255,255,0.22)', ACCENT, ACCENT],
                            boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 18px rgba(255,255,255,0.35)', '0 0 0px rgba(255,255,255,0)'],
                            x: [0, 0, towardsCentre],
                            scaleX: [1, 1.06, 0.12],
                            scaleY: [1, 1.06, 0.6],
                            opacity: [1, 1, 0],
                          }
                        : {
                            borderColor: error
                              ? 'rgba(248,113,113,0.45)'
                              : active
                                ? 'rgba(255,255,255,0.35)'
                                : filled
                                  ? 'rgba(255,255,255,0.22)'
                                  : 'rgba(255,255,255,0.09)',
                            boxShadow: filled ? '0 0 14px rgba(255,255,255,0.06)' : '0 0 0px rgba(255,255,255,0)',
                          }
                    }
                    transition={
                      success
                        ? { duration: 0.9, times: [0, 0.35, 1], delay: i * 0.08, ease }
                        : { duration: 0.25 }
                    }
                  >
                    {filled && (
                      <>
                        {/* Ripple when a digit lands */}
                        <motion.span
                          className="absolute inset-0 rounded-xl"
                          initial={{ opacity: 0.5, scale: 0.9 }}
                          animate={{ opacity: 0, scale: 1.25 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          style={{ border: '1px solid rgba(255,255,255,0.35)' }}
                        />
                        <motion.span
                          initial={{ scale: 0.3, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1, backgroundColor: success ? ACCENT : 'rgba(255,255,255,0.9)' }}
                          transition={{ duration: 0.2, backgroundColor: { duration: 0.3, delay: i * 0.08 } }}
                          className="w-2.5 h-2.5 rounded-full"
                        />
                      </>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>

            {/* The boxes become a voice waveform */}
            <AnimatePresence>
              {success && (
                <motion.div
                  key="wave"
                  className="absolute inset-0 flex items-center justify-center gap-[5px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.75 }}
                >
                  {WAVE.map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-[3px] rounded-full"
                      style={{ background: ACCENT, boxShadow: '0 0 10px rgba(255,255,255,0.55)' }}
                      initial={{ height: 2 }}
                      animate={{ height: [2, h * 56, h * 30, h * 60, 2] }}
                      transition={{
                        duration: 1.3,
                        delay: 0.8 + Math.abs(i - (WAVE.length - 1) / 2) * 0.03,
                        times: [0, 0.3, 0.55, 0.8, 1],
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className="h-4 text-[12px] font-light" style={{ color: 'rgba(248,113,113,0.8)' }}>
            {error ? 'Wrong code' : ''}
          </span>
        </div>
      </div>

      {/* Light bursts from the centre and fills the screen, then settles to the deck's black */}
      <AnimatePresence>
        {success && (
          <>
            {/* Thin sound-wave rings; size is animated (not scale) so the stroke stays 1px */}
            {[0, 0.16, 0.32].map((d, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute left-1/2 top-1/2 rounded-full pointer-events-none z-20"
                style={{ x: '-50%', y: '-50%', border: '1px solid rgba(255,255,255,0.5)' }}
                initial={{ width: 40, height: 40, opacity: 0 }}
                animate={{ width: '220vmax', height: '220vmax', opacity: [0, 0.55 - i * 0.12, 0] }}
                transition={{ duration: 1.6, delay: 1.45 + d, ease: [0.15, 0.6, 0.3, 1], opacity: { duration: 1.6, delay: 1.45 + d, times: [0, 0.12, 1] } }}
              />
            ))}
            {/* Soft light that blooms from the centre */}
            <motion.div
              key="bloom"
              className="absolute left-1/2 top-1/2 rounded-full pointer-events-none z-20"
              style={{
                x: '-50%',
                y: '-50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0) 65%)',
              }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: '160vmax', height: '160vmax', opacity: [0, 1, 0.7] }}
              transition={{ duration: 1.0, delay: 1.5, ease: [0.3, 0.1, 0.3, 1], opacity: { duration: 1.0, delay: 1.5, times: [0, 0.4, 1] } }}
            />
            <motion.div
              key="fade"
              className="absolute inset-0 bg-[#030303] pointer-events-none z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.05 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
