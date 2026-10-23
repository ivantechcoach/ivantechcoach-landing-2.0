'use client'

import { useState, FormEvent } from 'react'
import { Send, Mail, MessageSquare, Terminal, ShieldCheck, MapPin } from 'lucide-react'

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
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; message?: string } = {}

    if (!formData.name.trim()) {
      newErrors.name =
        lang === 'en'
          ? 'Name is required'
          : lang === 'ca'
            ? 'El nom és obligatori'
            : 'El nombre es requerido'
    } else if (formData.name.trim().length < 2) {
      newErrors.name =
        lang === 'en'
          ? 'Name must be at least 2 characters'
          : lang === 'ca'
            ? 'El nom ha de tenir almenys 2 caràcters'
            : 'El nombre debe tener al menos 2 caracteres'
    }

    if (!formData.email.trim()) {
      newErrors.email =
        lang === 'en'
          ? 'Email is required'
          : lang === 'ca'
            ? "L'email és obligatori"
            : 'El email es requerido'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        lang === 'en'
          ? 'Invalid email'
          : lang === 'ca'
            ? 'Email invàlid'
            : 'Email inválido'
    }

    if (!formData.message.trim()) {
      newErrors.message =
        lang === 'en'
          ? 'Message is required'
          : lang === 'ca'
            ? 'El missatge és obligatori'
            : 'El mensaje es requerido'
    } else if (formData.message.trim().length < 10) {
      newErrors.message =
        lang === 'en'
          ? 'Message must be at least 10 characters'
          : lang === 'ca'
            ? 'El missatge ha de tenir almenys 10 caràcters'
            : 'El mensaje debe tener al menos 10 caracteres'
    } else if (formData.message.trim().length > 2000) {
      newErrors.message =
        lang === 'en'
          ? 'Message cannot exceed 2000 characters'
          : lang === 'ca'
            ? 'El missatge no pot superar els 2000 caràcters'
            : 'El mensaje no puede exceder 2000 caracteres'
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

    try {
      // Sanitize inputs (basic sanitization)
      const sanitizedData = {
        name: formData.name.trim().substring(0, 100),
        email: formData.email.trim().toLowerCase().substring(0, 255),
        message: formData.message.trim().substring(0, 2000),
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Error sending message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error sending message'
      setErrorMessage(errorMsg)
      setStatus('error')
      if (process.env.NODE_ENV === 'development') {
        console.error('[ContactForm] Network Error:', error)
      }
      setTimeout(() => {
        setStatus('idle')
        setErrorMessage('')
      }, 5000)
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

  const eyebrow =
    lang === 'en'
      ? '[SYS-CONTACT // DIRECT TECHNICAL & AI DIAGNOSTIC]'
      : lang === 'ca'
        ? '[SYS-CONTACT // CANAL DE DIAGNÒSTIC TÈCNIC I IA]'
        : '[SYS-CONTACT // CANAL DE DIAGNÓSTICO TÉCNICO E IA]'

  const consoleHeader =
    lang === 'en'
      ? 'DIAGNOSTIC TRANSMISSION CONSOLE // TLS ENCRYPTED'
      : lang === 'ca'
        ? 'CONSOLA DE TRANSMISSIÓ DE DIAGNÒSTIC // TLS XIFRAT'
        : 'CONSOLA DE TRANSMISIÓN DE DIAGNÓSTICO // TLS CIFRADO'

  const statusLabel =
    lang === 'en'
      ? 'NODE ONLINE · 95% FCR'
      : lang === 'ca'
        ? 'NODE ACTIU · 95% FCR'
        : 'NODO ACTIVO · 95% FCR'

  return (
    <section
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-transparent text-[var(--text)]"
      aria-labelledby="contact-title"
    >
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header Dossier */}
          <div className="mb-10 space-y-3">
            <span className="telemetry-eyebrow">{eyebrow}</span>
            <h1
              id="contact-title"
              className="tracking-[-0.03em] leading-tight text-4xl md:text-5xl font-bold text-[var(--text)]"
            >
              {content.title}
            </h1>
            <p className="text-lg font-medium text-[var(--primary)]">
              {content.subtitle}
            </p>
            <p className="text-base text-[var(--text-soft)] leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Blueprint Console Card */}
          <div className="blueprint-card overflow-hidden">
            {/* Console Top Chrome */}
            <div className="px-6 py-3.5 bg-[var(--card-elevated)] border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Terminal
                  size={14}
                  className="text-[var(--primary)]"
                  aria-hidden="true"
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[var(--text-soft)]">
                  {consoleHeader}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg)] text-[var(--primary)] border border-[var(--border)]">
                {statusLabel}
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 md:p-10"
              noValidate
            >
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--text)]"
                    >
                      {content.form.name}
                    </label>
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]"
                      aria-hidden="true"
                    >
                      [FIELD // 01]
                    </span>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-500/60' : ''
                    }`}
                    placeholder={content.form.name}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs font-mono text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--text)]"
                    >
                      {content.form.email}
                    </label>
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]"
                      aria-hidden="true"
                    >
                      [FIELD // 02]
                    </span>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500/60' : ''
                    }`}
                    placeholder={content.form.email}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs font-mono text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--text)]"
                    >
                      {content.form.message}
                    </label>
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]"
                      aria-hidden="true"
                    >
                      [FIELD // 03 · MAX 2000 CHARS]
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    maxLength={2000}
                    className={`w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors resize-none ${
                      errors.message ? 'border-red-500/60' : ''
                    }`}
                    placeholder={content.form.message}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  <div className="flex justify-between items-center mt-1.5">
                    {errors.message && (
                      <p id="message-error" className="text-xs font-mono text-red-400" role="alert">
                        {errors.message}
                      </p>
                    )}
                    <span
                      className={`font-mono text-xs ml-auto ${
                        formData.message.length > 1800
                          ? 'text-red-400'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {formData.message.length}/2000
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[var(--cta-bg)] text-[var(--cta-text)] hover:bg-[var(--cta-hover)] px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-busy={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {content.form.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      {content.form.submit}
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div
                    className="bg-[var(--bg)] border border-[var(--primary)] px-4 py-3 rounded-lg text-[var(--primary)] font-mono text-xs sm:text-sm text-center"
                    role="alert"
                    aria-live="polite"
                  >
                    {content.form.success}
                  </div>
                )}

                {status === 'error' && (
                  <div
                    className="bg-[var(--bg)] border border-red-500/60 px-4 py-3 rounded-lg text-red-400 font-mono text-xs sm:text-sm text-center"
                    role="alert"
                    aria-live="polite"
                  >
                    <p className="font-medium">{content.form.error}</p>
                    {errorMessage && (
                      <p className="text-xs mt-1 opacity-90">{errorMessage}</p>
                    )}
                  </div>
                )}
              </div>
            </form>

            {/* Console Telemetry Footer */}
            <div className="px-6 py-4 bg-[var(--bg-2)] border-t border-[var(--border)] grid sm:grid-cols-3 gap-4 text-xs font-mono text-[var(--text-soft)]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--primary)] flex-shrink-0" aria-hidden="true" />
                <span>contact@ivantechcoach.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--primary)] flex-shrink-0" aria-hidden="true" />
                <span>El Vendrell · Tarragona</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--primary)] flex-shrink-0" aria-hidden="true" />
                <span>
                  {lang === 'en'
                    ? 'Available for inquiries'
                    : lang === 'ca'
                      ? 'Disponible per a consultes'
                      : 'Disponible para consultas'}
                </span>
              </div>
            </div>
          </div>

          {/* Security / Privacy Reassurance Note */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <ShieldCheck size={14} className="text-[var(--primary)]" aria-hidden="true" />
            <span>
              {lang === 'en'
                ? 'GDPR & OWASP input sanitization active · Zero third-party data resale'
                : lang === 'ca'
                  ? 'Sanitització RGPD i OWASP activa · Zero cessió de dades a tercers'
                  : 'Sanitización RGPD y OWASP activa · Cero cesión de datos a terceros'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
