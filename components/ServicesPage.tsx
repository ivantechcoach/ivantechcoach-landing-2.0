'use client'

import Link from 'next/link'
import {
  Lightbulb,
  Layers,
  RefreshCw,
  Users,
  Zap,
  Target,
  ArrowRight,
  Check,
  type LucideIcon,
} from 'lucide-react'

interface Service {
  title: string
  description: string
  longDescription: string
  benefits: string[]
  icon: string
}

interface ServicesPageProps {
  content: {
    pageTitle: string
    pageSubtitle: string
    pageDescription: string
    items: Service[]
  }
  lang: string
}

const iconMap: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  layers: Layers,
  'refresh-cw': RefreshCw,
  users: Users,
  zap: Zap,
  target: Target,
}

export default function ServicesPage({ content, lang }: ServicesPageProps) {
  return (
    <section
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-transparent text-[var(--text)]"
      aria-labelledby="services-page-title"
    >
      <div className="container-custom relative z-10">
        {/* Specification Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="telemetry-eyebrow">
            {"[SYS-MATRIX // ESPECIFICACIÓN DE SERVICIOS IA + INFRAESTRUCTURA]"}
          </span>
          <h1
            id="services-page-title"
            className="tracking-[-0.03em] leading-tight text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text)]"
          >
            {content.pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-soft)] font-medium">
            {content.pageSubtitle}
          </p>
          <p className="text-base text-[var(--text-soft)] leading-relaxed">
            {content.pageDescription}
          </p>
        </div>

        {/* Services Technical Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.items.map((service, index) => {
            const Icon = iconMap[service.icon] || Lightbulb
            const code = `SYS-0${index + 1}`

            return (
              <article
                key={service.title}
                className="blueprint-card p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Module Header */}
                  <div className="flex items-center justify-between pb-5 mb-6 border-b border-[var(--border)]">
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)]">
                      {`[${code} // SPECIFICATION]`}
                    </span>
                    <div className="w-11 h-11 rounded-lg bg-[var(--card-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
                      <Icon className="w-5 h-5" aria-hidden="true" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-[var(--text)]">
                    {service.title}
                  </h2>

                  <p className="text-base md:text-lg text-[var(--text)] font-medium mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Detailed Architecture Explanation */}
                  <p className="text-[var(--text-soft)] text-sm md:text-base leading-relaxed mb-6">
                    {service.longDescription}
                  </p>

                  {/* Deliverables & Benefits */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="mb-8 p-5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                      <h3 className="font-mono text-xs font-semibold text-[var(--text-muted)] mb-3 uppercase tracking-wider">
                        {lang === 'en'
                          ? 'VERIFIABLE DELIVERABLES & BENEFITS'
                          : lang === 'ca'
                            ? 'LLIURABLES I BENEFICIS VERIFICABLES'
                            : 'ENTREGABLES Y BENEFICIOS VERIFICABLES'}
                      </h3>
                      <ul className="space-y-2.5">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="flex items-start gap-2.5 text-sm text-[var(--text-soft)]"
                          >
                            <Check
                              className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span className="leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-[var(--border)]">
                  <Link
                    href={`/${lang}/contact`}
                    prefetch={false}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--cta-bg)] text-[var(--cta-text)] hover:bg-[var(--cta-hover)] font-semibold text-sm transition-colors"
                  >
                    <span>
                      {lang === 'en'
                        ? 'Request diagnostic for this service'
                        : lang === 'ca'
                          ? 'Sol·licitar diagnòstic per a aquest servei'
                          : 'Solicitar diagnóstico para este servicio'}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
