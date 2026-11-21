import { notFound } from 'next/navigation'
import { isValidLanguage, supportedLanguages } from '@/lib/content'

export const dynamicParams = false

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (!isValidLanguage(lang)) {
    notFound()
  }

  return <>{children}</>
}
