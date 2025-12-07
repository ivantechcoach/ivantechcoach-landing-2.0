import { isValidLanguage, getDefaultLanguage } from '@/lib/content'

type Props = {
  children: React.ReactNode
  params: { lang: string }
}

export default async function LangLayout({ children, params }: Props) {
  const lang = isValidLanguage(params.lang) ? params.lang : getDefaultLanguage()
  
  // Note: In Next.js App Router, only root layout can have <html> tag.
  // The lang attribute is set dynamically via LangUpdater component.
  // This layout ensures proper locale validation and content wrapping.
  
  return <>{children}</>
}








