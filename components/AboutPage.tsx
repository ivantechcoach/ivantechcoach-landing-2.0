'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Terminal, ShieldCheck } from 'lucide-react'
import InstrumentFrame from '@/components/InstrumentFrame'

interface AboutPageProps {
  content: {
    pageTitle: string
    pageSubtitle: string
    content: string[]
    closing: string
    cta: string
    portraitLabel?: string
  }
  lang: string
}

export default function AboutPage({ content, lang }: AboutPageProps) {
  return (
    <section
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-transparent text-[var(--text)]"
      aria-labelledby="about-page-title"
    >
      <div className="container-custom relative z-10 max-w-5xl">
        {/* Dossier Header */}
        <div className="mb-14 space-y-4 border-b border-[var(--border)] pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--primary)]" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-soft)]">
              {lang === 'es'
                ? 'DOSSIER DE INGENIERÍA // +20 AÑOS DE TRAYECTORIA'
                : 'ENGINEERING DOSSIER // 20+ YEAR TRACK RECORD'}
            </span>
          </div>

          <h1
            id="about-page-title"
            className="tracking-[-0.03em] leading-tight text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text)]"
          >
            {content.pageTitle}
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-soft)] max-w-3xl leading-relaxed">
            {content.pageSubtitle}
          </p>
        </div>

        {/* Profile Card + Field Notes Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Identity Card */}
          <aside className="lg:col-span-4 blueprint-card p-6 space-y-5">
            <div className="pt-3 pb-4 px-2 flex justify-center sm:justify-start">
              <InstrumentFrame
                size="lg"
                className="w-40 h-40"
                label={content.portraitLabel}
              >
                <Image
                  src="/images/ivan-techcoach-hero.webp"
                  alt={
                    lang === 'en'
                      ? 'Jaime Iván Rodríguez Morales - Professional portrait'
                      : 'Jaime Iván Rodríguez Morales - Retrato profesional'
                  }
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                  priority
                />
              </InstrumentFrame>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--primary)]">
                {"[ID // J. IVÁN RODRÍGUEZ MORALES]"}
              </div>
              <div className="text-lg font-bold text-[var(--text)]">
                Ivan Tech Coach
              </div>
              <p className="text-xs font-mono text-[var(--text-muted)]">
                {lang === 'en'
                  ? 'El Vendrell, Tarragona (Spain) · Remote & Onsite'
                  : lang === 'ca'
                    ? 'El Vendrell, Tarragona (Catalunya) · Remot i Presencial'
                    : 'El Vendrell, Tarragona (España) · Remoto y Presencial'}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)] space-y-2 text-xs font-mono text-[var(--text-soft)]">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">EXPERIENCE:</span>
                <span>20+ YEARS (2001–2026)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">RESOLUTION:</span>
                <span className="text-[var(--primary)]">95% FCR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">SYSTEMS:</span>
                <span>WIN · LINUX · MACOS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">NETWORKS:</span>
                <span>CISCO CCNA 1–3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">SECURITY:</span>
                <span>GOOGLE / FUNDAE</span>
              </div>
            </div>
          </aside>

          {/* Right Narrative Chapters */}
          <div className="lg:col-span-8 space-y-6">
            {content.content.map((paragraph, index) => (
              <div
                key={index}
                className="blueprint-card p-6 space-y-2"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] block">
                  [SEC-0{index + 1}]
                </span>
                <p className="text-base md:text-lg text-[var(--text-soft)] leading-relaxed">
                  {paragraph}
                </p>
              </div>
            ))}

            {/* Closing Principle Statement */}
            <div className="blueprint-card p-8 bg-[var(--card-elevated)] border-[var(--border-strong)] space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--primary)]">
                <Terminal size={14} aria-hidden="true" />
                <span>{"[CORE PRINCIPLE // ZERO TECH SMOKE]"}</span>
              </div>
              <p className="text-xl md:text-2xl font-bold tracking-tight text-[var(--text)] leading-snug">
                “{content.closing}”
              </p>
              <div className="pt-2">
                <Link
                  href={`/${lang}/contact`}
                  prefetch={false}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--cta-bg)] text-[var(--cta-text)] hover:bg-[var(--cta-hover)] font-semibold text-sm sm:text-base transition-colors"
                >
                  <span>{content.cta}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
