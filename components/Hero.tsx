"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  ShieldCheck,
  Cpu,
  Database,
  Workflow,
  CheckCircle2,
} from "lucide-react";

interface SimulatorScenario {
  id: string;
  code: string;
  tab: string;
  problem: string;
  architecture: string;
  security: string;
  impact: string;
}

interface HeroProps {
  lang: string;
  content: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    metricsStrip?: Array<{
      value: string;
      label: string;
    }>;
    simulator?: {
      headerTitle: string;
      statusBadge: string;
      scenarioLabel: string;
      labels: {
        problem: string;
        architecture: string;
        security: string;
        impact: string;
      };
      scenarios: SimulatorScenario[];
    };
  };
}

const defaultScenariosEs: SimulatorScenario[] = [
  {
    id: "cloud-rag",
    code: "MOD-01",
    tab: "Datos Cloud & IA Privada",
    problem:
      "«Queremos usar IA con nuestros presupuestos, contratos y manuales, pero tenemos cientos de gigabytes desordenados y miedo a filtrar datos confidenciales.»",
    architecture:
      "Reestructuración en Microsoft 365 (SharePoint / OneDrive) o Google Workspace + despliegue de asistentes sobre corpus documental limpio (Claude Enterprise / Copilot / RAG privado).",
    security:
      "Segmentación de permisos por rol, políticas Zero-Data-Retention en llamadas a modelos y trazabilidad de acceso.",
    impact:
      "+40% velocidad de recuperación documental (caso real +200 GB migrados en MASMEL).",
  },
  {
    id: "sec-governance",
    code: "MOD-02",
    tab: "Ciberseguridad para IA",
    problem:
      "«Nuestro equipo ya usa ChatGPT o Claude por su cuenta sin control técnico, exponiendo credenciales, clientes y la red interna.»",
    architecture:
      "Protocolo de gobernanza de modelos de IA, estandarización de cuentas corporativas y pasarelas de acceso auditadas.",
    security:
      "Hardening de endpoints (Windows, Linux, macOS), segmentación de red LAN/WAN (criterio Cisco CCNA) y controles Google Cybersecurity / FUNDAE.",
    impact:
      "100% disponibilidad en operaciones críticas y -25% en tiempo de inactividad mensual.",
  },
  {
    id: "hardware-llm",
    code: "MOD-03",
    tab: "Hardware AI-Ready vs Cloud",
    problem:
      "«No sabemos si pagar licencias mensuales de IA en la nube o invertir en estaciones de trabajo con GPU para correr modelos locales privados.»",
    architecture:
      "Auditoría de cargas de trabajo: inferencia local (Ollama / vLLM / Open-Weights) para datos sensibles frente a APIs frontier (Claude / GPT) para razonamiento complejo.",
    security:
      "Dimensionamiento exacto de VRAM, GPU, RAM y almacenamiento local sin sobreprecio comercial.",
    impact:
      "-30% ahorro en inversión de hardware, +40% rendimiento por estación y +3 años de vida útil.",
  },
  {
    id: "ops-automation",
    code: "MOD-04",
    tab: "Automatización & SOPs IA",
    problem:
      "«Perdemos horas cada semana en soporte repetitivo, redacción de informes técnicos y formación de nuevo personal.»",
    architecture:
      "Flujos automatizados (n8n / APIs de modelos) integrados con guías operativas estandarizadas (SOPs) asistidas por IA.",
    security:
      "Validación humana en el bucle (Human-in-the-Loop) y control de errores antes de producción.",
    impact:
      "-30% en incidencias recurrentes y -20% en tiempo de incorporación (onboarding) de personal.",
  },
];

const scenarioIconMap: Record<string, React.ElementType> = {
  "cloud-rag": Database,
  "sec-governance": ShieldCheck,
  "hardware-llm": Cpu,
  "ops-automation": Workflow,
};

const Hero: React.FC<HeroProps> = ({ lang, content }) => {
  const scenarios =
    content.simulator?.scenarios && content.simulator.scenarios.length > 0
      ? content.simulator.scenarios
      : defaultScenariosEs;

  const [activeId, setActiveId] = useState<string>(scenarios[0].id);

  // Listen for Command Palette (⌘K) scenario selection events
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string }>;
      if (customEvent.detail?.id) {
        setActiveId(customEvent.detail.id);
      }
    };
    window.addEventListener("itc:select-scenario", handler);
    return () => window.removeEventListener("itc:select-scenario", handler);
  }, []);

  const activeScenario =
    scenarios.find((s) => s.id === activeId) || scenarios[0];

  const metricsStrip = content.metricsStrip || [
    {
      value: lang === "en" ? "20+ Years" : "20+ Años",
      label:
        lang === "en"
          ? "Systems, Networks & Hardware"
          : "Sistemas, Redes y Hardware",
    },
    {
      value: "95% FCR",
      label:
        lang === "en"
          ? "First-Contact Resolution"
          : "Resolución en 1er Contacto",
    },
    {
      value: "+200 GB",
      label:
        lang === "en" ? "Structured Cloud Data" : "Datos Cloud Estructurados",
    },
    {
      value: lang === "en" ? "-30% Cost" : "-30% Costo",
      label:
        lang === "en"
          ? "Hardware/IT Optimization"
          : "Optimización Hardware/IT",
    },
  ];

  const simLabels = content.simulator?.labels || {
    problem: lang === "en" ? "FIELD DIAGNOSTIC" : "DIAGNÓSTICO DE CAMPO",
    architecture:
      lang === "en" ? "AI ARCHITECTURE & MODELS" : "ARQUITECTURA Y MODELOS IA",
    security:
      lang === "en"
        ? "SECURITY / INFRASTRUCTURE LAYER"
        : "CAPA DE SEGURIDAD / INFRAESTRUCTURA",
    impact: lang === "en" ? "VERIFIED IMPACT" : "IMPACTO VERIFICADO",
  };

  return (
    <section
      id="hero"
      className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 bg-transparent text-[var(--text)] border-b border-[var(--border)]"
      aria-label="Hero section"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Engineering Authority & Action */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Telemetry Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--border)] max-w-full">
              <span
                className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse flex-shrink-0"
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[var(--text-soft)] leading-snug">
                {content.badge}
              </span>
            </div>

            {/* Refero Display Headline (Warp / Raycast tight tracking) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.06] text-[var(--text)]">
              <span>{content.title.split(".")[0]}</span>
              <span className="text-[var(--primary)]">.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[var(--text-soft)] leading-relaxed max-w-xl">
              {content.subtitle}
            </p>

            {/* Primary & Secondary Cockpit CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <Link
                href={`/${lang}/contact`}
                prefetch={false}
                className="px-6 py-3.5 rounded-lg font-semibold text-sm sm:text-base bg-[var(--cta-bg)] text-[var(--cta-text)] hover:bg-[var(--cta-hover)] transition-colors flex items-center justify-center gap-2"
              >
                {content.ctaPrimary}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <Link
                href="#services"
                className="px-6 py-3.5 rounded-lg font-medium text-sm sm:text-base bg-[var(--card)] hover:bg-[var(--card-elevated)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors flex items-center justify-center"
              >
                {content.ctaSecondary}
              </Link>
            </div>

            {/* Verified Career Metrics Strip */}
            <div className="pt-6 border-t border-[var(--border)] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metricsStrip.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className="font-mono text-lg sm:text-xl font-bold text-[var(--text)] tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] leading-snug">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive AI & Infrastructure Diagnostic Console */}
          <div
            id="hero-simulator"
            className="lg:col-span-6 w-full"
            aria-label="Interactive AI Architecture Diagnostic Console"
          >
            <div className="blueprint-card overflow-hidden">
              {/* Console Top Chrome */}
              <div className="px-4 py-3 bg-[var(--card-elevated)] border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Terminal
                    size={14}
                    className="text-[var(--primary)]"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[var(--text-soft)]">
                    {content.simulator?.headerTitle ||
                      "CONSOLA DE ARQUITECTURA E INFERENCIA"}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg)] text-[var(--primary)] border border-[var(--border)]">
                  {content.simulator?.statusBadge || "TELEMETRÍA ACTIVA"}
                </span>
              </div>

              {/* Interactive Scenario Selector Tabs */}
              <div className="p-3 bg-[var(--bg-2)] border-b border-[var(--border)]">
                <p className="font-mono text-[11px] text-[var(--text-muted)] mb-2">
                  {content.simulator?.scenarioLabel ||
                    "Selecciona un desafío real de negocio:"}
                </p>
                <div
                  className="grid grid-cols-2 gap-1.5"
                  role="tablist"
                  aria-label="AI Advisory Scenarios"
                >
                  {scenarios.map((scenario) => {
                    const isSelected = scenario.id === activeScenario.id;
                    const Icon = scenarioIconMap[scenario.id] || Terminal;
                    return (
                      <button
                        key={scenario.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveId(scenario.id)}
                        className={`px-3 py-2 rounded-lg text-left text-xs font-mono transition-all flex items-center gap-2 border ${
                          isSelected
                            ? "bg-[var(--card-elevated)] text-[var(--text)] border-[var(--primary)]"
                            : "bg-[var(--card)] text-[var(--text-soft)] border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                        }`}
                      >
                        <Icon
                          size={13}
                          className={
                            isSelected
                              ? "text-[var(--primary)] flex-shrink-0"
                              : "text-[var(--text-muted)] flex-shrink-0"
                          }
                          aria-hidden="true"
                        />
                        <span className="truncate">{scenario.tab}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Console Diagnostic Output Panel */}
              <div className="p-5 space-y-4 bg-[var(--card)] text-sm">
                {/* Problem Statement */}
                <div className="p-3.5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      {`[${activeScenario.code} // ${simLabels.problem}]`}
                    </span>
                  </div>
                  <p className="text-[var(--text-soft)] italic leading-relaxed text-xs sm:text-sm">
                    {activeScenario.problem}
                  </p>
                </div>

                {/* Recommended AI Architecture */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-violet)] block">
                    ▸ {simLabels.architecture}
                  </span>
                  <p className="text-[var(--text)] leading-relaxed text-xs sm:text-sm">
                    {activeScenario.architecture}
                  </p>
                </div>

                {/* Security & Systems Layer */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] block">
                    ▸ {simLabels.security}
                  </span>
                  <p className="text-[var(--text-soft)] leading-relaxed text-xs sm:text-sm">
                    {activeScenario.security}
                  </p>
                </div>

                {/* Verified Impact Footer */}
                <div className="pt-3 border-t border-[var(--border)] flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-[var(--primary)] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] block">
                      {simLabels.impact}
                    </span>
                    <p className="font-medium text-[var(--text)] text-xs sm:text-sm">
                      {activeScenario.impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
