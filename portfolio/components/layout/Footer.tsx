'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],
  Expertise: [
    { label: 'Mobile Apps', href: '/expertise' },
    { label: 'Web Development', href: '/expertise' },
    { label: 'UI/UX Design', href: '/expertise' },
    { label: 'Deployment', href: '/expertise' },
  ],
}

const socials = [
  { icon: Github, href: 'https://github.com/RohanK-2006', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/rohan-kshatri-a0062b3a1', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:rohan.kshatri2006@gmail.com', label: 'Email' },
]

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d1535 0%, #162050 50%, #0a2a3a 100%)' }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(0,184,176,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,176,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10" style={{
        background: 'radial-gradient(circle, #00b8b0 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
      }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10" style={{
        background: 'radial-gradient(circle, #2563b8 0%, transparent 70%)',
        transform: 'translate(50%, 50%)',
      }} />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                      <Image
                        src="/assets/logos/RK.png"
                        alt="Rohan Kshatri"
                  fill
                  className="object-contain"
                  style={{ mixBlendMode: 'lighten' }}
                />
              </div>
              <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                 Rohan <span style={{ color: '#00b8b0' }}>Kshatri</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif' }}>
                React Native and web developer crafting premium digital experiences with a focus on performance and polish.
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#00b8b0', fontFamily: 'DM Sans, sans-serif' }}>
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm flex items-center gap-1 group transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
       
      </div>
    </footer>
  )
}
