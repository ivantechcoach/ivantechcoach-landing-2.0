import esContent from '@/content/es.json'
import caContent from '@/content/ca.json'
import enContent from '@/content/en.json'

export type Content = typeof esContent

const contentByLang: Record<string, Content> = {
  es: esContent,
  ca: caContent,
  en: enContent,
}

export async function getContent(lang: string): Promise<Content> {
  return contentByLang[lang] || esContent
}

export const supportedLanguages = ['es', 'ca', 'en'] as const
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
