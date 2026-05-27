'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, AlertCircle, Wifi, WifiOff, Mail, MessageCircle, User, FileText } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { MagneticButton } from '@/components/ui/MagneticButton'

// ─── Config ────────────────────────────────────────────────────────────────
// Replace with your actual Cloudflare Worker URL after deployment
const WORKER_URL = 'https://portfolio-worker.soulcord-dynamics.workers.dev'

// ─── Types ─────────────────────────────────────────────────────────────────
interface FormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string // spam protection - must be empty
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type Status = 'idle' | 'loading' | 'success' | 'error' | 'offline'

// ─── Validation ──────────────────────────────────────────────────────────────
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) errors.name = 'Name is required'
  else if (data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
  else if (data.name.trim().length > 80) errors.name = 'Name must be under 80 characters'

  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errors.email = 'Enter a valid email address'

  if (!data.subject.trim()) errors.subject = 'Subject is required'
  else if (data.subject.trim().length < 4) errors.subject = 'Subject must be at least 4 characters'
  else if (data.subject.trim().length > 120) errors.subject = 'Subject must be under 120 characters'

  if (!data.message.trim()) errors.message = 'Message is required'
  else if (data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters'
  else if (data.message.trim().length > 2000) errors.message = 'Message must be under 2000 characters'

  return errors
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').replace(/javascript:/gi, '').trim()
}

// ─── Debounce hook ────────────────────────────────────────────────────────────
function useDebounce<T extends (...args: Parameters<T>) => void>(fn: T, delay: number): T {
  const timer = useRef<ReturnType<typeof setTimeout>>()
  return useCallback((...args: Parameters<T>) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => fn(...args), delay)
  }, [fn, delay]) as T
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', subject: '', message: '', honeypot: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const lastSubmit = useRef<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check
    if (formData.honeypot) return

    // Debounce: prevent double submission within 3s
    const now = Date.now()
    if (now - lastSubmit.current < 3000) return
    lastSubmit.current = now

    // Offline check
    if (!navigator.onLine) {
      setStatus('offline')
      return
    }

    // Validate
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')
    setErrors({})

    // Sanitize payload
    const payload = {
      name: sanitize(formData.name),
      email: sanitize(formData.email),
      subject: sanitize(formData.subject),
      message: sanitize(formData.message),
    }

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      clearTimeout(timeout)

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' })
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setStatus('error')
        setErrorMessage('Request timed out. Please check your connection and try again.')
      } else if (!navigator.onLine) {
        setStatus('offline')
      } else {
        setStatus('error')
        setErrorMessage('Failed to send message. Please try again.')
      }
    }
  }

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-5 py-4 rounded-2xl text-sm transition-all duration-200 outline-none resize-none`

  const inputStyle = (field: keyof FormErrors) => ({
    background: errors[field] ? 'rgba(239,68,68,0.04)' : 'rgba(255,255,255,0.8)',
    border: `1.5px solid ${errors[field] ? 'rgba(239,68,68,0.4)' : 'rgba(37,99,184,0.15)'}`,
    color: '#1a2456',
    fontFamily: 'DM Sans, sans-serif',
    backdropFilter: 'blur(10px)',
  })

  const focusStyle = `focus:border-[rgba(37,99,184,0.5)] focus:shadow-[0_0_0_4px_rgba(37,99,184,0.08)]`

  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      {/* Hero */}
      <section
        className="relative min-h-[40vh] flex items-end pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #e8f0ff 0%, #f0f8ff 60%, #e0fffe 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-6 pt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
              background: 'rgba(0,184,176,0.1)',
              border: '1px solid rgba(0,184,176,0.2)',
            }}>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#00b8b0', fontFamily: 'DM Sans, sans-serif' }}>
                Contact Me
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
              Let&apos;s{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Connect
              </span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
              Have a project in mind? I&apos;d love to hear about it.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left info */}
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                  Get in Touch
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
                  Whether you have a project idea, a question, or just want to say hi — I read every message and reply within 24 hours.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'rohan.kshatri2006@gmail.com', color: '#2563b8' },
                    { icon: MessageCircle, label: 'Response Time', value: 'Within 24 hours', color: '#00b8b0' },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex items-center gap-4 p-5 rounded-2xl" style={{
                      background: 'rgba(255,255,255,0.8)',
                      border: '1.5px solid rgba(37,99,184,0.1)',
                    }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                        background: `${color}12`,
                      }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>{label}</p>
                        <p className="text-sm font-medium" style={{ color: '#1a2456', fontFamily: 'DM Sans, sans-serif' }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Reveal delay={0.15}>
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="rounded-3xl p-12 text-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,184,176,0.08), rgba(37,99,184,0.05))',
                        border: '1.5px solid rgba(0,184,176,0.25)',
                      }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ background: 'linear-gradient(135deg, #2563b8, #00b8b0)' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                      >
                        <Check size={32} color="white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1a2456' }}>
                        Message Received!
                      </h3>
                      <p className="text-sm mb-8" style={{ color: '#4a5880', fontFamily: 'DM Sans, sans-serif' }}>
                        Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                      </p>
                      <MagneticButton
                        className="px-6 py-3 rounded-xl text-sm font-semibold"
                        style={{
                          background: 'linear-gradient(135deg, #2563b8, #00b8b0)',
                          color: 'white',
                          fontFamily: 'DM Sans, sans-serif',
                        } as React.CSSProperties}
                        onClick={() => setStatus('idle')}
                      >
                        Send Another Message
                      </MagneticButton>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="rounded-3xl p-8"
                      style={{
                        background: 'rgba(255,255,255,0.7)',
                        border: '1.5px solid rgba(37,99,184,0.12)',
                        backdropFilter: 'blur(20px)',
                      }}
                      noValidate
                    >
                      {/* Honeypot - hidden from real users */}
                      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                        <input
                          type="text"
                          name="honeypot"
                          value={formData.honeypot}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {/* Offline banner */}
                      <AnimatePresence>
                        {status === 'offline' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-3 p-4 rounded-xl mb-6"
                            style={{ background: 'rgba(234,179,8,0.1)', border: '1.5px solid rgba(234,179,8,0.3)' }}
                          >
                            <WifiOff size={16} style={{ color: '#b45309' }} />
                            <span className="text-sm" style={{ color: '#b45309', fontFamily: 'DM Sans, sans-serif' }}>
                              No internet connection. Please check and try again.
                            </span>
                          </motion.div>
                        )}
                        {status === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-3 p-4 rounded-xl mb-6"
                            style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.25)' }}
                          >
                            <AlertCircle size={16} style={{ color: '#dc2626' }} />
                            <span className="text-sm" style={{ color: '#dc2626', fontFamily: 'DM Sans, sans-serif' }}>
                              {errorMessage}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Name */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold mb-2" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
                            <User size={12} /> Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={`${inputClass('name')} ${focusStyle}`}
                            style={inputStyle('name') as React.CSSProperties}
                            aria-label="Your name"
                            autoComplete="name"
                          />
                          {errors.name && (
                            <p className="text-xs mt-1" style={{ color: '#dc2626', fontFamily: 'DM Sans, sans-serif' }}>{errors.name}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold mb-2" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
                            <Mail size={12} /> Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={`${inputClass('email')} ${focusStyle}`}
                            style={inputStyle('email') as React.CSSProperties}
                            aria-label="Your email"
                            autoComplete="email"
                          />
                          {errors.email && (
                            <p className="text-xs mt-1" style={{ color: '#dc2626', fontFamily: 'DM Sans, sans-serif' }}>{errors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="mb-4">
                        <label className="flex items-center gap-1.5 text-xs font-semibold mb-2" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
                          <FileText size={12} /> Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What's this about?"
                          className={`${inputClass('subject')} ${focusStyle}`}
                          style={inputStyle('subject') as React.CSSProperties}
                          aria-label="Message subject"
                        />
                        {errors.subject && (
                          <p className="text-xs mt-1" style={{ color: '#dc2626', fontFamily: 'DM Sans, sans-serif' }}>{errors.subject}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="mb-6">
                        <label className="flex items-center gap-1.5 text-xs font-semibold mb-2" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
                          <MessageCircle size={12} /> Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project, idea, or question..."
                          rows={5}
                          className={`${inputClass('message')} ${focusStyle}`}
                          style={inputStyle('message') as React.CSSProperties}
                          aria-label="Your message"
                        />
                        <div className="flex justify-between mt-1">
                          {errors.message ? (
                            <p className="text-xs" style={{ color: '#dc2626', fontFamily: 'DM Sans, sans-serif' }}>{errors.message}</p>
                          ) : <span />}
                          <span className="text-xs" style={{ color: '#8b9cb8', fontFamily: 'DM Sans, sans-serif' }}>
                            {formData.message.length}/2000
                          </span>
                        </div>
                      </div>

                      {/* Submit */}
                      <MagneticButton
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                        style={{
                          background: status === 'loading'
                            ? 'linear-gradient(135deg, #94a3b8, #94a3b8)'
                            : 'linear-gradient(135deg, #2563b8, #00b8b0)',
                          boxShadow: status === 'loading' ? 'none' : '0 8px 30px rgba(37,99,184,0.3)',
                          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                          fontFamily: 'DM Sans, sans-serif',
                        } as React.CSSProperties}
                      >
                        {status === 'loading' ? (
                          <>
                            <motion.div
                              className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={15} />
                          </>
                        )}
                      </MagneticButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
