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
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="relative section-padding bg-transparent text-[var(--text)] border-b border-[var(--border)]"
      aria-labelledby="faq-title"
    >
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="telemetry-eyebrow">{"[SYS-FAQ // PROTOCOLOS Y CRITERIO]"}</span>
          <h2
            id="faq-title"
            className="tracking-[-0.025em] leading-tight text-3xl md:text-4xl font-bold text-[var(--text)]"
          >
            {content.title}
          </h2>
          <p className="text-base md:text-lg text-[var(--text-soft)]">{content.subtitle}</p>
        </div>

        <div className="max-w-4xl space-y-3">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index
            const code = `Q-0${index + 1}`

            return (
              <div
                key={index}
                className="blueprint-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-[var(--card-elevated)] transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-baseline gap-3 pr-4">
                    <span className="font-mono text-xs text-[var(--primary)] flex-shrink-0">
                      [{code}]
                    </span>
                    <h3 className="text-base md:text-lg font-semibold text-[var(--text)]">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--text-muted)] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[var(--primary)]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-[800px] opacity-100 border-t border-[var(--border)]' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-5 bg-[var(--bg)] text-[var(--text-soft)] leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {item.answer}
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
