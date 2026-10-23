'use client'

import { Instagram, Youtube, Linkedin, Github } from 'lucide-react'

interface FooterProps {
  content: {
    tagline: string
    rights: string
    madeBy: string
    social: {
      instagram: string
      youtube: string
      linkedin: string
      github: string
    }
  }
}

export function Footer({ content }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: content.social.instagram, label: 'Instagram' },
    { icon: Youtube, href: content.social.youtube, label: 'YouTube' },
    { icon: Linkedin, href: content.social.linkedin, label: 'LinkedIn' },
    { icon: Github, href: content.social.github, label: 'GitHub' },
  ]

  return (
    <footer
      className="relative bg-[var(--bg)] border-t border-[var(--border)] py-12 text-[var(--text)]"
      role="contentinfo"
    >
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border)]">
          <div className="text-center md:text-left space-y-1">
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--primary)]">
              {"IVAN TECH COACH // SYSTEMS · CYBERSECURITY · APPLIED AI"}
            </div>
            <p className="text-sm text-[var(--text-soft)]">{content.tagline}</p>
          </div>

          <nav className="flex gap-3" aria-label="Social media links">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--card)] text-[var(--text-soft)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text)] hover:bg-[var(--card-elevated)] transition-colors"
                aria-label={label}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {currentYear} {content.rights}</p>
          <p className="font-mono text-[11px] text-center sm:text-right max-w-xl">
            {content.madeBy}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
