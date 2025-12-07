'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  content: {
    title: string
    subtitle: string
    items: FAQItem[]
  }
}

export default function FAQ({ content }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="relative section-padding bg-transparent text-[var(--text)]"
      aria-labelledby="faq-title"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            id="faq-title"
            className="tracking-tight leading-tight text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--text)] mb-4"
          >
            {content.title}
          </h2>
          <p className="text-lg text-[var(--text-soft)]">{content.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index
            
            return (
              <div
                key={index}
                className="
                  group relative
                  bg-[var(--card)]
                  border border-[var(--border)]
                  rounded-xl
                  overflow-hidden
                  transition-[border-color,box-shadow] duration-[var(--anim-fast)] ease-out
                  hover:border-[var(--primary)]
                  hover:shadow-lg
                  hover:scale-[1.01]
                "
                style={{ willChange: 'border-color, box-shadow' }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="
                    w-full px-6 md:px-8 py-5 md:py-6
                    flex items-center justify-between
                    text-left
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2
                    transition-colors duration-[var(--anim-fast)]
                  "
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="
                    text-lg md:text-xl font-extrabold tracking-tight
                    text-[var(--text)]
                    pr-8
                    group-hover:text-[var(--primary-dark)]
                    transition-colors duration-[var(--anim-fast)]
                  ">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`
                      w-5 h-5 md:w-6 md:h-6
                      text-[var(--text-soft)]
                      flex-shrink-0
                      transition-transform duration-[var(--anim-base)] ease-out
                      ${isOpen ? 'transform rotate-180' : ''}
                    `}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`
                    overflow-hidden
                    transition-all duration-[var(--anim-base)] ease-out
                    ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="px-6 md:px-8 pb-5 md:pb-6">
                    <div className="
                      pt-2
                      font-normal
                      text-[var(--text-soft)]
                      leading-relaxed
                      text-base md:text-lg
                      whitespace-pre-line
                    ">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
