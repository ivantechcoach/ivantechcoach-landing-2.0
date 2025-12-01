'use client'

import { useState, FormEvent } from 'react'
import { Send, Mail, MessageSquare } from 'lucide-react'

interface ContactProps {
  content: {
    title: string
    subtitle: string
    description: string
    form: {
      name: string
      email: string
      message: string
      submit: string
      sending: string
      success: string
      error: string
    }
  }
}

export default function Contact({ content }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    // Simulate API call - Replace with your actual endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-[color-mix(in srgb, var(--bg) 96%, black)]"
      aria-labelledby="contact-title"
    >
      {/* Separador superior */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-[var(--bg)] opacity-40"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2
              id="contact-title"
              className="tracking-tight leading-tight text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-4"
            >
              {content.title}
            </h2>
            <p className="text-lg text-[var(--text)]/70 mb-4">{content.subtitle}</p>
            <p className="text-base text-[var(--text)]/80">{content.description}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-strong rounded-2xl p-8 md:p-12"
            noValidate
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--text)]/80 mb-2"
                >
                  {content.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full glass px-4 py-3 rounded-lg text-[var(--text)] placeholder-[var(--text)]/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder={content.form.name}
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--text)]/80 mb-2"
                >
                  {content.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full glass px-4 py-3 rounded-lg text-[var(--text)] placeholder-[var(--text)]/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder={content.form.email}
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--text)]/80 mb-2"
                >
                  {content.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full glass px-4 py-3 rounded-lg text-[var(--text)] placeholder-[var(--text)]/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                  placeholder={content.form.message}
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full glass-strong px-8 py-4 rounded-lg text-[var(--text)] font-semibold hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
              >
                {status === 'sending' ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    {content.form.sending}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" />
                    {content.form.submit}
                  </>
                )}
              </button>

              {status === 'success' && (
                <div
                  className="glass-strong border border-green-500/50 bg-green-500/10 px-4 py-3 rounded-lg text-green-400 text-center"
                  role="alert"
                  aria-live="polite"
                >
                  {content.form.success}
                </div>
              )}

              {status === 'error' && (
                <div
                  className="glass-strong border border-red-500/50 bg-red-500/10 px-4 py-3 rounded-lg text-red-400 text-center"
                  role="alert"
                  aria-live="polite"
                >
                  {content.form.error}
                </div>
              )}
            </div>
          </form>

          {/* Contact info */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center text-[var(--text)]/70">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
              <span>contacto@ivantechcoach.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
              <span>Disponible para consultas</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Separador inferior */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-transparent to-[var(--bg)] opacity-40"></div>
    </section>
  )
}

