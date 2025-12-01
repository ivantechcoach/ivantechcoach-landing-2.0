import esContent from '@/content/es.json'
import enContent from '@/content/en.json'

export type Content = typeof esContent

export async function getContent(lang: string): Promise<Content> {
  const content = lang === 'en' ? enContent : esContent
  return content as Content
}

export const supportedLanguages = ['es', 'en'] as const
export type SupportedLanguage = typeof supportedLanguages[number]








