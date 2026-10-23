import { notFound } from 'next/navigation'
import { getContent, isValidLanguage } from '@/lib/content'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
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
  const lang = isValidLanguage(params.lang) ? params.lang : 'es'
  const content = await getContent(lang)
  const title = `Ivan Tech Coach | ${
    lang === 'en'
      ? 'Frictionless Technology & AI'
      : lang === 'ca'
        ? 'Tecnologia i IA sense fricció'
        : 'Tecnología e IA sin fricción'
  }`
  const description = content.hero.subtitle
  const url = `https://www.ivantechcoach.com/${lang}`
  const ogLocale = lang === 'en' ? 'en_US' : lang === 'ca' ? 'ca_ES' : 'es_ES'
  const alternateLocale = ['es_ES', 'ca_ES', 'en_US'].filter((l) => l !== ogLocale)

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'es': 'https://www.ivantechcoach.com/es',
        'ca': 'https://www.ivantechcoach.com/ca',
        'en': 'https://www.ivantechcoach.com/en',
        'x-default': 'https://www.ivantechcoach.com/es',
      },
    },
    openGraph: {
      type: 'website',
      url,
      locale: ogLocale,
      alternateLocale,
      title,
      description,
      siteName: 'Ivan Tech Coach',
      images: [
        {
          url: '/images/og-cover.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-cover.jpg'],
    },
  }
}

export default async function HomePage({ params }: Props) {
  if (!isValidLanguage(params.lang)) {
    notFound()
  }

  const lang = params.lang
  const content = await getContent(lang)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Ivan Tech Coach',
      url: `https://www.ivantechcoach.com/${lang}`,
      image: 'https://www.ivantechcoach.com/images/og-cover.jpg',
      description: content.hero.subtitle,
      email: 'contact@ivantechcoach.com',
      sameAs: [
        content.footer.social.instagram,
        content.footer.social.youtube,
        content.footer.social.linkedin,
        content.footer.social.github,
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header lang={lang} content={content} />
      <section className="relative overflow-hidden bg-transparent">
        <Hero lang={lang} content={content.hero} />
      </section>
      <div className="relative z-10">
        <About content={content.about} lang={lang} />
        <Services content={content.services} />
        <FAQ content={content.faq} />
        <CTA lang={lang} content={content.cta} />
        <Footer content={content.footer} />
      </div>
    </main>
  )
}
