'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/projects', label: 'Projects' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.65)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(26,36,86,0.1), 0 1px 0 rgba(255,255,255,0.8) inset'
              : '0 1px 0 rgba(255,255,255,0.4) inset',
          }}
        >
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Rohan Kshatri home">
            <motion.div
              className="relative w-9 h-9"
              whileHover={{ rotate: 8, scale: 1.08 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Image
                src="/assets/logos/RK.png"
                alt="Rohan Kshatri logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, #1a2456 0%, #2563b8 60%, #00b8b0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Rohan Kshatri
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-7" role="list">
            {navLinks.map(link => {
              const active = pathname === link.href
              return (
                <div key={link.href} role="listitem">
                  <Link
                    href={link.href}
                    className="relative text-sm font-medium transition-colors duration-200 group py-1"
                    style={{
                      color: active ? '#2563b8' : '#1a2456',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {link.label}
                    {/* Active underline */}
                    {active && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, #2563b8, #00b8b0)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {/* Hover underline */}
                    {!active && (
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ background: 'linear-gradient(90deg, #2563b8, #00b8b0)' }}
                      />
                    )}
                  </Link>
                </div>
              )
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:block">
            <Link href="/contact">
              <motion.button
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                  boxShadow: '0 4px 20px rgba(37,99,184,0.3)',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 6px 28px rgba(37,99,184,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                Let&apos;s Talk
              </motion.button>
            </Link>
          </div>

          {/* ── Mobile burger ── */}
          <motion.button
            className="md:hidden p-2 rounded-xl"
            style={{
              background: mobileOpen ? 'rgba(37,99,184,0.08)' : 'transparent',
              color: '#1a2456',
              border: '1px solid transparent',
            }}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(10,15,40,0.3)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="fixed top-24 left-4 right-4 z-50 rounded-2xl p-6 md:hidden"
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 20px 60px rgba(26,36,86,0.15)',
              }}
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <nav aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-3.5 border-b text-base font-medium"
                      style={{
                        borderColor: 'rgba(26,36,86,0.06)',
                        color: pathname === link.href ? '#2563b8' : '#1a2456',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: '#00b8b0' }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
                <Link href="/contact" className="block mt-4">
                  <button
                    className="w-full py-3.5 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    Let&apos;s Talk
                  </button>
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
