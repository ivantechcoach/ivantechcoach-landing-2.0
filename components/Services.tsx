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
  title: string
  description: string
  icon: string
}

interface ServicesProps {
  content: {
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
      className="relative section-padding bg-transparent text-[var(--text)]"
      aria-labelledby="services-title"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            id="services-title"
            className="tracking-tight leading-tight text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--text)] mb-4"
          >
            {content.title}
          </h2>
          <p className="text-lg text-[var(--text-soft)]">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {content.items.map((service, index) => {
            const Icon = iconMap[service.icon] || Lightbulb
            return (
              <div
                key={service.title}
                className="
                  group relative p-8 rounded-2xl 
                  bg-[var(--card)]
                  border border-[var(--border)]
                  shadow-lg
                  transition-[transform,box-shadow,border-color] duration-[var(--anim-base)] ease-out
                  hover:shadow-xl
                  hover:scale-[1.04]
                  hover:border-[var(--primary)]
                  animate-fade-up
                "
                style={{
                  animationDelay: `${index * 0.1}s`,
                  willChange: 'transform, box-shadow, border-color',
                }}
              >
                <div
                  className="
                    w-14 h-14 flex items-center justify-center 
                    rounded-xl mb-6
                    bg-[var(--primary)]/15
                    text-[var(--primary-dark)]
                    group-hover:bg-[var(--primary)]/25
                    group-hover:scale-110
                    transition-[transform,background-color] duration-[var(--anim-base)] ease-out
                  "
                  style={{ willChange: 'transform, background-color' }}
                >
                  <Icon className="w-6 h-6" aria-hidden="true" strokeWidth={2.5} />
                </div>
                <h3 className="
                  text-2xl font-extrabold tracking-tight 
                  mb-3
                  text-[var(--text)]
                  group-hover:text-[var(--primary-dark)]
                  transition-colors duration-200 ease-out
                "
                style={{ willChange: 'color' }}
                >
                  {service.title}
                </h3>
                <p className="text-[var(--text-soft)] font-normal leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
