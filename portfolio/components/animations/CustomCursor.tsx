'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const isVisible = useRef(false)
  const isHovering = useRef(false)

  useEffect(() => {
    // Only show on non-touch devices
    if ('ontouchstart' in window) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20)
      cursorY.set(e.clientY - 20)
      dotX.set(e.clientX - 4)
      dotY.set(e.clientY - 4)
    }

    const handleMouseEnter = () => { isVisible.current = true }
    const handleMouseLeave = () => { isVisible.current = false }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Add hover effects for interactive elements
    const addHoverClass = () => { isHovering.current = true }
    const removeHoverClass = () => { isHovering.current = false }

    document.querySelectorAll('a, button, [data-cursor="pointer"]').forEach(el => {
      el.addEventListener('mouseenter', addHoverClass)
      el.addEventListener('mouseleave', removeHoverClass)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, dotX, dotY])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          border: '1.5px solid rgba(0,184,176,0.8)',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998]"
        style={{
          x: dotX,
          y: dotY,
          background: '#00b8b0',
        }}
      />
    </>
  )
}
