'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Cover from './slides/Cover'
import Problem from './slides/Problem'
import WhyNow from './slides/WhyNow'
import Solution from './slides/Solution'
import Reveal from './slides/Reveal'
import Traction from './slides/Traction'
import WhyKvad from './slides/WhyKvad'
import Market from './slides/Market'
import GoToMarket from './slides/GoToMarket'
import BusinessModel from './slides/BusinessModel'
import Team from './slides/Team'
import Ask from './slides/Ask'
import Closing from './slides/Closing'

const SLIDES = [
  Cover,
  Problem,
  WhyNow,
  Solution,
  Reveal,
  Traction,
  WhyKvad,
  Market,
  GoToMarket,
  BusinessModel,
  Team,
  Ask,
  Closing,
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
    <div className="relative w-screen h-screen overflow-hidden bg-[#030303]">
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

      {/* Slide dots */}
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

      {/* Slide counter */}
      <div className="absolute bottom-7 right-8 z-50 text-[10px] text-white/14 font-mono tracking-wider">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

    </div>
  )
}
