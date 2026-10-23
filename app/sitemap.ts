import { MetadataRoute } from 'next'
import { supportedLanguages } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ivantechcoach.com'
  const routes = ['', '/about', '/services', '/contact']

  return routes.flatMap((route) => {
    const priority = route === '' ? 1 : 0.8
    const languages = Object.fromEntries(
      supportedLanguages.map((lang) => [lang, `${baseUrl}/${lang}${route}`])
    )

    return supportedLanguages.map((lang) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages,
      },
    }))
  })
}
