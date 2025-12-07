"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, UserCheck } from "lucide-react";

interface HeroProps {
  lang: string;
  content: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

const Hero: React.FC<HeroProps> = ({ lang, content }) => {
  const terminalContent = {
    es: {
      status: "Estado del Sistema: Saludable",
      line1: "Iniciando protocolo...",
      line2: "Eliminando humo tecnológico...",
      line3: "Solución encontrada.",
      line4: "Cliente feliz",
    },
    en: {
      status: "System Status: Healthy",
      line1: "Initializing protocol...",
      line2: "Removing tech smoke...",
      line3: "Solution found.",
      line4: "Happy client",
    },
  };

  const terminal = terminalContent[lang as keyof typeof terminalContent] || terminalContent.es;

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex items-center justify-center z-10 min-h-[85vh] section-padding pb-16 md:pb-20 bg-transparent text-[var(--text)]"
      aria-label="Hero section"
    >
      {/* Animated Liquid Blur Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 via-[var(--primary)]/10 to-transparent opacity-60" />
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-[var(--primary)]/30 animate-pulse"
          style={{
            animation: 'liquidBlur 8s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-[var(--primary)]/20 animate-pulse"
          style={{
            animation: 'liquidBlur 10s ease-in-out infinite reverse',
            animationDelay: '2s',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl bg-[var(--primary)]/15 animate-pulse"
          style={{
            animation: 'liquidBlur 12s ease-in-out infinite',
            animationDelay: '4s',
          }}
        />
      </div>

      <div className="relative z-10 container-custom grid md:grid-cols-2 gap-16 items-center mb-0 pb-0">
        <div className="space-y-8 text-center md:text-left">
          {/* Animated Gradient Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            <span 
              className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)] bg-clip-text text-transparent animate-gradient"
              style={{
                backgroundSize: '200% auto',
                animation: 'gradientShift 3s ease infinite',
              }}
            >
              {content.title.split('.')[0]}
            </span>
            <span className="text-[var(--text)]">.</span>
          </h1>

          <p className="text-xl md:text-2xl text-[var(--text-soft)] leading-relaxed max-w-lg">
            {content.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href={`/${lang}/contact`}
              className="interactive px-8 py-4 bg-[var(--primary)] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[var(--primary-dark)] hover:scale-105 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
              style={{
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              }}
            >
              {content.ctaPrimary}
              <ArrowRight size={20} aria-hidden="true" />
            </Link>

            <Link
              href="#services"
              className="interactive px-8 py-4 rounded-full font-semibold text-lg text-white hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)] hero-secondary-cta"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Glassmorphism Card */}
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-80 h-80" aria-label="Terminal visualization">
            <div className="absolute inset-0 bg-[var(--glow)] rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>

            <div 
              className="interactive relative z-10 p-8 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-xl shadow-[var(--card-shadow)] transform rotate-3 hover:rotate-0 transition-all duration-500 backdrop-blur-xl before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)] before:pointer-events-none"
            >
              <div className="flex items-center gap-3 mb-4 border-b border-[var(--border)] pb-4 relative z-10" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-[var(--text-soft)] ml-auto">{terminal.status}</span>
              </div>

              <div className="space-y-3 font-mono text-sm text-[var(--primary-light)] relative z-10" role="text" aria-label="System status messages">
                <p className="text-[var(--text)]">{">"} {terminal.line1}</p>
                <p className="text-[var(--text)]">{">"} {terminal.line2}</p>
                <p className="text-[var(--text)]">{">"} {terminal.line3}</p>
                <p className="text-green-400 flex items-center gap-2">
                  <UserCheck size={16} aria-hidden="true" /> {terminal.line4}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes liquidBlur {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.8;
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
            opacity: 0.4;
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .hero-secondary-cta {
          background: rgba(255,255,255,0.15);
          border: 1px solid var(--primary-light);
          backdrop-filter: blur(8px);
          color: #ffffff;
        }

        .hero-secondary-cta:hover {
          background: rgba(255,255,255,0.25);
          border-color: var(--primary);
          color: #ffffff;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-bounce,
          [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
