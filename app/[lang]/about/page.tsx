import { getContent } from '@/lib/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'
import TechBackground from '@/components/TechBackground'
import type { Metadata } from 'next'

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || 'es'
  const content = await getContent(lang)

  return {
    title: `${content.aboutPage.pageTitle} | Ivan Tech Coach`,
    description: content.aboutPage.pageSubtitle,
    alternates: {
      canonical: `/${lang}/about`,
      languages: {
        'es': '/es/about',
        'en': '/en/about',
      },
    },
  }
}

export default async function AboutRoutePage({ params }: Props) {
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
          <AboutPage content={content.aboutPage} lang={lang} />
        </div>
      </div>
      <Footer content={content.footer} />
    </main>
  )
}
