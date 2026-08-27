import { getContent } from '@/lib/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || 'es'
  const content = await getContent(lang)

  return {
    title: `Contacto | Ivan Tech Coach`,
    description: content.contact.description,
    alternates: {
      canonical: `https://www.ivantechcoach.com/${lang}/contact`,
      languages: {
        'es': 'https://www.ivantechcoach.com/es/contact',
        'en': 'https://www.ivantechcoach.com/en/contact',
        'x-default': 'https://www.ivantechcoach.com/es/contact',
      },
    },
  }
}

export default async function ContactPage({ params }: Props) {
  const lang = params.lang || 'es'
  const content = await getContent(lang)

  return (
    <main>
      <Header lang={lang} content={content} />
      <ContactForm content={content.contact} lang={lang} />
      <Footer content={content.footer} />
    </main>
  )
}
