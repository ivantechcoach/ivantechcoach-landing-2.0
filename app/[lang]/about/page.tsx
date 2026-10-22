import { notFound } from 'next/navigation'
import { getContent, isValidLanguage } from '@/lib/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'
import type { Metadata } from 'next'

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = isValidLanguage(params.lang) ? params.lang : 'es'
  const content = await getContent(lang)
  const title = `${content.aboutPage.pageTitle} | Ivan Tech Coach`
  const description = content.aboutPage.pageSubtitle
  const url = `https://www.ivantechcoach.com/${lang}/about`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'es': 'https://www.ivantechcoach.com/es/about',
        'en': 'https://www.ivantechcoach.com/en/about',
        'x-default': 'https://www.ivantechcoach.com/es/about',
      },
    },
    openGraph: {
      type: 'website',
      url,
      locale: lang === 'en' ? 'en_US' : 'es_ES',
      alternateLocale: lang === 'en' ? 'es_ES' : 'en_US',
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

export default async function AboutRoutePage({ params }: Props) {
  if (!isValidLanguage(params.lang)) {
    notFound()
  }

  const lang = params.lang
  const content = await getContent(lang)

  return (
    <main id="main-content">
      <Header lang={lang} content={content} />
      <div className="relative z-10">
        <AboutPage content={content.aboutPage} lang={lang} />
      </div>
      <Footer content={content.footer} />
    </main>
  )
}
