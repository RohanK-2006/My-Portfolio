'use client'
import { useState, useEffect, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { LoadingScreen } from '@/components/animations/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/animations/CustomCursor'

export function ClientShell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setLoading(false), 3200)
    return () => clearTimeout(timer)
  }, [])

  // Prevent hydration flash
  if (!mounted) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(160deg, #0d1535 0%, #162050 40%, #0a2a3a 100%)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    )
  }

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main app — rendered beneath loading screen, shown after */}
      <div
        style={{
          visibility: loading ? 'hidden' : 'visible',
          transition: 'visibility 0s',
        }}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </div>
    </>
  )
}
