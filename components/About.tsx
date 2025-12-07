'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface AboutProps {
  content: {
    title: string
    description: string
  }
}

export default function About({ content }: AboutProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative section-padding bg-transparent text-[var(--text)]"
      aria-labelledby="about-title"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className={`max-w-2xl mx-auto text-center transition-all duration-[var(--anim-slow)] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="interactive mb-10 relative mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-[var(--primary-light)] shadow-[0_0_38px_rgba(0,209,255,0.35)] hover:scale-105 transition-transform duration-500 ease-out hover:-rotate-1 hover:translate-y-[-2px]">
            <Image
              src="/images/ivan-techcoach-hero.webp"
              alt="Professional portrait"
              width={260}
              height={260}
              className="object-cover w-full h-full"
              style={{ 
                willChange: 'transform',
                animation: isVisible ? 'fadeInScale 0.8s ease-out 0.2s both' : 'none'
              }}
              priority
            />
          </div>

          <h2
            id="about-title"
            className={`
              tracking-tight leading-tight text-3xl md:text-4xl font-bold mb-6 text-[var(--text)]
              transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ 
              transitionDelay: isVisible ? '0.4s' : '0s',
              willChange: 'opacity, transform'
            }}
          >
            {content.title}
          </h2>

          <p 
            className={`
              font-normal leading-relaxed text-lg md:text-xl max-w-3xl mx-auto text-[var(--text-soft)]
              transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ 
              transitionDelay: isVisible ? '0.6s' : '0s',
              willChange: 'opacity, transform'
            }}
          >
            {content.description}
          </p>
        </div>
      </div>
    </section>
  )
}
