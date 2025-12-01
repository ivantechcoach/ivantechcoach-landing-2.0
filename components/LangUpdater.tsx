'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function LangUpdater() {
  const pathname = usePathname()

  useEffect(() => {
    const lang = pathname.startsWith('/en') ? 'en' : 'es'
    document.documentElement.lang = lang
  }, [pathname])

  return null
}

