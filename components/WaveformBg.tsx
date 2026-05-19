'use client'

import { useEffect, useRef } from 'react'

interface WaveformBgProps {
  opacity?: number
  speed?: number
}

export default function WaveformBg({ opacity = 0.04, speed = 1 }: WaveformBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const waves = [
      { amplitude: 60, frequency: 0.003, speed: 0.3 * speed, phase: 0, y: 0.45 },
      { amplitude: 35, frequency: 0.005, speed: 0.5 * speed, phase: 2, y: 0.55 },
      { amplitude: 20, frequency: 0.008, speed: 0.7 * speed, phase: 4, y: 0.5 },
    ]

    const draw = () => {
      timeRef.current += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.lineWidth = 1

        for (let x = 0; x <= canvas.width; x += 2) {
          const y =
            canvas.height * wave.y +
            Math.sin(x * wave.frequency + timeRef.current * wave.speed + wave.phase) *
              wave.amplitude +
            Math.sin(x * wave.frequency * 2.3 + timeRef.current * wave.speed * 0.7) *
              (wave.amplitude * 0.3)

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [opacity, speed])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
