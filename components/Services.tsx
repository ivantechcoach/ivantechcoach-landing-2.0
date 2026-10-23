'use client'

import {
  Lightbulb,
  Layers,
  RefreshCw,
  Users,
  Zap,
  Target,
  type LucideIcon,
} from 'lucide-react'

interface Service {
  code?: string
  title: string
  description: string
  metric?: string
  tags?: string[]
  icon: string
}

interface ServicesProps {
  content: {
    eyebrow?: string
    title: string
    subtitle: string
    items: Service[]
  }
}

const iconMap: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  layers: Layers,
  'refresh-cw': RefreshCw,
  users: Users,
  zap: Zap,
  target: Target,
}

export default function Services({ content }: ServicesProps) {
  return (
    <section
      id="services"
      className="relative section-padding bg-transparent text-[var(--text)] border-b border-[var(--border)]"
      aria-labelledby="services-title"
    >
      <div className="container-custom relative z-10">
        {/* Section Blueprint Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="telemetry-eyebrow">
            [{content.eyebrow || 'MATRIZ DE CAPACIDADES // ARQUITECTURA IA + SISTEMAS'}]
          </span>
          <h2
            id="services-title"
            className="tracking-[-0.025em] leading-tight text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text)]"
          >
            {content.title}
          </h2>
          <p className="text-base md:text-lg text-[var(--text-soft)] leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Refero Styles Technical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((service, index) => {
            const Icon = iconMap[service.icon] || Lightbulb
            const moduleCode =
              service.code || `SYS-0${index + 1}`

            return (
              <article
                key={service.title}
                className="blueprint-card p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Module Code + Icon */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
                    <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
                      [{moduleCode}]
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[var(--card-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
                      <Icon className="w-5 h-5" aria-hidden="true" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold tracking-[-0.015em] mb-3 text-[var(--text)]">
                    {service.title}
                  </h3>
                  <p className="text-[var(--text-soft)] leading-relaxed text-sm sm:text-base mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Telemetry Footer: Verified Metric + Stack Tags */}
                <div className="pt-4 border-t border-[var(--border)] space-y-3">
                  {service.metric && (
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--text-muted)] uppercase">OUTPUT:</span>
                      <span className="text-[var(--primary)] font-medium">
                        {service.metric}
                      </span>
                    </div>
                  )}

                  {service.tags && service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--card-elevated)] text-[var(--text-soft)] border border-[var(--border)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
