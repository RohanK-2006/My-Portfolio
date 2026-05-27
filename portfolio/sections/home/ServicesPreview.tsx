'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Smartphone, Globe, Palette, Server, ArrowRight } from 'lucide-react'
import { Reveal, StaggerReveal } from '@/components/animations/Reveal'

const services = [
  {
    id: 'mobile-app-development',
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Crafting intuitive iOS & Android apps with React Native — buttery smooth, pixel-perfect.',
    color: '#2563b8',
    gradient: 'linear-gradient(135deg, rgba(37,99,184,0.08), rgba(37,99,184,0.02))',
    border: 'rgba(37,99,184,0.15)',
    tag: 'React Native · Expo',
  },
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Development',
    description: 'High-performance web applications with Next.js and modern architecture, built to scale.',
    color: '#00b8b0',
    gradient: 'linear-gradient(135deg, rgba(0,184,176,0.08), rgba(0,184,176,0.02))',
    border: 'rgba(0,184,176,0.15)',
    tag: 'Next.js · TypeScript · NodeJS',
  },
  {
    id: 'ui-ux-design',
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Human-centered design that delights — from wireframes to production-ready interfaces.',
    color: '#4a3fa0',
    gradient: 'linear-gradient(135deg, rgba(74,63,160,0.08), rgba(74,63,160,0.02))',
    border: 'rgba(74,63,160,0.15)',
    tag: 'User Friendly · Prototyping',
  },
  {
    id: 'deployment-devops',
    icon: Server,
    title: 'Deployment',
    description: 'Scalable hosting and continuous monitoring to keep your applications fast and available around the clock.',
    color: '#c9a227',
    gradient: 'linear-gradient(135deg, rgba(201,162,39,0.08), rgba(201,162,39,0.02))',
    border: 'rgba(201,162,39,0.15)',
    tag: 'App Stores · Cloudflare · Vercel',
  },
]

export function ServicesPreview() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#f8faff' }}>
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,184,0.2), transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
              background: 'rgba(37,99,184,0.08)',
              border: '1px solid rgba(37,99,184,0.15)',
            }}>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#2563b8', fontFamily: 'DM Sans, sans-serif' }}>
                What I Do
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
              My{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Expertise
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
              From idea to production — I handle the digital stack with precision and craft.
            </p>
          </Reveal>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={i * 0.1} direction="up">
                <Link href={`/services#${service.id}`} className="block" aria-label={`View ${service.title} service`}>
                  <motion.div
                    className="relative p-8 rounded-3xl cursor-pointer group"
                    style={{
                      background: service.gradient,
                      border: `1.5px solid ${service.border}`,
                    }}
                    whileHover={{ y: -6, boxShadow: `0 20px 50px ${service.color}15` }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: `${service.color}15`,
                        border: `1.5px solid ${service.color}25`,
                      }}
                    >
                      <Icon size={24} style={{ color: service.color }} />
                    </div>

                    <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
                      {service.description}
                    </p>

                    {/* Tag */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{
                        background: `${service.color}10`,
                        color: service.color,
                        fontFamily: 'JetBrains Mono, monospace',
                      }}>
                        {service.tag}
                      </span>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ x: 4 }}
                      >
                        <ArrowRight size={18} style={{ color: service.color }} />
                      </motion.div>
                    </div>

                    {/* Hover accent line */}
                    <motion.div
                      className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        {/* CTA */}
        <Reveal delay={0.5}>
          <div className="text-center mt-12">
            <Link href="/expertise">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
                style={{
                  border: '1.5px solid rgba(37,99,184,0.25)',
                  color: '#2563b8',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                whileHover={{ background: 'rgba(37,99,184,0.06)', scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore All Services
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
