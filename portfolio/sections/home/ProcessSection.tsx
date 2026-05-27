'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Search, Lightbulb, Code2, Rocket, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description:
      'I deep-dive into your product vision, user needs, and competitive landscape. This isn\'t a brief call — it\'s a genuine exploration to understand what you\'re building and why.',
    color: '#2563b8',
    deliverable: 'Project Scope + Strategy Doc',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Design',
    description:
      'UI/UX wireframes, interactive prototypes, and design systems.',
    color: '#00b8b0',
    deliverable: 'Design System',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Build',
    description:
      'Sprints of two weeks, with demos after each. Clean, documented code with automated tests. I keep you in the loop every step — no black boxes.',
    color: '#4a3fa0',
    deliverable: 'Working Software + Test Suite',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch',
    description:
      'Deployment, App Store submission, monitoring setup, and performance tuning.',
    color: '#c9a227',
    deliverable: 'Live Product',
  },
]

export function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(lineRef, { once: true, margin: '-100px' })

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#f8faff' }}
    >
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,184,176,0.3), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(74,63,160,0.08)',
                border: '1px solid rgba(74,63,160,0.18)',
              }}
            >
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#4a3fa0', fontFamily: 'DM Sans, sans-serif' }}
              >
                How I Work
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}
            >
              The {' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Process
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              className="text-base max-w-lg mx-auto"
              style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}
            >
              A proven 4-step framework that turns ideas into polished, production-ready products.
            </p>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px" ref={lineRef}>
            <motion.div
              className="h-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #2563b8, #00b8b0, #4a3fa0, #c9a227)',
                scaleX: isInView ? 1 : 0,
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal key={step.number} delay={i * 0.12} direction="up">
                  <div className="flex flex-col relative">
                    {/* Mobile connecting arrow */}
                    {i < steps.length - 1 && (
                      <div className="lg:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
                        <ArrowRight
                          size={16}
                          style={{ color: step.color, transform: 'rotate(90deg)' }}
                        />
                      </div>
                    )}

                    {/* Icon circle */}
                    <div className="relative mb-6 flex justify-center lg:justify-start">
                      <motion.div
                        className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `${step.color}12`,
                          border: `2px solid ${step.color}30`,
                          zIndex: 10,
                        }}
                        whileHover={{
                          scale: 1.1,
                          background: `${step.color}20`,
                          boxShadow: `0 8px 30px ${step.color}25`,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon size={24} style={{ color: step.color }} />
                        {/* Step number badge */}
                        <div
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white"
                          style={{
                            background: step.color,
                            fontSize: '10px',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontWeight: 700,
                          }}
                        >
                          {i + 1}
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="text-center lg:text-left">
                      <div
                        className="text-xs font-mono font-bold mb-1"
                        style={{ color: step.color, fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {step.number}
                      </div>
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {step.description}
                      </p>

                      {/* Deliverable tag */}
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{
                          background: `${step.color}08`,
                          border: `1px solid ${step.color}20`,
                          color: step.color,
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        <span className="text-xs">✓</span>
                        {step.deliverable}
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
