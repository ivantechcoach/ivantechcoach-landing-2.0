'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Terminal } from 'lucide-react'

interface CTAProps {
  lang?: string
  content?: {
    title?: string
    subtitle?: string
    description?: string
    button?: string
  }
}

export default function CTA({ lang: langProp, content }: CTAProps = {}) {
  const pathname = usePathname()

  const lang =
    langProp ||
    (pathname?.startsWith('/en') ? 'en' : pathname?.startsWith('/ca') ? 'ca' : 'es')

  const eyebrow =
    content?.title ||
    (lang === 'en'
      ? 'Real Engineering, Zero Smoke'
      : lang === 'ca'
        ? 'Enginyeria Real, Zero Fum'
        : 'Ingeniería Real, Cero Humo')
  const heading =
    content?.subtitle ||
    (lang === 'en'
      ? 'Ready to integrate AI and optimize your infrastructure securely?'
      : lang === 'ca'
        ? 'Preparat per integrar IA i optimitzar la teva infraestructura amb seguretat?'
        : '¿Listo para integrar IA y optimizar tu infraestructura con seguridad?')
  const description =
    content?.description ||
    (lang === 'en'
      ? 'Let’s discuss your specific environment. We will analyze your systems, data, and workflows to build a clear, secure, and profitable roadmap.'
      : lang === 'ca'
        ? 'Parlem del teu cas concret. Analitzarem els teus sistemes, les teves dades i els teus fluxos de treball per traçar un full de ruta clar, segur i rendible.'
        : 'Hablemos de tu caso concreto. Analizaremos tus sistemas, tus datos y tus flujos de trabajo para trazar una hoja de ruta clara, segura y rentable.')
  const buttonText =
    content?.button ||
    (lang === 'en'
      ? 'Start conversation'
      : lang === 'ca'
        ? 'Iniciar conversa'
        : 'Iniciar conversación')

  return (
    <section
      id="cta"
      className="relative section-padding bg-[var(--bg-2)] text-[var(--text)]"
      aria-labelledby="cta-heading"
    >
      <div className="container-custom relative z-10">
        <div className="blueprint-card p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.09em] text-[var(--primary)]">
              <Terminal size={14} aria-hidden="true" />
              <span>{`[SYS-READY // ${eyebrow}]`}</span>
            </div>

            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.025em] text-[var(--text)] leading-tight"
            >
              {heading}
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-soft)] leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href={`/${lang}/contact`}
              prefetch={false}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-lg font-semibold text-sm sm:text-base bg-[var(--cta-bg)] text-[var(--cta-text)] hover:bg-[var(--cta-hover)] transition-colors"
            >
              <span>{buttonText}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
