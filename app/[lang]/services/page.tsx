import { notFound } from 'next/navigation'
import { getContent, isValidLanguage } from '@/lib/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServicesPage from '@/components/ServicesPage'
import type { Metadata } from 'next'

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = isValidLanguage(params.lang) ? params.lang : 'es'
  const content = await getContent(lang)
  const title = `${content.servicesPage.pageTitle} | Ivan Tech Coach`
  const description = content.servicesPage.pageDescription
  const url = `https://www.ivantechcoach.com/${lang}/services`
  const ogLocale = lang === 'en' ? 'en_US' : lang === 'ca' ? 'ca_ES' : 'es_ES'
  const alternateLocale = ['es_ES', 'ca_ES', 'en_US'].filter((l) => l !== ogLocale)

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'es': 'https://www.ivantechcoach.com/es/services',
        'ca': 'https://www.ivantechcoach.com/ca/services',
        'en': 'https://www.ivantechcoach.com/en/services',
        'x-default': 'https://www.ivantechcoach.com/es/services',
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

export default async function ServicesRoutePage({ params }: Props) {
  if (!isValidLanguage(params.lang)) {
    notFound()
  }

  const lang = params.lang
  const content = await getContent(lang)

  return (
    <main id="main-content">
      <Header lang={lang} content={content} />
      <div className="relative z-10">
        <ServicesPage content={content.servicesPage} lang={lang} />
      </div>
      <Footer content={content.footer} />
    </main>
  )
}
