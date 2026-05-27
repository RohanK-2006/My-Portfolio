'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowRight, Smartphone, Brain, Check, ExternalLink, Monitor, Download, Compass, Github } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'

const projects = [
  {
    id: 'soulfit',
    name: 'SoulFit',
    tagline: 'AI-Powered Fitness',
    shortDesc: 'My flagship HERO app: a highly secure, AI-powered fitness ecosystem built for scale.',
    fullDesc: 'SoulFit is my flagship hero application. It is a comprehensive fitness companion offering step, calorie, and hydration tracking with smart reminders. It features AI-based food scanning and personalized workouts. Engineered like a top-tier professional app, it boasts a scalable backend using Cloudflare Workers and D1, robust offline sync with native storage, and top-notch security measures including biometric app locks and API rate limiting.',
    logo: '/assets/logos/soulfit-logo.png',
    icon: Brain,
    tech: ['React Native', 'Expo', 'Cloudflare Workers', 'D1', 'Native Storage'],
    color: '#ff6b35',
    accent: '#ffd700',
    lightBg: 'linear-gradient(135deg, rgba(255,107,53,0.06) 0%, rgba(255,215,0,0.04) 100%)',
    darkBg: 'linear-gradient(135deg, #2a0800 0%, #5c1a00 50%, #2a1500 100%)',
    features: [
      'AI food scanning & personalized workouts',
      'Step, calorie & hydration tracking with reminders',
      'Advanced security with biometric app lock',
      'Cloudflare edge backend with API rate limiting',
      'Robust offline-sync native storage architecture',
      'Highly scalable, professional-grade infrastructure',
    ],
    category: 'Mobile App + AI',
    status: 'Live',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.rohan_kshatri.SoulFit',
  },
  {
    id: 'careerx',
    name: 'CareerX',
    tagline: 'AI-Powered Learning Roadmaps',
    shortDesc: 'An intelligent roadmap generator providing week-by-week tasks and progress tracking.',
    fullDesc: 'CareerX is a smart educational application designed to generate personalized learning roadmaps based on an uploaded syllabus and the user\'s preferred skills. It completely automates study planning by offering week-wise actionable tasks, integrated progress tracking, and regular assessments. Built with strict adherence to mobile architectural best practices for a scalable frontend and backend ecosystem.',
    logo: '/assets/logos/CareerXLogo.png',
    icon: Compass,
    tech: ['React Native', 'Expo', 'Supabase', 'AI'],
    color: '#00b8b0',
    accent: '#2563b8',
    lightBg: 'linear-gradient(135deg, rgba(0,184,176,0.06) 0%, rgba(37,99,184,0.04) 100%)',
    darkBg: 'linear-gradient(135deg, #001a18 0%, #0f2a4a 50%, #09152b 100%)',
    features: [
      'AI-driven custom syllabus roadmap generation',
      'Week-wise task distribution and scheduling',
      'Interactive progress tracking and skill mapping',
      'Built-in periodic skill assessments',
      'Strict adherence to mobile architectural best practices',
    ],
    category: 'Mobile App + AI',
    status: 'Open Source',
    githubUrl: 'https://github.com/RohanK-2006/CareerX',
  },
  {
    id: 'splitmate',
    name: 'SplitMate',
    tagline: 'Expense Sharing, Simplified',
    shortDesc: 'My very first mobile app, built to make group finances effortless.',
    fullDesc: 'SplitMate is my foundational mobile application built to reimagine how groups manage shared expenses without relying on server connectivity. Featuring a fully offline architecture, it provides an intuitive, highly engaging interface with Lottie animations that makes settling bills completely frictionless. Built with React Native to ensure smooth performance.',
    logo: '/assets/logos/splitmate-logo.png',
    icon: Smartphone,
    tech: ['React Native', 'Expo', 'SQLite', 'Lottie', 'JavaScript'],
    color: '#7b5cfa',
    accent: '#00d4ff',
    lightBg: 'linear-gradient(135deg, rgba(123,92,250,0.06) 0%, rgba(0,212,255,0.04) 100%)',
    darkBg: 'linear-gradient(135deg, #1a0a40 0%, #2d1a6e 50%, #0a2040 100%)',
    features: [
      'Fully offline architecture via SQLite native storage',
      'Smart splitting algorithms for groups',
      'User engaging interface with Lottie animations',
      'Seamless multi-group expense tracking',
      'Intuitive and responsive UI design',
    ],
    category: 'Mobile App',
    status: 'Live',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.rohan_kshatri.SplitMate',
  },
  {
    id: 'rk-portfolio',
    name: 'RK Portfolio',
    tagline: 'Interactive Developer Portfolio',
    shortDesc: 'A modern, highly interactive portfolio website built to showcase my development journey.',
    fullDesc: 'RK Portfolio is my personal developer portfolio, designed with a focus on immersive user experiences and clean aesthetics. It leverages Next.js for robust routing, Tailwind CSS for utility-first styling, and Framer Motion for fluid, physics-based animations. The site serves as a live demonstration of my frontend skills and design sensibilities.',
    logo: '/assets/logos/RK.png',
    icon: Monitor,
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    color: '#10b981',
    accent: '#0ea5e9',
    lightBg: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(14,165,233,0.04) 100%)',
    darkBg: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #020617 100%)',
    features: [
      'Interactive physics-based animations with Framer Motion',
      'Modern glassmorphism UI and responsive design',
      'Optimized performance using Next.js App Router',
      'Scalable and type-safe architecture with TypeScript',
    ],
    category: 'Web Application',
    status: 'Live',
  },
]

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 backdrop-blur-md"
        style={{ background: 'rgba(10,15,40,0.7)' }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative max-w-2xl w-full rounded-3xl overflow-hidden z-10"
        data-lenis-prevent
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
        onWheel={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="relative p-8" style={{ background: project.darkBg }}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <Image src={project.logo} alt={project.name} fill className="object-contain p-2" style={{ mixBlendMode: 'lighten' }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{
                  background: `${project.color}30`,
                  color: project.color,
                  fontFamily: 'DM Sans, sans-serif',
                }}>
                  {project.status}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'DM Sans, sans-serif',
                }}>
                  {project.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                {project.name}
              </h2>
              <p className="text-sm" style={{ color: project.color, fontFamily: 'DM Sans, sans-serif' }}>
                {project.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8" style={{ background: 'white' }}>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
            {project.fullDesc}
          </p>

          <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
            Key Features
          </h3>
          <ul className="space-y-2 mb-8">
            {project.features.map(f => (
              <li key={f} className="flex items-start gap-3 text-sm" style={{ color: '#2a3a60', fontFamily: 'DM Sans, sans-serif' }}>
                <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                {f}
              </li>
            ))}
          </ul>

          <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map(t => (
              <span key={t} className="text-xs px-3 py-1 rounded-lg font-mono" style={{
                background: `${project.color}08`,
                color: project.color,
                border: `1px solid ${project.color}20`,
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                {t}
              </span>
            ))}
          </div>

          <Link href="/contact">
            <motion.button
              className="w-full py-3.5 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.accent})`,
                fontFamily: 'DM Sans, sans-serif',
              } as React.CSSProperties}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
            >
              Let&apos;s Build Something Similar
              <ArrowRight size={15} />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null)

  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>

      {/* Hero */}
      <section
        className="relative min-h-[40vh] flex items-end pb-16"
        style={{ background: 'linear-gradient(160deg, #e8f0ff 0%, #f0f8ff 60%, #e0fffe 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-6 pt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
              background: 'rgba(0,184,176,0.1)',
              border: '1px solid rgba(0,184,176,0.2)',
            }}>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#00b8b0', fontFamily: 'DM Sans, sans-serif' }}>
                My Work
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
              Projects I&apos;ve{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Shipped
              </span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
              Real products. Real users. Real impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.15}>
                <div className="h-full">
                <motion.div
                  id={project.id}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group flex flex-col h-full"
                  style={{
                    background: project.lightBg,
                    border: `1.5px solid ${project.color}20`,
                  }}
                  whileHover={{ y: -6, boxShadow: `0 30px 60px ${project.color}15` }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveProject(project)}
                >
                  {/* Visual header */}
                  <div className="relative h-48 flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: project.darkBg }}>
                    <motion.div
                      className="relative w-28 h-28"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: project.color }} />
                      <Image
                        src={project.logo}
                        alt={project.name}
                        fill
                        className="object-contain"
                        style={{ mixBlendMode: 'lighten', filter: `drop-shadow(0 15px 30px ${project.color}60)` }}
                      />
                    </motion.div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
                    >
                      <div className="text-white text-sm font-medium flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        View Details <ExternalLink size={14} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{
                          background: `${project.color}12`,
                          color: project.color,
                          fontFamily: 'DM Sans, sans-serif',
                        }}>
                          ✦ {project.status}
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-full" style={{
                          background: 'rgba(26,36,86,0.06)',
                          color: '#8b9cb8',
                          fontFamily: 'DM Sans, sans-serif',
                        }}>
                          {project.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {('githubUrl' in project && project.githubUrl) && (
                          <a 
                            href={project.githubUrl as string} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // Prevent opening modal when clicking the link
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full transition-all z-10 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(26,36,86,0.1)',
                              color: '#1a2456',
                            }}
                            title="View Source on GitHub"
                          >
                            <Github size={14} />
                            <span className="text-xs font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>GitHub</span>
                          </a>
                        )}
                        
                        {('playStoreUrl' in project && project.playStoreUrl) && (
                          <a 
                            href={project.playStoreUrl as string} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // Prevent opening modal when clicking the link
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full transition-all z-10 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(26,36,86,0.1)',
                              color: '#1a2456',
                            }}
                            title="Get it on Google Play"
                          >
                            <Download size={14} />
                            <span className="text-xs font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>Play Store</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                      {project.name}
                    </h3>
                    <p className="text-sm font-medium mb-3" style={{ color: project.color, fontFamily: 'DM Sans, sans-serif' }}>
                      {project.tagline}
                    </p>
                    <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
                      {project.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-mono" style={{
                          background: 'rgba(26,36,86,0.06)',
                          color: '#1a2456',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}>
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs px-2.5 py-1 rounded-lg font-mono" style={{
                          background: 'rgba(26,36,86,0.06)',
                          color: '#8b9cb8',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}>
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all mt-auto" style={{ color: project.color, fontFamily: 'DM Sans, sans-serif' }}>
                      View Case Study <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
