'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function FloatingShapes() {
  const [mounted, setMounted] = useState(false)

  // Ensure hydration match
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary shape top right */}
      <motion.div
        className="absolute top-[-10%] -right-[10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, #2563b8 0%, transparent 70%)' }}
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary shape bottom center */}
      <motion.div
        className="absolute bottom-[-20%] left-1/3 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, #00b8b0 0%, transparent 70%)' }}
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Tertiary shape center left */}
      <motion.div
        className="absolute top-1/4 -left-[10%] w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #4a3fa0 0%, transparent 70%)' }}
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid overlay to add texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  )
}
