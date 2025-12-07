import { getContent } from '@/lib/content'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WaveCanvas from '@/components/WaveCanvas'
import TechBackground from '@/components/TechBackground'
import About from '@/components/About'
import Services from '@/components/Services'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || 'es'
  const content = await getContent(lang)

  return {
    title: `Ivan Tech Coach | ${lang === 'es' ? 'Tecnología sin fricción' : 'Frictionless Technology'}`,
    description: content.hero.subtitle,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
  }
}

export default async function HomePage({ params }: Props) {
  const lang = params.lang || 'es'
  const content = await getContent(lang)

  return (
    <main id="main-content">
      <Header lang={lang} content={content} />
      <section className="relative overflow-hidden bg-[var(--bg)]">
        <WaveCanvas />
        <Hero lang={lang} content={content.hero} />
      </section>
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none z-0">
          <TechBackground />
        </div>
        <div className="relative z-10">
          <About content={content.about} />
          <Services content={content.services} />
          <FAQ content={content.faq} />
          <CTA lang={lang} content={content.cta} />
          <Footer content={content.footer} />
        </div>
      </div>
    </main>
  )
}
