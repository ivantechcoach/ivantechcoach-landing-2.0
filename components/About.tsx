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
      className="relative section-padding bg-[var(--bg)] text-[var(--text)]"
      aria-labelledby="about-title"
    >
      <div className="container-custom relative z-10">
        <div className={`max-w-2xl mx-auto text-center transition-all duration-[var(--anim-slow)] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="mb-10 relative inline-block">
            <div 
              className="absolute inset-0 rounded-full border-2 border-[var(--primary)]/20"
              style={{ 
                animation: 'spin-slow 20s linear infinite',
                willChange: 'transform'
              }}
            ></div>
            
            <Image
              src="/images/ivan-techcoach-hero.webp"
              alt="Professional portrait"
              width={260}
              height={260}
              className="
                relative z-10
                rounded-full border-[3px] border-[var(--border)]
                shadow-2xl
                mx-auto
                hover:scale-[1.05] 
                hover:border-[var(--primary)]
                hover:shadow-[var(--glow)]
                transition-all duration-500 ease-out
                group
              "
              style={{ 
                willChange: 'transform, border-color, box-shadow',
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
              leading-relaxed md:leading-loose text-lg md:text-xl tracking-tight max-w-3xl mx-auto text-[var(--text-soft)]
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
