'use client'

import { useState, FormEvent } from 'react'
import { Send, Mail, MessageSquare } from 'lucide-react'

interface ContactFormProps {
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
  lang: string
}

export default function ContactForm({ content, lang }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; message?: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = lang === 'es' ? 'El nombre es requerido' : 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = lang === 'es' ? 'El nombre debe tener al menos 2 caracteres' : 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = lang === 'es' ? 'El email es requerido' : 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = lang === 'es' ? 'Email inválido' : 'Invalid email'
    }

    if (!formData.message.trim()) {
      newErrors.message = lang === 'es' ? 'El mensaje es requerido' : 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = lang === 'es' ? 'El mensaje debe tener al menos 10 caracteres' : 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = lang === 'es' ? 'El mensaje no puede exceder 2000 caracteres' : 'Message cannot exceed 2000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setStatus('sending')
    setErrors({})

    // Simulate API call - Replace with your actual endpoint
    try {
      // Sanitize inputs (basic sanitization)
      const sanitizedData = {
        name: formData.name.trim().substring(0, 100),
        email: formData.email.trim().toLowerCase().substring(0, 255),
        message: formData.message.trim().substring(0, 2000),
      }

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
      className="relative section-padding bg-[var(--bg)] text-[var(--text)]"
      aria-labelledby="contact-title"
    >
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2
              id="contact-title"
              className="tracking-tight leading-tight text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-4"
            >
              {content.title}
            </h2>
            <p className="text-lg text-[var(--text-soft)] mb-4">{content.subtitle}</p>
            <p className="text-base text-[var(--text-soft)]">{content.description}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 md:p-12 shadow-lg"
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
                  className={`w-full bg-[var(--card)] border border-[var(--border)] px-4 py-3 rounded-lg text-[var(--text)] placeholder-[var(--text-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-500/50' : ''
                  }`}
                  placeholder={content.form.name}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
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
                  className={`w-full bg-[var(--card)] border border-[var(--border)] px-4 py-3 rounded-lg text-[var(--text)] placeholder-[var(--text-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500/50' : ''
                  }`}
                  placeholder={content.form.email}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
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
                  maxLength={2000}
                  className={`w-full bg-[var(--card)] border border-[var(--border)] px-4 py-3 rounded-lg text-[var(--text)] placeholder-[var(--text-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200 resize-none ${
                    errors.message ? 'border-red-500/50' : ''
                  }`}
                  placeholder={content.form.message}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message && (
                    <p id="message-error" className="text-sm text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                  <span className={`text-xs ml-auto ${formData.message.length > 1800 ? 'text-red-400' : 'text-[var(--text-soft)]'}`}>
                    {formData.message.length}/2000
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-[var(--primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary-dark)] border border-[var(--primary)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
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
                  className="bg-[var(--card)] border border-green-500/50 bg-green-500/10 px-4 py-3 rounded-lg text-green-400 text-center"
                  role="alert"
                  aria-live="polite"
                >
                  {content.form.success}
                </div>
              )}

              {status === 'error' && (
                <div
                  className="bg-[var(--card)] border border-red-500/50 bg-red-500/10 px-4 py-3 rounded-lg text-red-400 text-center"
                  role="alert"
                  aria-live="polite"
                >
                  {content.form.error}
                </div>
              )}
            </div>
          </form>

          {/* Contact info */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center text-[var(--text-soft)]">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
              <span>contacto@ivantechcoach.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
              <span>{lang === 'es' ? 'Disponible para consultas' : 'Available for inquiries'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
