'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

export function Reveal({ children, delay = 0, direction = 'up', className = '', once = true }: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction], filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  baseDelay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export function StaggerReveal({ children, className = '', staggerDelay = 0.1, baseDelay = 0, direction = 'up' }: StaggerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const directionMap = {
    up: { y: 40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  }

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, ...directionMap[direction], filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: baseDelay + i * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
