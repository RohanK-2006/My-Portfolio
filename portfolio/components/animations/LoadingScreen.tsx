'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'logo' | 'text' | 'bar' | 'exit'>('enter')
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  // Particle canvas on loading screen
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,184,176,${p.alpha})`
        ctx.fill()
      })
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Phase & progress timers
  useEffect(() => {
    const inc = setInterval(() => {
      setProgress(prev => Math.min(prev + 1.5, 100))
    }, 28)

    const t1 = setTimeout(() => setPhase('logo'),  300)
    const t2 = setTimeout(() => setPhase('text'),  900)
    const t3 = setTimeout(() => setPhase('bar'),   1500)
    const t4 = setTimeout(() => setPhase('exit'),  2700)
    const t5 = setTimeout(() => onComplete(),      3200)

    return () => {
      clearInterval(inc)
      ;[t1, t2, t3, t4, t5].forEach(clearTimeout)
    }
  }, [onComplete])

  const letters = 'Rohan Kshatri'.split('')

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #080e28 0%, #0f1a40 45%, #061828 100%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,184,176,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,176,1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glow orbs */}
      {[
        { x: '20%', y: '20%', color: '#2563b8', size: 300 },
        { x: '80%', y: '70%', color: '#00b8b0', size: 250 },
        { x: '60%', y: '15%', color: '#4a3fa0', size: 200 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${orb.color}25 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}

      {/* Corner brackets */}
      {[
        { top: '2rem', left: '2rem', bt: true, bl: true },
        { top: '2rem', right: '2rem', bt: true, br: true },
        { bottom: '2rem', left: '2rem', bb: true, bl: true },
        { bottom: '2rem', right: '2rem', bb: true, br: true },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12"
          style={{
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            borderTop:    c.bt ? '1.5px solid rgba(0,184,176,0.5)' : 'none',
            borderBottom: c.bb ? '1.5px solid rgba(0,184,176,0.5)' : 'none',
            borderLeft:   c.bl ? '1.5px solid rgba(0,184,176,0.5)' : 'none',
            borderRight:  c.br ? '1.5px solid rgba(0,184,176,0.5)' : 'none',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with rings */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={phase !== 'enter' ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Animated rings */}
          {[80, 110, 140].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                border: `1px solid rgba(0,184,176,${0.35 - i * 0.1})`,
              }}
              animate={{
                scale:   [1, 1.08, 1],
                opacity: [0.6, 0.15, 0.6],
                rotate:  [0, i % 2 === 0 ? 360 : -360],
              }}
              transition={{
                scale:   { duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
                rotate:  { duration: 12 + i * 4, repeat: Infinity, ease: 'linear' },
              }}
            />
          ))}

          {/* Logo */}
          <div className="relative w-16 h-16 z-10">
            <Image
              src="/assets/logos/RK.png"
              alt="Rohan Kshatri"
              fill
              className="object-contain"
              style={{ mixBlendMode: 'lighten' }}
              priority
            />
          </div>
        </motion.div>

        {/* Letter-by-letter name */}
        <div className="flex items-baseline gap-[1px]">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={phase === 'text' || phase === 'bar' || phase === 'exit'
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : {}}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '3rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: i < 5 ? 'white' : '#00b8b0',
                lineHeight: 1,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={phase === 'bar' || phase === 'exit'
            ? { opacity: 1, letterSpacing: '0.25em' }
            : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          React Native & Web Development
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="w-52 h-0.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={phase === 'bar' || phase === 'exit' ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #2563b8, #00b8b0, #c9a227)',
              backgroundSize: '200% 100%',
              animation: 'gradientShift 2s ease infinite',
            }}
          />
        </motion.div>

        {/* Percent counter */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={phase === 'bar' || phase === 'exit' ? { opacity: 1 } : {}}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: 'rgba(0,184,176,0.7)',
          }}
        >
          {Math.round(Math.min(progress, 100))}%
        </motion.span>
      </div>
    </motion.div>
  )
}
