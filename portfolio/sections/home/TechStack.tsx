'use client'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'

const techStack = [
  { name: 'React Native', color: '#61dafb', category: 'Mobile' },
  { name: 'Next.js', color: '#000000', category: 'Web' },
  { name: 'TypeScript', color: '#3178c6', category: 'Language' },
  { name: 'Expo', color: '#3776ab', category: 'Mobile' },
  { name: 'Firebase', color: '#ffca28', category: 'Backend' },
  { name: 'Supabase', color: '#336791', category: 'Database' },
  { name: 'TailwindCSS', color: '#06b6d4', category: 'Styling' },
  { name: 'NodeJS', color: '#339933', category: 'Backend' },
  { name: 'Figma', color: '#f24e1e', category: 'Design' },
  { name: 'Play Store/App Store', color: '#000000', category: 'Deploy' },
  { name: 'Cloudflare', color: '#f38020', category: 'Infra' },
  { name: 'Vercel', color: '#000000', category: 'Deploy' },
]

export function TechStack() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#f8faff' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
              My{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Tech Stack
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
              Battle-tested tools I use to ship production-grade products
            </p>
          </Reveal>
        </div>

        {/* Infinite scroll row */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
            {[...techStack, ...techStack].map((tech, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl whitespace-nowrap"
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: '1.5px solid rgba(37,99,184,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ y: -4, boxShadow: `0 10px 30px ${tech.color}20`, scale: 1.04 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: tech.color }} />
                <span className="text-sm font-medium" style={{ color: '#1a2456', fontFamily: 'DM Sans, sans-serif' }}>
                  {tech.name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                  background: `${tech.color}15`,
                  color: tech.color,
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {tech.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Second row reversed */}
        <div className="relative overflow-hidden mt-4">
          <div className="flex gap-4 animate-marquee-reverse" style={{ width: 'max-content' }}>
            {[...techStack.slice(4), ...techStack, ...techStack.slice(0, 4)].map((tech, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl whitespace-nowrap"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  border: '1.5px solid rgba(0,184,176,0.1)',
                }}
                whileHover={{ y: -4, boxShadow: `0 10px 30px ${tech.color}20`, scale: 1.04 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: tech.color }} />
                <span className="text-sm font-medium" style={{ color: '#1a2456', fontFamily: 'DM Sans, sans-serif' }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
