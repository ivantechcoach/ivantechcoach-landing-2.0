'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function LangUpdater() {
  const pathname = usePathname()

  useEffect(() => {
    const lang = pathname?.startsWith('/en')
      ? 'en'
      : pathname?.startsWith('/ca')
        ? 'ca'
        : 'es'
    document.documentElement.lang = lang

    const skipLink = document.querySelector('a[href="#main-content"]')
    if (skipLink) {
      skipLink.textContent =
        lang === 'en'
          ? 'Skip to main content'
          : lang === 'ca'
            ? 'Saltar al contingut principal'
            : 'Saltar al contenido principal'
    }
  }, [pathname])

  return null
}
