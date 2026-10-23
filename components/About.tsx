'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Award, CheckCircle2, ArrowRight } from 'lucide-react'
import InstrumentFrame from '@/components/InstrumentFrame'

interface MetricItem {
  code: string
  value: string
  label: string
  detail: string
}

interface CertificationItem {
  year: string
  title: string
  issuer: string
}

interface AboutProps {
  lang?: string
  content: {
    eyebrow?: string
    title: string
    roleHeadline?: string
    description: string
    cta?: string
    metrics?: MetricItem[]
    certificationsTitle?: string
    certifications?: CertificationItem[]
  }
}

export default function About({ content, lang = 'es' }: AboutProps) {
  const defaultMetrics: MetricItem[] = [
    {
      code: 'KPI-01',
      value: '95%',
      label: lang === 'en' ? 'First-Contact Resolution' : 'Resolución en 1er Contacto',
      detail:
        lang === 'en'
          ? 'Advanced cross-platform diagnostics (Windows, Linux, macOS) cutting recurring incidents by 30%.'
          : 'Diagnóstico avanzado multiplataforma (Windows, Linux, macOS) reduciendo incidentes recurrentes un 30%.',
    },
    {
      code: 'KPI-02',
      value: '+40%',
      label: lang === 'en' ? 'Cloud Retrieval Efficiency' : 'Eficiencia Documental Cloud',
      detail:
        lang === 'en'
          ? 'Led migration and structuring of 200+ GB in SharePoint and OneDrive ready for AI workflows.'
          : 'Liderazgo en migración y estructuración de +200 GB en SharePoint y OneDrive listos para flujos de IA.',
    },
    {
      code: 'KPI-03',
      value: '-30%',
      label: lang === 'en' ? 'Hardware Cost Reduction' : 'Reducción de Costo Hardware',
      detail:
        lang === 'en'
          ? 'Advised 150+ clients and optimized 500+ workstations, extending average hardware lifespan by 3+ years.'
          : 'Asesoría en +150 proyectos y +500 equipos optimizados, extendiendo la vida útil en +3 años.',
    },
    {
      code: 'KPI-04',
      value: '-25%',
      label: lang === 'en' ? 'Monthly Downtime Reduction' : 'Menos Tiempo de Inactividad',
      detail:
        lang === 'en'
          ? 'Proactive infrastructure monitoring, LAN/WAN networking, and operational security hardening.'
          : 'Monitoreo proactivo de infraestructura, redes LAN/WAN y endurecimiento de seguridad operativa.',
    },
  ]

  const defaultCerts: CertificationItem[] = [
    {
      year: '2025',
      title:
        lang === 'en'
          ? 'Network Protocols Applied to Cybersecurity & Basic Cybersecurity'
          : 'Protocolos de Red Aplicados a Ciberseguridad & Ciberseguridad Básica',
      issuer: 'FUNDAE',
    },
    {
      year: '2024',
      title: 'Google Cybersecurity Professional Certificate & Linux/SQL',
      issuer: 'Google / Coursera',
    },
    {
      year: '2017–2018',
      title: 'Cisco CCNA 1, CCNA 2, CCNA 3 & IT Essentials',
      issuer: 'Cisco Networking Academy',
    },
    {
      year: '2001',
      title:
        lang === 'en'
          ? 'Higher Technician in Computer Science (TSU)'
          : 'Técnico Superior Universitario (TSU) en Informática',
      issuer: 'Instituto Tecnológico Sucre',
    },
  ]

  const metrics = content.metrics || defaultMetrics
  const certifications = content.certifications || defaultCerts

  return (
    <section
      id="about"
      className="relative section-padding bg-[var(--bg-2)] text-[var(--text)] border-b border-[var(--border)]"
      aria-labelledby="about-title"
    >
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Engineering Dossier Profile */}
          <div className="lg:col-span-5 space-y-6">
            <span className="telemetry-eyebrow">
              [{content.eyebrow || 'DOSSIER TÉCNICO // TRAYECTORIA VERIFICADA'}]
            </span>

            <div className="blueprint-card p-6 space-y-6">
              <div className="flex items-center gap-5">
                <InstrumentFrame size="md" className="w-20 h-20 sm:w-24 sm:h-24">
                  <Image
                    src="/images/ivan-techcoach-hero.webp"
                    alt={
                      lang === 'en'
                        ? 'Jaime Iván Rodríguez Morales - Ivan Tech Coach'
                        : 'Jaime Iván Rodríguez Morales - Ivan Tech Coach'
                    }
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    priority
                  />
                </InstrumentFrame>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--primary)]">
                    {"[ID // JAIME IVÁN RODRÍGUEZ M.]"}
                  </div>
                  <h2
                    id="about-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)] mt-0.5"
                  >
                    {content.title}
                  </h2>
                  <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                    {content.roleHeadline ||
                      (lang === 'en'
                        ? 'Senior IT Infrastructure, Cybersecurity & Applied AI Consultant'
                        : lang === 'ca'
                          ? 'Consultor Sènior d’Infraestructura TI, Ciberseguretat i IA Aplicada'
                          : 'Consultor Senior de Infraestructura TI, Ciberseguridad e IA Aplicada')}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed">
                {content.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href={`/${lang}/about`}
                  prefetch={false}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider bg-[var(--card-elevated)] hover:bg-[var(--border)] text-[var(--text)] border border-[var(--border-strong)] transition-colors"
                >
                  {lang === 'en'
                    ? 'Read full dossier'
                    : lang === 'ca'
                      ? 'Veure dossier complet'
                      : 'Ver dossier completo'}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
                {content.cta && (
                  <Link
                    href={`/${lang}/contact`}
                    prefetch={false}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider bg-[var(--cta-bg)] text-[var(--cta-text)] hover:bg-[var(--cta-hover)] transition-colors"
                  >
                    {content.cta}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Verified Field KPIs + Certifications Ledger */}
          <div className="lg:col-span-7 space-y-6">
            {/* 4 KPI Modules */}
            <div className="grid sm:grid-cols-2 gap-4">
              {metrics.map((kpi) => (
                <div key={kpi.code} className="blueprint-card p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">
                      [{kpi.code}]
                    </span>
                    <CheckCircle2
                      size={14}
                      className="text-[var(--primary)]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                    {kpi.value}
                  </div>
                  <div className="text-sm font-semibold text-[var(--text)]">
                    {kpi.label}
                  </div>
                  <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                    {kpi.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Verified Certifications Ledger */}
            <div className="blueprint-card p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
                <Award
                  size={16}
                  className="text-[var(--accent-violet)]"
                  aria-hidden="true"
                />
                <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text)]">
                  {content.certificationsTitle ||
                    (lang === 'en'
                      ? 'VERIFIED CREDENTIALS & CONTINUOUS EDUCATION'
                      : 'CREDENCIALES Y FORMACIÓN CONTINUA VERIFICADA')}
                </h3>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {certifications.map((cert) => (
                  <div
                    key={`${cert.year}-${cert.title}`}
                    className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[var(--primary)] w-20 flex-shrink-0">
                        {cert.year}
                      </span>
                      <span className="font-medium text-[var(--text)]">
                        {cert.title}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)] sm:text-right">
                      {cert.issuer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
