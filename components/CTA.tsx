'use client'

import { usePathname } from 'next/navigation'

interface CTAProps {
  lang?: string
  content?: {
    title?: string
    subtitle?: string
    description?: string
    button?: string
  }
}

export default function CTA({ lang: langProp, content }: CTAProps = {}) {
  const pathname = usePathname()
  
  const lang = pathname.startsWith('/en') ? 'en' : 'es'

  return (
    <section
      id="cta"
      className="relative section-padding text-center bg-transparent text-[var(--text)]"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-[var(--text)]">
          {lang === 'es' ? 'Hablemos ahora' : "Let's talk now"}
        </h2>

        <p className="max-w-2xl mx-auto text-lg font-normal text-[var(--text-soft)] mb-10 leading-relaxed">
          {lang === 'es'
            ? 'Te ayudo a transformar tu tecnología en claridad, eficiencia y resultados. Sin complicaciones.'
            : 'I help you turn your technology into clarity, efficiency and results. No complications.'}
        </p>

        <a
          href={`/${lang}/contact`}
          className="interactive
            inline-block px-10 py-4 rounded-full font-semibold
            bg-[var(--text)] text-[var(--bg)]
            hover:bg-[var(--text-soft)]
            hover:scale-105
            hover:shadow-xl
            transition-all duration-[var(--anim-base)]
            shadow-lg
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]
          "
        >
          {lang === 'es' ? 'Contactar' : 'Contact me'}
        </a>
      </div>
    </section>
  )
}
