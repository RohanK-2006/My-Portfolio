'use client'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Zap, Code2, Award } from 'lucide-react'

const stats = [
  {
    icon: Code2,
    value: 2,
    suffix: '+',
    label: 'Projects Shipped',
    description: 'From MVPs to full-scale platforms',
    color: '#1a4585',
  },
  {
    icon: Zap,
    value: 3,
    suffix: 'mo',
    label: 'Avg. Launch Time',
    description: 'Concept to live product',
    color: '#4a3fa0',
  },
  {
    icon: Award,
    value: 2,
    suffix: '+',
    label: 'Live Products',
    description: 'Apps/Websites used by real people',
    color: '#c9a227',
  },
]

export function StatsSection() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a2456 0%, #2563b8 50%, #0a3a50 100%)',
      }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-3xl"
        style={{ background: '#00b8b0' }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Reveal key={stat.label} delay={i * 0.1} direction="up">
                <motion.div
                  className="text-center p-6 rounded-3xl"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{
                    background: 'rgba(255,255,255,0.12)',
                    y: -4,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{
                      background: `${stat.color}25`,
                      border: `1px solid ${stat.color}40`,
                    }}
                  >
                    <Icon size={22} style={{ color: stat.color }} />
                  </div>

                  {/* Number */}
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      color: 'white',
                    }}
                  >
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={1800}
                    />
                  </div>

                  {/* Label */}
                  <div
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {stat.description}
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
