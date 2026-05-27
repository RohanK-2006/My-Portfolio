'use client'
import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────
   LogoSigil – a pure CSS-3D + Canvas animated
  hero centerpiece for the portfolio.
   No Three.js / WebGL required.
───────────────────────────────────────────── */

export function LogoSigil() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animFrameRef = useRef<number>(0)

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0
    const particles: Particle[] = []
    const PARTICLE_COUNT = 120

    interface Particle {
      x: number; y: number; vx: number; vy: number
      radius: number; alpha: number; color: string; life: number; maxLife: number
    }

    const COLORS = ['#2563b8', '#00b8b0', '#4a3fa0', '#c9a227', '#5b8fe8']

    function spawn(): Particle {
      const angle = Math.random() * Math.PI * 2
      const dist = 140 + Math.random() * 80
      const cx = W / 2, cy = H / 2
      const maxLife = 120 + Math.random() * 180
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 0.8 + Math.random() * 2.2,
        alpha: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: Math.random() * maxLife,
        maxLife,
      }
    }

    function resize() {
      if (!canvas || !canvas.parentElement) return
      const rect = canvas.parentElement.getBoundingClientRect()
      W = canvas.width = rect.width
      H = canvas.height = rect.height
    }

    resize()
    window.addEventListener('resize', resize)
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(spawn())

    function draw() {
      ctx.clearRect(0, 0, W, H)

      /* draw magnetic field lines */
      const cx = W / 2, cy = H / 2
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + Date.now() * 0.0003
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angle)
        const grad = ctx.createLinearGradient(0, 0, 160, 0)
        grad.addColorStop(0, 'rgba(37,99,184,0)')
        grad.addColorStop(0.4, 'rgba(37,99,184,0.12)')
        grad.addColorStop(1, 'rgba(0,184,176,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(80, 0)
        ctx.bezierCurveTo(100, -30, 140, -20, 160, 0)
        ctx.stroke()
        ctx.restore()
      }

      /* particles */
      for (const p of particles) {
        p.life++
        if (p.life >= p.maxLife) {
          Object.assign(p, spawn())
          continue
        }
        const t = p.life / p.maxLife
        p.alpha = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1

        /* gentle pull toward center */
        const dx = cx - p.x, dy = cy - p.y
        const dist2 = Math.sqrt(dx * dx + dy * dy)
        p.vx += (dx / dist2) * 0.015
        p.vy += (dy / dist2) * 0.015
        p.vx *= 0.98; p.vy *= 0.98
        p.x += p.vx; p.y += p.vy

        ctx.save()
        ctx.globalAlpha = p.alpha * 0.7
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        ctx.restore()
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  /* ── Tilt on mouse move ── */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMousePos({ x, y })
    }
    const onLeave = () => setMousePos({ x: 0, y: 0 })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const tiltX = mousePos.y * -12
  const tiltY = mousePos.x * 12

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none"
      style={{ perspective: '900px' }}
    >
      {/* Particle canvas — full bleed behind everything */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* ── The 3-D shrine ── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: 'transform 0.12s ease-out',
          zIndex: 1,
        }}
      >
        {/* Outermost aurora ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 440, height: 440,
            background: 'conic-gradient(from 0deg, rgba(37,99,184,0.18), rgba(0,184,176,0.22), rgba(201,162,39,0.12), rgba(74,63,160,0.18), rgba(37,99,184,0.18))',
            animation: 'spin-slow 18s linear infinite',
            filter: 'blur(2px)',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-20px)',
          }}
        />

        {/* Mid orbit ring — CSS 3D ellipse */}
        <div
          className="absolute rounded-full"
          style={{
            width: 360, height: 360,
            border: '1.5px solid rgba(0,184,176,0.35)',
            animation: 'spin-mid 10s linear infinite',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0px) rotateX(70deg)',
            boxShadow: '0 0 20px rgba(0,184,176,0.15)',
          }}
        >
          {/* Orbiting dot */}
          <div
            className="absolute w-3 h-3 rounded-full"
            style={{
              top: '50%', left: '-6px',
              marginTop: '-6px',
              background: '#00b8b0',
              boxShadow: '0 0 12px 4px rgba(0,184,176,0.7)',
            }}
          />
        </div>

        {/* Second orbit ring — tilted differently */}
        <div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300,
            border: '1px solid rgba(37,99,184,0.3)',
            animation: 'spin-rev 14s linear infinite',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(10px) rotateX(60deg) rotateZ(45deg)',
            boxShadow: '0 0 16px rgba(37,99,184,0.1)',
          }}
        >
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: '50%', right: '-4px',
              marginTop: '-4px',
              background: '#c9a227',
              boxShadow: '0 0 10px 4px rgba(201,162,39,0.6)',
            }}
          />
        </div>

        {/* Inner glow disc */}
        <div
          className="absolute rounded-full"
          style={{
            width: 220, height: 220,
            background: 'radial-gradient(circle, rgba(37,99,184,0.14) 0%, rgba(0,184,176,0.08) 50%, transparent 70%)',
            animation: 'pulse-glow 3s ease-in-out infinite',
            transform: 'translateZ(20px)',
          }}
        />

        {/* ── Glass orb behind logo ── */}
        <div
          className="absolute rounded-full"
          style={{
            width: 190, height: 190,
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18) 0%, rgba(37,99,184,0.06) 40%, rgba(0,184,176,0.04) 70%, transparent 100%)',
            border: '1px solid rgba(255,255,255,0.22)',
            backdropFilter: 'blur(8px)',
            boxShadow: `
              0 8px 40px rgba(37,99,184,0.25),
              0 2px 8px rgba(0,184,176,0.2),
              inset 0 1px 0 rgba(255,255,255,0.25)
            `,
            transform: 'translateZ(30px)',
            animation: 'float-logo 5s ease-in-out infinite',
          }}
        />

        {/* ── Logo itself ── */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            width: 160, height: 160,
            transform: 'translateZ(50px)',
            animation: 'float-logo 5s ease-in-out infinite',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logos/RK.png"
            alt="Rohan Kshatri"
            style={{
              width: '80%',
              height: '80%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 18px rgba(0,184,176,0.55)) drop-shadow(0 0 6px rgba(37,99,184,0.4))',
              mixBlendMode: 'normal',
            }}
          />
        </div>

        {/* Corner accent sparkles */}
        {[
          { angle: 0,   dist: 200, color: '#00b8b0', delay: '0s',   size: 6 },
          { angle: 72,  dist: 185, color: '#2563b8', delay: '0.6s', size: 5 },
          { angle: 144, dist: 195, color: '#c9a227', delay: '1.2s', size: 4 },
          { angle: 216, dist: 190, color: '#00b8b0', delay: '1.8s', size: 5 },
          { angle: 288, dist: 200, color: '#4a3fa0', delay: '2.4s', size: 4 },
        ].map(({ angle, dist, color, delay, size }, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size, height: size,
                background: color,
                boxShadow: `0 0 ${size * 2}px ${size}px ${color}88`,
                left: `calc(50% + ${Math.cos(rad) * dist}px - ${size / 2}px)`,
                top:  `calc(50% + ${Math.sin(rad) * dist}px - ${size / 2}px)`,
                animation: `sparkle-pop 2.4s ease-in-out ${delay} infinite`,
                transform: 'translateZ(25px)',
              }}
            />
          )
        })}
      </div>

      {/* CSS keyframes injected once */}
      <style>{`
        @keyframes spin-slow {
          from { transform: translateZ(-20px) rotate(0deg); }
          to   { transform: translateZ(-20px) rotate(360deg); }
        }
        @keyframes spin-mid {
          from { transform: translateZ(0px) rotateX(70deg) rotateZ(0deg); }
          to   { transform: translateZ(0px) rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes spin-rev {
          from { transform: translateZ(10px) rotateX(60deg) rotateZ(45deg); }
          to   { transform: translateZ(10px) rotateX(60deg) rotateZ(-315deg); }
        }
        @keyframes float-logo {
          0%, 100% { transform: translateZ(50px) translateY(0px); }
          50%       { transform: translateZ(50px) translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: translateZ(20px) scale(1); }
          50%       { opacity: 1;   transform: translateZ(20px) scale(1.08); }
        }
        @keyframes sparkle-pop {
          0%, 100% { opacity: 0.3; transform: translateZ(25px) scale(0.8); }
          50%       { opacity: 1;   transform: translateZ(25px) scale(1.4); }
        }
      `}</style>
    </div>
  )
}