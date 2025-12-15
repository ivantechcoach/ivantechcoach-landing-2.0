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
      className="relative section-padding bg-transparent text-[var(--text)]"
      aria-labelledby="services-page-title"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1
            id="services-page-title"
            className="tracking-tight leading-tight text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--text)] mb-6"
          >
            {content.pageTitle}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-soft)] mb-4 font-medium">
            {content.pageSubtitle}
          </p>
          <p className="max-w-3xl mx-auto text-lg text-[var(--text-soft)] leading-relaxed">
            {content.pageDescription}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {content.items.map((service, index) => {
            const Icon = iconMap[service.icon] || Lightbulb
            return (
              <div
                key={service.title}
                className="
                  group relative p-10 md:p-12 rounded-2xl 
                  bg-[var(--card)]
                  border border-[var(--border)]
                  shadow-lg
                  transition-[transform,box-shadow,border-color] duration-[var(--anim-base)] ease-out
                  hover:shadow-xl
                  hover:scale-[1.02]
                  hover:border-[var(--primary)]
                  animate-fade-up
                "
                style={{
                  animationDelay: `${index * 0.1}s`,
                  willChange: 'transform, box-shadow, border-color',
                }}
              >
                {/* Icon */}
                <div
                  className="
                    w-16 h-16 flex items-center justify-center 
                    rounded-xl mb-6
                    bg-[var(--primary)]/15
                    text-[var(--primary-dark)]
                    group-hover:bg-[var(--primary)]/25
                    group-hover:scale-110
                    transition-[transform,background-color] duration-[var(--anim-base)] ease-out
                  "
                  style={{ willChange: 'transform, background-color' }}
                >
                  <Icon className="w-8 h-8" aria-hidden="true" strokeWidth={2.5} />
                </div>

                {/* Title */}
                <h2 className="
                  text-3xl md:text-4xl font-extrabold tracking-tight 
                  mb-4
                  text-[var(--text)]
                  group-hover:text-[var(--primary-dark)]
                  transition-colors duration-200 ease-out
                "
                style={{ willChange: 'color' }}
                >
                  {service.title}
                </h2>

                {/* Short Description */}
                <p className="text-xl text-[var(--text-soft)] font-medium mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Long Description */}
                <p className="text-[var(--text-soft)] font-normal leading-relaxed text-base mb-8">
                  {service.longDescription}
                </p>

                {/* Benefits List */}
                {service.benefits && service.benefits.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-[var(--text)] mb-4 uppercase tracking-wide">
                      {lang === 'es' ? 'Beneficios clave' : 'Key Benefits'}
                    </h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-start gap-3 text-[var(--text-soft)]"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-[var(--primary-dark)]" aria-hidden="true" />
                          </div>
                          <span className="leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  href={`/${lang}/contact`}
                  className="
                    inline-flex items-center gap-2
                    px-6 py-3 rounded-lg
                    bg-[var(--primary)] text-white
                    font-semibold text-base
                    hover:bg-[var(--primary-dark)]
                    hover:scale-105
                    transition-all duration-[var(--anim-base)]
                    shadow-md hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--card)]
                  "
                >
                  {lang === 'es' ? 'Contáctame' : 'Contact me'}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
