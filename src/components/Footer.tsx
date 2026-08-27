'use client';

import React from 'react';
import { Instagram, Youtube, Linkedin, Github } from 'lucide-react';

export interface FooterProps {
  content?: {
    tagline?: string;
    rights?: string;
    madeBy?: string;
    social?: {
      instagram?: string;
      youtube?: string;
      linkedin?: string;
      github?: string;
    };
  };
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  const currentYear = new Date().getFullYear();

  if (content && content.social) {
    const socialLinks = [
      { icon: Instagram, href: content.social.instagram || '#', label: 'Instagram' },
      { icon: Youtube, href: content.social.youtube || '#', label: 'YouTube' },
      { icon: Linkedin, href: content.social.linkedin || '#', label: 'LinkedIn' },
      { icon: Github, href: content.social.github || '#', label: 'GitHub' },
    ];

    return (
      <footer className="relative bg-transparent border-t border-[var(--border)] py-12" role="contentinfo">
        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center gap-6">
            <nav className="flex gap-4" aria-label="Social media links">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    w-12 h-12
                    flex items-center justify-center
                    rounded-full
                    bg-[var(--card)]
                    text-[var(--text-soft)]
                    border border-[var(--border)]
                    hover:bg-[var(--primary)]/20
                    hover:text-[var(--primary-dark)]
                    hover:scale-110
                    hover:shadow-lg
                    hover:shadow-[var(--glow)]
                    hover:border-[var(--primary)]
                    transition-all duration-[var(--anim-base)] ease-out
                    focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2
                  "
                  aria-label={label}
                  style={{ willChange: 'transform, background-color, box-shadow' }}
                >
                  <Icon 
                    size={22} 
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              ))}
            </nav>

            <p className="text-[var(--text-soft)] text-sm text-center">
              © {currentYear} {content.rights || 'Ivan Tech Coach. Todos los derechos reservados.'}
            </p>

            {content.madeBy && (
              <p className="text-[var(--text-soft)] text-xs text-center max-w-2xl">
                {content.madeBy}
              </p>
            )}
          </div>
        </div>
      </footer>
    );
  }

  const legalLinks = [
    { href: '/politica-privacidad', label: 'Política de Privacidad' },
    { href: '/politica-cookies', label: 'Política de Cookies' },
    { href: '/terminos-condiciones', label: 'Términos y Condiciones' },
  ];

  return (
    <footer className="border-t border-border bg-secondary/20" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Legal Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {currentYear} IvanTechCoach. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
