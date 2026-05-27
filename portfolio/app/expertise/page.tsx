'use client'
import { motion } from 'framer-motion'
import { Smartphone, Globe, Palette, Server, Check, ArrowRight } from 'lucide-react'
import { Reveal, StaggerReveal } from '@/components/animations/Reveal'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const FloatingShapes = dynamic(
  () => import('@/components/animations/FloatingShapes').then(m => ({ default: m.FloatingShapes })),
  { ssr: false }
)

const services = [
  {
    id: 'mobile-app-development',
    icon: Smartphone,
    title: 'Mobile App Development',
    subtitle: 'iOS & Android, Perfected',
    description: 'I build cross-platform and native mobile experiences that feel as smooth as iOS and Android. From concept to App Store — every interaction is crafted with intention.',
    color: '#2563b8',
    gradient: 'linear-gradient(135deg, rgba(37,99,184,0.08), rgba(37,99,184,0.03))',
    features: [
      'React Native development',
      'Native iOS & Android options',
      'Offline-first architecture',
      'Push notifications & deep linking',
      'App Store & Play Store deployment',
      'Performance optimization',
    ],
    tech: ['React Native', 'Android', 'iOS', 'Expo'],
  },
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Development',
    subtitle: 'Fast, Scalable, Beautiful',
    description: 'Modern web applications built with Next.js, TypeScript, and battle-tested architecture. I focus on performance, accessibility, and user experience — all at once.',
    color: '#00b8b0',
    gradient: 'linear-gradient(135deg, rgba(0,184,176,0.08), rgba(0,184,176,0.03))',
    features: [
      'Next.js',
      'Full-stack TypeScript',
      'API design & integration',
      'SEO & Core Web Vitals',
      'Authentication & authorization',
      'Database design & optimization',
    ],
    tech: ['Next.js', 'TypeScript', 'NodeJS', 'Supabase'],
  },  
  {
    id: 'ui-ux-design',
    icon: Palette,
    title: 'UI/UX Design',
    subtitle: 'Clean & Simple Interfaces',
    description: 'I design straightforward and intuitive interfaces focused on what the app actually needs. No overly complex systems, just clean design that makes sense for the user.',
    color: '#4a3fa0',
    gradient: 'linear-gradient(135deg, rgba(74,63,160,0.08), rgba(74,63,160,0.03))',
    features: [
      'Basic wireframing',
      'Clean user interfaces',
      'Simple interactive prototypes',
      'Responsive design patterns',
      'Component styling',
      'User-focused layouts',
    ],
    tech: ['Figma', 'Tailwind CSS', 'Lottie'],
  },
  {
    id: 'deployment',
    icon: Server,
    title: 'Deployment & Versioning',
    subtitle: 'Reliable & Secure Hosting',
    description: 'Smooth deployment processes using industry-standard platforms. I ensure your applications are securely hosted, performant, and easily updatable through proper version control.',
    color: '#c9a227',
    gradient: 'linear-gradient(135deg, rgba(201,162,39,0.08), rgba(201,162,39,0.03))',
    features: [
      'GitHub version control',
      'Seamless platform deployment',
      'Performance monitoring',
      'Security best practices',
      'Custom domain setup',
      'Environment configuration',
    ],
    tech: ['GitHub', 'Vercel', 'Netlify', 'Cloudflare', 'App Stores'],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      {/* Hero */}
      <section
        className="relative min-h-[50vh] flex items-end pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #e8f0ff 0%, #f0f8ff 60%, #e0fffe 100%)' }}
      >
        <FloatingShapes />
        <div className="relative max-w-6xl mx-auto px-6 pt-36 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
              background: 'rgba(37,99,184,0.1)',
              border: '1px solid rgba(37,99,184,0.2)',
            }}>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#2563b8', fontFamily: 'DM Sans, sans-serif' }}>
                My Expertise
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
              What I{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Build
              </span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
              End-to-end digital craftsmanship — from product design to deployment and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services detail */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-16">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div
                  id={service.id}
                  className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 p-10 rounded-3xl`}
                  style={{
                    background: service.gradient,
                    border: `1.5px solid ${service.color}20`,
                  }}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{
                      background: `${service.color}15`,
                      border: `1.5px solid ${service.color}25`,
                    }}>
                      <Icon size={28} style={{ color: service.color }} />
                    </div>
                    <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: service.color, fontFamily: 'DM Sans, sans-serif' }}>
                      {service.subtitle}
                    </p>
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                      {service.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-8" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {service.tech.map(t => (
                        <span key={t} className="text-xs px-3 py-1 rounded-lg font-mono" style={{
                          background: `${service.color}10`,
                          color: service.color,
                          border: `1px solid ${service.color}20`,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
                      Core Expertise
                    </h3>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, fi) => (
                        <motion.li
                          key={feature}
                          className="flex items-center gap-3 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: fi * 0.08 }}
                          style={{ fontFamily: 'DM Sans, sans-serif', color: '#2a3a60' }}
                        >
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{
                            background: `${service.color}15`,
                          }}>
                            <Check size={11} style={{ color: service.color }} />
                          </div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <motion.button
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
                          fontFamily: 'DM Sans, sans-serif',
                        } as React.CSSProperties}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Get in Touch
                        <ArrowRight size={15} />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
              Not sure what you need?
            </h2>
            <p className="text-sm mb-8" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
              Let's have a conversation. I&apos;ll help you figure out the right approach.
            </p>
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 rounded-2xl text-white font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                  boxShadow: '0 8px 30px rgba(37,99,184,0.3)',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Talk
              </motion.button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
