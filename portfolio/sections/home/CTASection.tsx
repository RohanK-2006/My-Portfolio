'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <motion.div
            className="relative rounded-3xl p-16 text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1a2456 0%, #2563b8 50%, #00b8b0 100%)' }}
          >
            {/* Animated mesh background */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${150 + i * 50}px`,
                    height: `${150 + i * 50}px`,
                    background: 'rgba(255,255,255,0.05)',
                    left: `${[10, 80, 50, 20, 65, 40][i]}%`,
                    top: `${[20, 10, 60, 80, 50, 30][i]}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                />
              ))}
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} />

            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Zap size={14} color="#c9a227" fill="#c9a227" />
                <span className="text-xs font-semibold tracking-widest uppercase text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Ready to Build?
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Let&apos;s Build Something
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #c9a227, #f0d060)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Extraordinary
                </span>
              </h2>

              <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'DM Sans, sans-serif' }}>
                Turn your idea into a product that users love. I&apos;m ready when you are.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      color: '#1a2456',
                      fontFamily: 'DM Sans, sans-serif',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    } as React.CSSProperties}
                    whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Start a Project
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm text-white"
                    style={{
                      border: '1.5px solid rgba(255,255,255,0.35)',
                      fontFamily: 'DM Sans, sans-serif',
                    } as React.CSSProperties}
                    whileHover={{ background: 'rgba(255,255,255,0.1)', scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Learn About Me
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
