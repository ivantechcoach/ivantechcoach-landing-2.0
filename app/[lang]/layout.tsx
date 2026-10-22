import { notFound } from 'next/navigation'
import { isValidLanguage, supportedLanguages } from '@/lib/content'

export const dynamicParams = false

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }))
}

type Props = {
  children: React.ReactNode
  params: { lang: string }
}

export default async function LangLayout({ children, params }: Props) {
  if (!isValidLanguage(params.lang)) {
    notFound()
  }

  return <>{children}</>
}
