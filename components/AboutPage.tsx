'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

interface AboutPageProps {
  content: {
    pageTitle: string
    pageSubtitle: string
    content: string[]
    closing: string
    cta: string
  }
  lang: string
}

interface ParagraphState {
  isVisible: boolean
  progress: number
  parallaxOffset: number
}

export default function AboutPage({ content, lang }: AboutPageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([])
  const [paragraphStates, setParagraphStates] = useState<ParagraphState[]>(
    content.content.map(() => ({ isVisible: false, progress: 0, parallaxOffset: 0 }))
  )
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const closingRef = useRef<HTMLDivElement>(null)
  const hasStartedTypingRef = useRef(false)

  // Observer para la sección principal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  // Efecto typewriter para el bloque de cierre
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedTypingRef.current) {
            hasStartedTypingRef.current = true
            setIsTyping(true)
            const fullText = content.closing
            let currentIndex = 0
            
            const typeNextChar = () => {
              if (currentIndex < fullText.length) {
                const char = fullText[currentIndex]
                setDisplayedText(fullText.substring(0, currentIndex + 1))
                currentIndex++
                
                // Pausa más larga después de comas y puntos
                const delay = (char === ',' || char === '.') ? 250 : 70
                
                timeoutId = setTimeout(() => {
                  typeNextChar()
                }, delay)
              } else {
                setIsTyping(false)
              }
            }
            
            // Iniciar el efecto
            typeNextChar()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (closingRef.current) {
      observer.observe(closingRef.current)
    }

    return () => {
      if (closingRef.current) observer.unobserve(closingRef.current)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [content.closing])

  // Sistema avanzado de animación para cada párrafo individual
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const scrollHandlers: (() => void)[] = []

    paragraphRefs.current.forEach((ref, index) => {
      if (!ref) return

      // Observer individual para cada párrafo
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setParagraphStates((prev) => {
                const newStates = [...prev]
                newStates[index] = { ...newStates[index], isVisible: true }
                return newStates
              })
            }
          })
        },
        {
          threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
          rootMargin: '-50px 0px -50px 0px'
        }
      )

      observer.observe(ref)
      observers.push(observer)

      // Scroll handler para parallax y progreso
      const handleScroll = () => {
        const rect = ref.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementTop = rect.top
        const elementHeight = rect.height

        // Calcular progreso de entrada (0 a 1)
        const viewportCenter = windowHeight / 2
        const elementCenter = elementTop + elementHeight / 2
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
        const maxDistance = windowHeight / 2 + elementHeight / 2
        
        const progress = Math.max(0, Math.min(1, 1 - distanceFromCenter / maxDistance))
        
        // Parallax offset sutil (alternando direcciones)
        const parallaxDirection = index % 2 === 0 ? 1 : -1
        const parallaxOffset = (1 - progress) * 30 * parallaxDirection

        setParagraphStates((prev) => {
          const newStates = [...prev]
          newStates[index] = {
            ...newStates[index],
            progress,
            parallaxOffset
          }
          return newStates
        })
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // Initial call
      scrollHandlers.push(() => window.removeEventListener('scroll', handleScroll))
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
      scrollHandlers.forEach((cleanup) => cleanup())
    }
  }, [content.content.length])

  return (
    <section
      ref={sectionRef}
      className="relative section-padding bg-transparent text-[var(--text)] overflow-hidden"
      aria-labelledby="about-page-title"
    >
      {/* Subtle geometric background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ opacity: '0.02' }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(30deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)),
            linear-gradient(150deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)),
            linear-gradient(30deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)),
            linear-gradient(150deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary))
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
        }} />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--primary)]/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Hero Section - Ligera con efectos profesionales */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-xs font-medium text-[var(--primary)] uppercase tracking-wider">
              {lang === 'es' ? 'Profesional IT' : 'IT Professional'}
            </span>
          </div>
          <h1
            id="about-page-title"
            className="tracking-tight leading-tight text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text)] mb-4 bg-clip-text bg-gradient-to-r from-[var(--text)] via-[var(--text)] to-[var(--primary)]"
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--text) 0%, var(--primary-dark) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {content.pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-soft)] font-medium max-w-2xl mx-auto leading-relaxed">
            {content.pageSubtitle}
          </p>
        </div>

        {/* Foto - Más grande y clara con efectos avanzados */}
        <div className={`mb-16 flex justify-center transition-all duration-1000 ease-out delay-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-[var(--primary)] opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
            
            {/* Photo container with glassmorphism */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-[var(--primary-light)] shadow-[0_0_60px_rgba(0,209,255,0.5)] backdrop-blur-sm bg-gradient-to-br from-[var(--primary)]/10 to-transparent group-hover:shadow-[0_0_80px_rgba(0,209,255,0.6)] transition-all duration-500 group-hover:scale-105">
              <Image
                src="/images/ivan-techcoach-hero.webp"
                alt="Ivan Tech Coach - Professional portrait"
                width={288}
                height={288}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Contenido principal - Columna única, texto legible con animaciones avanzadas */}
        <div className="max-w-3xl mx-auto space-y-7 md:space-y-8 text-[var(--text)]">
          {content.content.map((paragraph, index) => {
            const state = paragraphStates[index] || { isVisible: false, progress: 0, parallaxOffset: 0 }
            const isEven = index % 2 === 0
            
            // Calcular transformaciones dinámicas basadas en scroll con easing suave
            const easedProgress = state.progress < 0.5 
              ? 2 * state.progress * state.progress 
              : 1 - Math.pow(-2 * state.progress + 2, 2) / 2
            
            const opacity = Math.min(1, easedProgress * 1.2)
            const scale = 0.96 + (easedProgress * 0.04)
            const translateY = (1 - easedProgress) * (isEven ? 50 : -50)
            const translateX = state.parallaxOffset * 0.25
            const rotateY = (1 - easedProgress) * (isEven ? 1.5 : -1.5)
            const blur = Math.max(0, (1 - easedProgress) * 6)
            
            // Clip-path reveal effect con suavizado
            const clipProgress = Math.min(1, easedProgress * 1.1)
            const clipPath = `inset(${(1 - clipProgress) * 100}% 0% 0% 0%)`
            
            return (
              <div
                key={index}
                ref={(el) => {
                  paragraphRefs.current[index] = el
                }}
                className="relative"
                style={{
                  opacity: state.isVisible ? opacity : 0,
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotateY(${rotateY}deg)`,
                  filter: `blur(${blur}px)`,
                  clipPath: state.isVisible && state.progress > 0.1 ? 'inset(0% 0% 0% 0%)' : clipPath,
                  transition: state.isVisible 
                    ? 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s cubic-bezier(0.16, 1, 0.3, 1), clip-path 1s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
                  willChange: state.isVisible ? 'transform, opacity, filter, clip-path' : 'auto',
                  backfaceVisibility: 'hidden',
                  perspective: '1000px'
                }}
              >
                {/* Glow effect que aparece al hacer scroll */}
                <div 
                  className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/50 to-transparent rounded-full transition-opacity duration-500"
                  style={{
                    opacity: state.progress * 0.6,
                    transform: `scaleY(${state.progress})`,
                    transformOrigin: 'top'
                  }}
                />
                
                {/* Border izquierdo animado */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)]/0 via-[var(--primary)] to-[var(--primary)]/0 transition-all duration-700"
                  style={{
                    opacity: state.progress,
                    transform: `scaleY(${state.progress})`,
                    transformOrigin: 'top'
                  }}
                />
                
                {/* Contenedor del párrafo con efectos avanzados */}
                <div className="relative pl-8 group">
                  {/* Background glow sutil al hover */}
                  <div className="absolute inset-0 rounded-lg bg-[var(--primary)]/0 group-hover:bg-[var(--primary)]/5 transition-all duration-500 -z-10" />
                  
                  {/* Wave effect que se propaga desde la izquierda */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)] origin-left transition-transform duration-700"
                    style={{
                      transform: `scaleX(${easedProgress})`,
                      opacity: easedProgress * 0.6
                    }}
                  />
                  
                  {/* Texto con efecto de reveal */}
                  <p 
                    className="font-normal leading-relaxed md:leading-loose text-base md:text-lg text-[var(--text-soft)] text-left relative"
                    style={{
                      textShadow: state.progress > 0.5 
                        ? `0 0 ${(state.progress - 0.5) * 15}px rgba(0, 209, 255, ${(state.progress - 0.5) * 0.08})`
                        : 'none',
                      transform: `translateX(${(1 - easedProgress) * (isEven ? -10 : 10)}px)`,
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {paragraph}
                  </p>
                  
                  {/* Indicador de progreso sutil */}
                  <div 
                    className="absolute left-0 top-0 w-0.5 h-full bg-[var(--primary)] origin-top transition-transform duration-300"
                    style={{
                      transform: `scaleY(${state.progress})`,
                      opacity: state.progress * 0.4
                    }}
                  />
                </div>
                
                {/* Partículas decorativas que aparecen al hacer scroll */}
                {state.progress > 0.5 && (
                  <div 
                    className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--primary)] opacity-50 blur-sm"
                    style={{
                      opacity: (state.progress - 0.5) * 0.5,
                      transform: `translate(-50%, -50%) scale(${(state.progress - 0.5) * 2})`,
                      animation: 'pulse 2s ease-in-out infinite'
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Bloque de cierre - Efecto typewriter con neón moderno */}
        <div 
          ref={closingRef}
          className={`mt-16 mb-12 max-w-3xl mx-auto transition-all duration-1000 ease-out delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative group">
            {/* Background glow intensificado para efecto neón */}
            <div className="absolute inset-0 rounded-2xl bg-[var(--primary)] opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
            <div className="absolute inset-0 rounded-2xl bg-[var(--primary)] opacity-10 blur-xl" />
            
            {/* Glassmorphism card con borde neón */}
            <div className="relative p-8 md:p-10 rounded-2xl bg-[var(--card)]/90 backdrop-blur-xl border-2 border-[var(--primary)]/40 shadow-2xl group-hover:border-[var(--primary)]/60 group-hover:shadow-[0_0_40px_rgba(0,209,255,0.4)] transition-all duration-500">
              {/* Decorative corner elements con glow */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[var(--primary)]/40 rounded-tl-2xl shadow-[0_0_10px_rgba(0,209,255,0.3)]" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[var(--primary)]/40 rounded-br-2xl shadow-[0_0_10px_rgba(0,209,255,0.3)]" />
              
              {/* Texto con efecto typewriter y neón */}
              <div className="relative z-10 text-center min-h-[80px] flex items-center justify-center">
                <p 
                  className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed text-[var(--text)] relative inline-block px-2"
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                    letterSpacing: '0.08em',
                    textShadow: `
                      0 0 10px rgba(0, 209, 255, 0.6),
                      0 0 20px rgba(0, 209, 255, 0.5),
                      0 0 30px rgba(0, 209, 255, 0.4),
                      0 0 40px rgba(0, 209, 255, 0.3),
                      0 0 70px rgba(0, 209, 255, 0.15),
                      0 2px 4px rgba(0, 0, 0, 0.2)
                    `,
                    color: 'var(--text)',
                    filter: 'brightness(1.15) contrast(1.05)',
                    animation: displayedText.length > 0 && displayedText.length < content.closing.length 
                      ? 'none' 
                      : 'neonPulse 3s ease-in-out infinite',
                    wordSpacing: '0.1em'
                  }}
                >
                  {/* Efecto de brillo de fondo que sigue el texto */}
                  {displayedText.length > 0 && (
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent pointer-events-none blur-xl"
                      style={{
                        width: `${Math.min(100, (displayedText.length / content.closing.length) * 120)}%`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        transition: 'width 0.06s linear',
                        opacity: 0.7
                      }}
                    />
                  )}
                  
                  <span className="relative z-10">
                    {displayedText || content.closing}
                    {/* Cursor parpadeante tipo máquina de escribir con efecto neón */}
                    {isTyping && displayedText.length > 0 && displayedText.length < content.closing.length && (
                      <span 
                        className="inline-block w-[3px] h-[1.2em] bg-[var(--primary)] ml-2 align-middle rounded-sm"
                        style={{
                          animation: 'blink 1s step-end infinite',
                          boxShadow: `
                            0 0 8px rgba(0, 209, 255, 1),
                            0 0 16px rgba(0, 209, 255, 0.8),
                            0 0 24px rgba(0, 209, 255, 0.6),
                            inset 0 0 8px rgba(0, 209, 255, 0.5)
                          `,
                          filter: 'brightness(1.3)'
                        }}
                      />
                    )}
                  </span>
                  
                  {/* Efecto de scanline sutil para dar sensación de terminal antiguo */}
                  {displayedText.length > 0 && (
                    <span
                      className="absolute inset-0 pointer-events-none opacity-10"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 209, 255, 0.1) 2px, rgba(0, 209, 255, 0.1) 4px)',
                        mixBlendMode: 'screen'
                      }}
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA discreto con efectos avanzados */}
        <div className={`flex justify-center mt-12 transition-all duration-1000 ease-out delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link
            href={`/${lang}/contact`}
            className="
              group relative
              inline-flex items-center gap-2
              px-8 py-4 rounded-lg
              bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]
              text-white font-semibold text-base md:text-lg
              hover:from-[var(--primary-dark)] hover:to-[var(--primary)]
              hover:scale-105 hover:shadow-2xl
              transition-all duration-[var(--anim-base)]
              shadow-lg
              focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]
              overflow-hidden
            "
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative z-10">{content.cta}</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
