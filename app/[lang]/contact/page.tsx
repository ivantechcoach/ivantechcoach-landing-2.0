import { notFound } from 'next/navigation'
import { getContent, isValidLanguage } from '@/lib/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = isValidLanguage(params.lang) ? params.lang : 'es'
  const content = await getContent(lang)
  const title = `${content.contact.title} | Ivan Tech Coach`
  const description = content.contact.description
  const url = `https://www.ivantechcoach.com/${lang}/contact`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'es': 'https://www.ivantechcoach.com/es/contact',
        'en': 'https://www.ivantechcoach.com/en/contact',
        'x-default': 'https://www.ivantechcoach.com/es/contact',
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

export default async function ContactPage({ params }: Props) {
  if (!isValidLanguage(params.lang)) {
    notFound()
  }

  const lang = params.lang
  const content = await getContent(lang)

  return (
    <main id="main-content">
      <Header lang={lang} content={content} />
      <ContactForm content={content.contact} lang={lang} />
      <Footer content={content.footer} />
    </main>
  )
}
