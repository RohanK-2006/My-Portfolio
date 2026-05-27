'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { LogoSigil } from '@/components/animations/ThreeScene'

const rotatingWords = ['Mobile Apps', 'Web Platforms', 'Digital Experiences']

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #e8f0ff 0%, #f0f8ff 40%, #e0fffe 100%)' }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #2563b8 0%, transparent 70%)',
            top: '-10%',
            right: '-5%',
          }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #00b8b0 0%, transparent 70%)',
            bottom: '-10%',
            left: '-5%',
          }}
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(37,99,184,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 w-full pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div style={{ y, opacity }} className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(37,99,184,0.1)',
                border: '1px solid rgba(37,99,184,0.2)',
              }}
            >
              <Sparkles size={14} style={{ color: '#00b8b0' }} />
              <span
                className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: '#2563b8', fontFamily: 'DM Sans, sans-serif' }}
              >
                Rohan Kshatri - React Native & Web Developer
              </span>
            </motion.div>

            {/* Main heading */}
            <div className="mb-6">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {['I Build', 'Mobile & Web', 'Experiences.'].map((line, i) => (
                  <motion.span
                    key={line}
                    className="block"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={
                      line === 'Digital'
                        ? {
                            background: 'linear-gradient(135deg, #1a2456 0%, #2563b8 50%, #00b8b0 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }
                        : { color: '#1a2456' }
                    }
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Rotating words */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <span className="text-base font-medium" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
                Crafting
              </span>
              <div className="overflow-hidden h-7 relative">
                <motion.div
                  animate={{
                    y: rotatingWords.flatMap((_, i) => [-i * 28, -i * 28, -(i + 1) * 28]).slice(0, -1),
                  }}
                  transition={{
                    duration: rotatingWords.length * 2.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {[...rotatingWords, rotatingWords[0]].map((w, i) => (
                    <div
                      key={i}
                      className="h-7 flex items-center font-semibold"
                      style={{ color: '#2563b8', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap' }}
                    >
                      {w}
                    </div>
                  ))}
                </motion.div>
              </div>
              <span className="text-base font-medium" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
                that matter.
              </span>
            </motion.div>

            <motion.p
              className="text-base leading-relaxed mb-10 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}
            >
              I&apos;m a React Native and web developer specialising in mobile apps, web platforms, and clean, high-performance user experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <Link href="/projects">
                <MagneticButton
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white font-semibold text-sm transition-shadow"
                  style={
                    {
                      background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                      boxShadow: '0 8px 30px rgba(37,99,184,0.35)',
                      fontFamily: 'DM Sans, sans-serif',
                    } as React.CSSProperties
                  }
                >
                  View Projects
                  <ArrowRight size={16} />
                </MagneticButton>
              </Link>
              <Link href="/contact">
                <MagneticButton
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all"
                  style={
                    {
                      background: 'rgba(255,255,255,0.8)',
                      border: '1.5px solid rgba(37,99,184,0.25)',
                      color: '#1a2456',
                      fontFamily: 'DM Sans, sans-serif',
                      backdropFilter: 'blur(10px)',
                    } as React.CSSProperties
                  }
                >
                  Let&apos;s Talk
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Logo Sigil */}
          <motion.div
            className="relative h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <LogoSigil />

            {/* Floating tech labels */}
            {[
              { text: 'React Native', top: '15%', left: '5%',  delay: 1.4 },
              { text: 'Next.js',      top: '20%', right: '5%', delay: 1.5 },
              { text: 'TypeScript',   bottom: '25%', left: '5%',  delay: 1.6 },
              { text: 'Node.js',      bottom: '20%', right: '5%', delay: 1.7 },
              { text: 'Cloudflare',   bottom: '55%', right: '90%', delay: 1.7 },
            ].map(({ text, top, left, right, bottom, delay }) => (
              <motion.div
                key={text}
                className="absolute px-3 py-1.5 rounded-lg text-xs font-mono font-medium"
                style={
                  {
                    top, left, right, bottom,
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(37,99,184,0.2)',
                    color: '#2563b8',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 20px rgba(37,99,184,0.1)',
                    fontFamily: 'JetBrains Mono, monospace',
                    zIndex: 10,
                  } as React.CSSProperties
                }
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { delay, duration: 0.4 },
                  scale:   { delay, duration: 0.4 },
                  y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-0.5 h-8 rounded-full"
          style={{ background: 'linear-gradient(180deg, #2563b8, transparent)' }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}