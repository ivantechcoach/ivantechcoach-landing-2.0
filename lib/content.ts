import esContent from '@/content/es.json'
import enContent from '@/content/en.json'

export type Content = typeof esContent

export async function getContent(lang: string): Promise<Content> {
  const content = lang === 'en' ? enContent : esContent
  return content as Content
}

export const supportedLanguages = ['es', 'en'] as const
export type SupportedLanguage = typeof supportedLanguages[number]

const DEFAULT_LOCALE: SupportedLanguage = 'es'

/**
 * Valida si un idioma está soportado
 */
export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return supportedLanguages.includes(lang as SupportedLanguage)
}

/**
 * Obtiene el idioma por defecto
 */
export function getDefaultLanguage(): SupportedLanguage {
  return DEFAULT_LOCALE
}




