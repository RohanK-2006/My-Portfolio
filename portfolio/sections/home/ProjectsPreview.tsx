'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Smartphone, Brain } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'

const projects = [
  {
    id: 'soulfit',
    name: 'SoulFit',
    tagline: 'AI-Powered Fitness',
    description: 'A comprehensive fitness companion with step, calorie, and hydration tracking. Features AI-based food scanning and personalized workouts, all powered by a seamless offline-sync architecture.',
    logo: '/assets/logos/soulfit-logo.png',
    icon: Brain,
    tech: ['React Native', 'Expo', 'Cloudflare Workers', 'D1 Database', 'Native Storage'],
    color: '#ff6b35',
    accent: '#ffd700',
    gradient: 'linear-gradient(135deg, #2a0a00 0%, #5c1a00 50%, #2a1500 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(255,107,53,0.06) 0%, rgba(255,215,0,0.04) 100%)',
    features: ['Calories tracking with AI Food Scan', 'AI Workouts', 'Step Tracking', 'Hydration Reminders'],
  },
  {
    id: 'splitmate',
    name: 'SplitMate',
    tagline: 'Expense Sharing, Simplified',
    description: 'My very first mobile app, built to make group finances effortless. Features a fully offline architecture, intuitive interface, and smart calculations for easy bill splitting.',
    logo: '/assets/logos/splitmate-logo.png',
    icon: Smartphone,
    tech: ['React Native', 'Expo SQLite', 'JavaScript'],
    color: '#7b5cfa',
    accent: '#00d4ff',
    gradient: 'linear-gradient(135deg, #1a0a40 0%, #2d1a6e 50%, #1a4060 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(123,92,250,0.06) 0%, rgba(0,212,255,0.04) 100%)',
    features: ['Fully Offline', 'Smart Splitting', 'Group Expenses', 'Intuitive UI'],
  },
]

export function ProjectsPreview() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #eef2ff 0%, #f8faff 50%, #e8fffe 100%)' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
              background: 'rgba(0,184,176,0.08)',
              border: '1px solid rgba(0,184,176,0.2)',
            }}>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#00b8b0', fontFamily: 'DM Sans, sans-serif' }}>
                Featured Projects
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
              Projects I&apos;ve{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Shipped
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
              Real products, real impact. Here&apos;s what I&apos;ve built and shipped.
            </p>
          </Reveal>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.15} direction={i % 2 === 0 ? 'left' : 'right'}>
              <motion.div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: project.bgGradient,
                  border: `1.5px solid ${project.color}20`,
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0`}>
                  {/* Content */}
                  <div className="flex-1 p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      {/* Project logo */}
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden" style={{
                        background: 'rgba(0,0,0,0.05)',
                        border: `1.5px solid ${project.color}30`,
                      }}>
                        <Image
                          src={project.logo}
                          alt={project.name}
                          fill
                          className="object-contain p-1"
                          style={{ mixBlendMode: 'multiply' }}
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                          {project.name}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: project.color, fontFamily: 'DM Sans, sans-serif' }}>
                          {project.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map(f => (
                        <span key={f} className="text-xs px-3 py-1 rounded-full font-medium" style={{
                          background: `${project.color}10`,
                          color: project.color,
                          border: `1px solid ${project.color}20`,
                          fontFamily: 'DM Sans, sans-serif',
                        }}>
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-mono" style={{
                          background: 'rgba(26,36,86,0.06)',
                          color: '#1a2456',
                          border: '1px solid rgba(26,36,86,0.1)',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link href={`/projects#${project.id}`}>
                      <motion.button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}, ${project.accent})`,
                          boxShadow: `0 8px 25px ${project.color}30`,
                          fontFamily: 'DM Sans, sans-serif',
                        } as React.CSSProperties}
                        whileHover={{ scale: 1.03, boxShadow: `0 12px 35px ${project.color}40` }}
                        whileTap={{ scale: 0.97 }}
                      >
                        View Project
                        <ArrowRight size={15} />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Visual */}
                  <div className="relative w-full md:w-72 lg:w-80 flex items-center justify-center p-10" style={{
                    background: `linear-gradient(135deg, ${project.color}08, ${project.accent}05)`,
                    borderLeft: i % 2 === 0 ? `1px solid ${project.color}15` : 'none',
                    borderRight: i % 2 !== 0 ? `1px solid ${project.color}15` : 'none',
                  }}>
                    {/* Large logo display */}
                    <motion.div
                      className="relative w-40 h-40"
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="absolute inset-0 rounded-full opacity-30 blur-2xl" style={{ background: project.color }} />
                      <Image
                        src={project.logo}
                        alt={project.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                        style={{ mixBlendMode: 'multiply', filter: 'drop-shadow(0 20px 40px ' + project.color + '50)' }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* All Projects CTA */}
        <Reveal delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/projects">
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
                All Projects
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
