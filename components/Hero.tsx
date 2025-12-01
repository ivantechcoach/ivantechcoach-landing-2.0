"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, UserCheck } from "lucide-react";
import WaveCanvas from '@/components/WaveCanvas';

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
      className="relative overflow-hidden flex items-center justify-center z-10 min-h-[calc(100vh-80px)] section-padding pb-32 md:pb-40 bg-[var(--bg)] text-[var(--text)]"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <WaveCanvas />
      </div>
      <div className="relative z-10 container-custom grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--text)] leading-tight">
            {content.title}
            <span className="text-[var(--primary)]">.</span>
          </h1>

          <p className="text-xl md:text-2xl text-[var(--text-soft)] leading-relaxed max-w-lg">
            {content.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="#contact"
              className="px-8 py-4 bg-[var(--primary)] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[var(--primary-dark)] hover:scale-105 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
            >
              {content.ctaPrimary}
              <ArrowRight size={20} aria-hidden="true" />
            </Link>

            <Link
              href="#services"
              className="px-8 py-4 border-2 border-[var(--primary)] text-[var(--primary)] rounded-full font-semibold text-lg hover:bg-[var(--primary)]/10 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-80 h-80" aria-label="Terminal visualization">
            <div className="absolute inset-0 bg-[var(--glow)] rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>

            <div className="relative z-10 p-8 border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4 border-b border-[var(--border)] pb-4" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-[var(--text-soft)] ml-auto">{terminal.status}</span>
              </div>

              <div className="space-y-3 font-mono text-sm text-[var(--primary-light)]" role="text" aria-label="System status messages">
                <p>{">"} {terminal.line1}</p>
                <p>{">"} {terminal.line2}</p>
                <p className="text-[var(--text)]">{">"} {terminal.line3}</p>
                <p className="text-green-400 flex items-center gap-2">
                  <UserCheck size={16} aria-hidden="true" /> {terminal.line4}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
