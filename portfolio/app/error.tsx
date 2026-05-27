'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8faff' }}>
      <motion.div
        className="text-center max-w-md mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
          Something went wrong
        </h1>
        <p className="text-sm mb-8" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
          An unexpected error occurred. Don&apos;t worry — it&apos;s not you.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #2563b8, #00b8b0)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Try again
          </button>
          <Link href="/">
            <button
              className="px-6 py-3 rounded-xl text-sm font-semibold"
              style={{ border: '1.5px solid rgba(37,99,184,0.25)', color: '#1a2456', fontFamily: 'DM Sans, sans-serif' }}
            >
              Go home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
