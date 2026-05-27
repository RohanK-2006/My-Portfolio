'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Zap, Heart, Code2, Target } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'

const timeline = [
  {
    year: '2025',
    title: 'The Beginning',
    description: 'I started in 2025 with SplitMate, a simple bill-splitting app that kicked off my mobile development journey.',
    color: '#2563b8',
  },
  {
    year: '2026',
    title: 'SoulFit Launch',
    description: 'In 2026, I built SoulFit and expanded my momentum with AI-powered product experiences.',
    color: '#00b8b0',
  },
  {
    year: '2026',
    title: 'Web Development',
    description: 'Transitioned into web engineering by building this very portfolio from scratch using Next.js and modern web practices.',
    color: '#4a3fa0',
  },
  {
    year: 'Now',
    title: 'Entering the Industry',
    description: 'Ready to enter the job market as a cross-platform developer, eager to bring my skills to a forward-thinking team.',
    color: '#c9a227',
  },
]

const values = [
  {
    icon: Code2,
    title: 'Craftsmanship First',
    description: 'I treat every line of code and every pixel as an opportunity to do something exceptional.',
    color: '#2563b8',
  },
  {
    icon: Heart,
    title: 'Soul in Everything',
    description: 'Products that resonate aren\'t just functional — they feel like they were made with genuine care.',
    color: '#00b8b0',
  },
  {
    icon: Zap,
    title: 'Move with Purpose',
    description: 'I ship fast without cutting corners — balancing speed, quality, and long-term thinking.',
    color: '#4a3fa0',
  },
  {
    icon: Target,
    title: 'Outcome Obsessed',
    description: 'I measure success by the impact my work has on real people\'s lives, not just deliverables.',
    color: '#c9a227',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #e8f0ff 0%, #f0f8ff 60%, #e0fffe 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #2563b8 0%, transparent 70%)', top: '-5%', right: '5%' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-72 h-72 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #00b8b0 0%, transparent 70%)', bottom: '10%', left: '10%' }}
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-36 w-full z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
              background: 'rgba(74,63,160,0.1)',
              border: '1px solid rgba(74,63,160,0.2)',
            }}>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#4a3fa0', fontFamily: 'DM Sans, sans-serif' }}>
                About Me
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
              Hi, I&apos;m{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Rohan
              </span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
              React Native and web developer focused on clean UI, smooth performance, and products that feel effortless.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-5 mb-12">
              <div className="relative w-24 h-24">
                <Image
                  src="/assets/logos/RK.png"
                  alt="Rohan Kshatri"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p
                  className="text-4xl md:text-5xl font-bold leading-none mb-1"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}
                >
                  Rohan Kshatri
                </p>
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                  My Story
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="prose max-w-none" style={{ fontFamily: 'DM Sans, sans-serif', color: '#4a5880', lineHeight: '1.8' }}>
              <p className="text-base mb-6">
                My journey as a developer is driven by a simple belief: the best software isn't just functional — it has soul. It's the kind of product that people genuinely want to use, that feels fast, intuitive, and built with intention.
              </p>
              <p className="text-base mb-6">
                I started my major development journey by building SplitMate, a project through which I started my mobile development journey. After that, I moved on to develop my current hero app, SoulFit mobile app, which deepened my expertise in cross-platform development.
              </p>
              <p className="text-base">
                Now, I've built this personal portfolio from the ground up using Next.js to showcase my progression. I'm constantly learning new technologies, refining my craft, and looking forward to building the next great digital experience.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: 'linear-gradient(160deg, #eef2ff 0%, #f8faff 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Reveal>
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                What Drives Me
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <Reveal key={value.title} delay={i * 0.1}>
                  <motion.div
                    className="p-8 rounded-3xl"
                    style={{
                      background: 'rgba(255,255,255,0.8)',
                      border: `1.5px solid ${value.color}15`,
                      backdropFilter: 'blur(10px)',
                    }}
                    whileHover={{ y: -4, boxShadow: `0 20px 50px ${value.color}10` }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{
                      background: `${value.color}12`,
                    }}>
                      <Icon size={22} style={{ color: value.color }} />
                    </div>
                    <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
                      {value.description}
                    </p>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <Reveal>
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                The Journey
              </h2>
            </Reveal>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(180deg, #2563b8, #00b8b0, transparent)',
                transform: 'translateX(-50%)',
              }}
            />

            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.15}>
                <div className={`relative flex gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center`}>
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-16 md:pl-0`}>
                    <div
                      className="inline-block px-5 py-4 rounded-2xl"
                      style={{
                        background: `${item.color}08`,
                        border: `1.5px solid ${item.color}20`,
                      }}
                    >
                      <span className="text-xs font-mono font-bold" style={{ color: item.color, fontFamily: 'JetBrains Mono, monospace' }}>
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold mt-1 mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 top-4 w-5 h-5 rounded-full border-2 border-white z-10"
                    style={{
                      background: item.color,
                      transform: 'translateX(-50%)',
                      boxShadow: `0 0 15px ${item.color}50`,
                    }}
                  />

                  {/* Spacer for other side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
              Want to build something together?
            </h2>
            <p className="text-sm mb-8" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
              I'm selective about the projects I take on — but when I say yes, I go all in.
            </p>
            <Link href="/contact">
              <motion.button
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                  boxShadow: '0 8px 30px rgba(37,99,184,0.3)',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch
                <ArrowRight size={15} />
              </motion.button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
