'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Cover from './slides/Cover'
import Problem from './slides/Problem'
import Solution from './slides/Solution'
import Reveal from './slides/Reveal'
import Market from './slides/Market'
import Milestones from './slides/Milestones'
import Competition from './slides/Competition'
import BusinessModel from './slides/BusinessModel'
import Team from './slides/Team'
import Ask from './slides/Ask'

// Design canvas on phones: fixed height, width follows the screen so the slide fills it edge to edge
const STAGE_H = 600
const STAGE_MIN_W = 1080

const SLIDES = [
  Cover,
  Problem,
  Solution,
  Reveal,
  Market,
  Milestones,
  Competition,
  BusinessModel,
  Team,
  Ask,
]

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -24 : 24,
  }),
}


export default function Deck() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [touch, setTouch] = useState(false)
  const [mobile, setMobile] = useState<{ scale: number; width: number; offsetX: number; offsetY: number; portrait: boolean } | null>(null)

  useEffect(() => {
    // Detect phones by physical screen size; window size can be stale or zoomed on iOS right after rotating
    const portraitQuery = window.matchMedia('(orientation: portrait)')
    setTouch(window.matchMedia('(pointer: coarse)').matches)
    // Probe that resolves the iPhone safe-area insets (camera cutout / Dynamic Island, home bar)
    const probe = document.createElement('div')
    probe.style.cssText =
      'position:fixed;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
    document.body.appendChild(probe)
    const update = () => {
      const phone =
        Math.min(window.screen.width, window.screen.height) < 600 ||
        Math.min(window.innerWidth, window.innerHeight) < 600
      if (!phone) return setMobile(null)
      // Keep the slide inside the safe area; the black page background still runs edge to edge
      const inset = getComputedStyle(probe)
      const [top, right, bottom, left] = [inset.paddingTop, inset.paddingRight, inset.paddingBottom, inset.paddingLeft].map(parseFloat)
      const w = window.innerWidth - left - right
      const h = window.innerHeight - top - bottom
      const width = Math.max(STAGE_MIN_W, Math.round((STAGE_H * w) / h))
      setMobile({
        scale: Math.min(w / width, h / STAGE_H),
        width,
        offsetX: (left - right) / 2,
        offsetY: (top - bottom) / 2,
        portrait: portraitQuery.matches,
      })
    }
    const updateAfterRotate = () => {
      update()
      setTimeout(update, 350)
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', updateAfterRotate)
    portraitQuery.addEventListener('change', updateAfterRotate)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', updateAfterRotate)
      portraitQuery.removeEventListener('change', updateAfterRotate)
      probe.remove()
    }
  }, [])

  const total = SLIDES.length

  const goNext = useCallback(() => {
    if (current < total - 1) {
      setDirection(1)
      setCurrent((c) => c + 1)
    }
  }, [current, total])

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1)
      setCurrent((c) => c - 1)
    }
  }, [current])

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault()
        goNext()
      } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, toggleFullscreen])


  // Touch/swipe support
  useEffect(() => {
    let startX = 0
    let startY = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)
      if (Math.max(absDx, absDy) < 40) return
      if (absDx > absDy) {
        if (dx < 0) goNext()
        else goPrev()
      } else {
        if (dy < 0) goNext()
        else goPrev()
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goNext, goPrev])

  const SlideComponent = SLIDES[current]

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030303]" style={{ height: '100dvh' }}>
      <div
        className="absolute overflow-hidden"
        style={
          mobile
            ? {
                width: mobile.width,
                height: STAGE_H,
                left: `calc(50% + ${mobile.offsetX}px)`,
                top: `calc(50% + ${mobile.offsetY}px)`,
                transform: `translate(-50%, -50%) scale(${mobile.scale})`,
              }
            : { inset: 0 }
        }
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>

        {/* Persistent Kvad icon — top-left on all slides */}
        <div className="absolute top-7 left-8 z-50 pointer-events-none">
          <Image src="/kvad-icon.svg" alt="Kvad" width={22} height={22} style={{ opacity: 0.30 }} />
        </div>

        {/* Left nav arrow */}
        {current > 0 && (
          <button
            onClick={goPrev}
            className="nav-arrow absolute left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center text-white/20 hover:text-white/50 transition-colors duration-300"
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Right nav arrow */}
        {current < total - 1 && (
          <button
            onClick={goNext}
            className="nav-arrow absolute right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center text-white/20 hover:text-white/50 transition-colors duration-300"
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Slide dots (hidden on phones: swipe navigates, and they collide with slide content) */}
        {!mobile && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center gap-[6px]">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="slide-dot rounded-full bg-white transition-all duration-300"
              style={{
                width: i === current ? 20 : 4,
                height: 4,
                opacity: i === current ? 0.55 : 0.18,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        )}

        {/* Navigation hint on the cover */}
        <AnimatePresence>
          {current === 0 && (
            <motion.div
              key="nav-hint"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute bottom-16 inset-x-0 z-50 flex justify-center items-center gap-3 pointer-events-none whitespace-nowrap"
            >
              {touch ? (
                <>
                  <motion.svg
                    width="22" height="14" viewBox="0 0 22 14" fill="none"
                    animate={{ x: [4, -4, 4] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d="M20 7H3M3 7L8 2M3 7L8 12" stroke="rgba(255,255,255,0.45)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                  <span className="text-[11px] font-light tracking-[0.18em] uppercase text-white/45">Swipe to navigate</span>
                </>
              ) : (
                <>
                  {['←', '→'].map((k) => (
                    <span key={k} className="flex items-center justify-center w-6 h-6 rounded-md text-[11px] text-white/55"
                      style={{ border: '1px solid rgba(255,255,255,0.14)' }}>
                      {k}
                    </span>
                  ))}
                  <span className="text-[11px] font-light tracking-[0.18em] uppercase text-white/45">to navigate</span>
                  <span className="w-px h-3 bg-white/10 mx-1" />
                  <span className="flex items-center justify-center w-6 h-6 rounded-md text-[11px] text-white/55"
                    style={{ border: '1px solid rgba(255,255,255,0.14)' }}>
                    F
                  </span>
                  <span className="text-[11px] font-light tracking-[0.18em] uppercase text-white/45">fullscreen</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide counter */}
        <div className="absolute bottom-7 right-8 z-50 text-[10px] text-white/14 font-mono tracking-wider">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>

      {/* Portrait phones: ask to rotate */}
      {mobile?.portrait && (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center gap-6 bg-[#030303] px-10 text-center">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="rotate-hint">
            <rect x="13" y="4" width="18" height="32" rx="3" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <path d="M8 30C8 36 13 40 19 40M19 40L16 37M19 40L16 43" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex flex-col gap-2">
            <span className="text-[17px] font-semibold text-white/85 tracking-tight">Rotate your phone</span>
            <span className="text-[13px] font-light text-white/40 leading-relaxed">The deck is designed for landscape view.</span>
          </div>
        </div>
      )}
    </div>
  )
}
