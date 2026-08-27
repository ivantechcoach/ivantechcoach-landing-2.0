import { getContent } from '@/lib/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServicesPage from '@/components/ServicesPage'
import TechBackground from '@/components/TechBackground'
import type { Metadata } from 'next'

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || 'es'
  const content = await getContent(lang)

  return {
    title: `${content.servicesPage.pageTitle} | Ivan Tech Coach`,
    description: content.servicesPage.pageDescription,
    alternates: {
      canonical: `https://www.ivantechcoach.com/${lang}/services`,
      languages: {
        'es': 'https://www.ivantechcoach.com/es/services',
        'en': 'https://www.ivantechcoach.com/en/services',
        'x-default': 'https://www.ivantechcoach.com/es/services',
      },
    },
  }
}

export default async function ServicesRoutePage({ params }: Props) {
  const lang = params.lang || 'es'
  const content = await getContent(lang)

  return (
    <main>
      <Header lang={lang} content={content} />
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none z-0">
          <TechBackground />
        </div>
        <div className="relative z-10">
          <ServicesPage content={content.servicesPage} lang={lang} />
        </div>
      </div>
      <Footer content={content.footer} />
    </main>
  )
}
