"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  Terminal,
  Search,
  Cpu,
  ShieldCheck,
  Database,
  Workflow,
  ArrowUpRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import InstrumentFrame from "@/components/InstrumentFrame";
import { supportedLanguages, type SupportedLanguage } from "@/lib/content";

interface HeaderProps {
  lang: string;
  content: {
    nav: {
      home?: string;
      about: string;
      services: string;
      contact: string;
      commandHint?: string;
    };
    commandPalette?: {
      placeholder: string;
      empty: string;
      groups: {
        aiScenarios: string;
        navigation: string;
        preferences: string;
      };
      actions: {
        toggleTheme: string;
        toggleLang: string;
        goContact: string;
        goServices: string;
        goAbout: string;
      };
    };
  };
}

type ThemeMode = "light" | "dark";
const themes: ThemeMode[] = ["dark", "light"];

function resolveLang(langProp: string | undefined, pathname: string | null): SupportedLanguage {
  if (langProp && supportedLanguages.includes(langProp as SupportedLanguage)) {
    return langProp as SupportedLanguage;
  }
  if (pathname?.startsWith("/en")) return "en";
  if (pathname?.startsWith("/ca")) return "ca";
  return "es";
}

const Header: React.FC<HeaderProps> = ({ lang: langProp, content }) => {
  const pathname = usePathname();
  const router = useRouter();

  const lang = resolveLang(langProp, pathname);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("itc-theme") as ThemeMode | null;
    const initialTheme = stored && themes.includes(stored) ? stored : "dark";
    setTheme(initialTheme);

    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${initialTheme}`);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || commandOpen ? "hidden" : "";
  }, [mobileOpen, commandOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const shouldReopen = sessionStorage.getItem("itc-keep-menu");
    if (shouldReopen) {
      setMobileOpen(true);
      sessionStorage.removeItem("itc-keep-menu");
    }
  }, []);

  // Keyboard shortcut ⌘K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      } else if (e.key === "Escape" && commandOpen) {
        setCommandOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandOpen]);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${mode}`);
  };

  const toggleTheme = useCallback(() => {
    const newTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    window.localStorage.setItem("itc-theme", newTheme);
    applyTheme(newTheme);
  }, [theme]);

  const switchToLang = useCallback(
    (nextLang: SupportedLanguage) => {
      if (nextLang === lang) return;

      if (mobileOpen) {
        sessionStorage.setItem("itc-keep-menu", "1");
      } else {
        sessionStorage.removeItem("itc-keep-menu");
      }

      const currentPath = pathname || `/${lang}`;
      const segments = currentPath.split("/");
      if (segments.length > 1 && supportedLanguages.includes(segments[1] as SupportedLanguage)) {
        segments[1] = nextLang;
      } else {
        segments.splice(1, 0, nextLang);
      }
      const newPath = segments.join("/") || `/${nextLang}`;
      router.replace(newPath, { scroll: false });
    },
    [lang, mobileOpen, pathname, router]
  );

  const cycleLang = useCallback(() => {
    const idx = supportedLanguages.indexOf(lang);
    const nextLang = supportedLanguages[(idx + 1) % supportedLanguages.length];
    switchToLang(nextLang);
  }, [lang, switchToLang]);

  const triggerSimulatorScenario = (scenarioId: string) => {
    setCommandOpen(false);
    const heroEl = document.getElementById("hero-simulator");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    window.dispatchEvent(
      new CustomEvent("itc:select-scenario", { detail: { id: scenarioId } })
    );
  };

  const cp = content.commandPalette || {
    placeholder:
      lang === "en"
        ? "Search AI service, infrastructure case, or command..."
        : lang === "ca"
          ? "Cercar servei d'IA, cas d'infraestructura o comanda..."
          : "Buscar servicio de IA, caso de infraestructura o comando...",
    empty:
      lang === "en"
        ? "No matching commands found."
        : lang === "ca"
          ? "No s'han trobat comandes coincidents."
          : "No se encontraron comandos coincidentes.",
    groups: {
      aiScenarios:
        lang === "en"
          ? "Applied AI & Architecture Simulator"
          : lang === "ca"
            ? "Simulador d'Arquitectura i IA Aplicada"
            : "Simulador de Arquitectura e IA Aplicada",
      navigation:
        lang === "en"
          ? "Direct Navigation"
          : lang === "ca"
            ? "Navegació Directa"
            : "Navegación Directa",
      preferences:
        lang === "en"
          ? "System Preferences"
          : lang === "ca"
            ? "Preferències del Sistema"
            : "Preferencias del Sistema",
    },
    actions: {
      toggleTheme:
        lang === "en"
          ? "Toggle Theme (Obsidian Dark / Parchment Dossier)"
          : lang === "ca"
            ? "Alternar Tema (Obsidian Fosc / Dossier Pergamí)"
            : "Alternar Tema (Obsidian Oscuro / Dossier Pergamino)",
      toggleLang:
        lang === "en"
          ? "Switch Language (ES · CA · EN)"
          : lang === "ca"
            ? "Canviar Idioma (ES · CA · EN)"
            : "Cambiar Idioma (ES · CA · EN)",
      goContact:
        lang === "en"
          ? "Schedule Technical & AI Diagnostic"
          : lang === "ca"
            ? "Programar Diagnòstic Tècnic i d'IA"
            : "Agendar Diagnóstico Técnico e IA",
      goServices:
        lang === "en"
          ? "Explore AI + Systems Service Matrix"
          : lang === "ca"
            ? "Explorar Matriu de Serveis IA + Sistemes"
            : "Explorar Matriz de Servicios IA + Sistemas",
      goAbout:
        lang === "en"
          ? "View 20+ Year Dossier & Certifications"
          : lang === "ca"
            ? "Veure Dossier de +20 Anys i Certificacions"
            : "Ver Dossier de +20 Años y Certificaciones",
    },
  };

  const commandItems = [
    {
      id: "mod-01",
      group: cp.groups.aiScenarios,
      label:
        lang === "en"
          ? "[MOD-01] Cloud Data Restructuring & Private AI (SharePoint / RAG)"
          : lang === "ca"
            ? "[MOD-01] Dades Cloud & IA Privada (SharePoint / M365 / RAG)"
            : "[MOD-01] Datos Cloud & IA Privada (SharePoint / M365 / RAG)",
      icon: Database,
      action: () => triggerSimulatorScenario("cloud-rag"),
    },
    {
      id: "mod-02",
      group: cp.groups.aiScenarios,
      label:
        lang === "en"
          ? "[MOD-02] Cybersecurity, Network Hardening & AI Governance"
          : lang === "ca"
            ? "[MOD-02] Ciberseguretat, Xarxes CCNA i Governança per a IA"
            : "[MOD-02] Ciberseguridad, Redes CCNA y Gobernanza para IA",
      icon: ShieldCheck,
      action: () => triggerSimulatorScenario("sec-governance"),
    },
    {
      id: "mod-03",
      group: cp.groups.aiScenarios,
      label:
        lang === "en"
          ? "[MOD-03] AI-Ready Hardware & GPU Sizing vs. Cloud APIs"
          : lang === "ca"
            ? "[MOD-03] Dimensionament Maquinari AI-Ready i GPUs vs. Cloud"
            : "[MOD-03] Dimensionamiento Hardware AI-Ready y GPUs vs. Cloud",
      icon: Cpu,
      action: () => triggerSimulatorScenario("hardware-llm"),
    },
    {
      id: "mod-04",
      group: cp.groups.aiScenarios,
      label:
        lang === "en"
          ? "[MOD-04] Operational Workflow Automation & AI-Assisted SOPs"
          : lang === "ca"
            ? "[MOD-04] Automatització Operativa (n8n) i SOPs amb IA"
            : "[MOD-04] Automatización Operativa (n8n) y SOPs con IA",
      icon: Workflow,
      action: () => triggerSimulatorScenario("ops-automation"),
    },
    {
      id: "nav-services",
      group: cp.groups.navigation,
      label: cp.actions.goServices,
      icon: ArrowUpRight,
      action: () => {
        setCommandOpen(false);
        router.push(`/${lang}/services`);
      },
    },
    {
      id: "nav-about",
      group: cp.groups.navigation,
      label: cp.actions.goAbout,
      icon: ArrowUpRight,
      action: () => {
        setCommandOpen(false);
        router.push(`/${lang}/about`);
      },
    },
    {
      id: "nav-contact",
      group: cp.groups.navigation,
      label: cp.actions.goContact,
      icon: ArrowUpRight,
      action: () => {
        setCommandOpen(false);
        router.push(`/${lang}/contact`);
      },
    },
    {
      id: "pref-theme",
      group: cp.groups.preferences,
      label: cp.actions.toggleTheme,
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        toggleTheme();
        setCommandOpen(false);
      },
    },
    {
      id: "pref-lang",
      group: cp.groups.preferences,
      label: cp.actions.toggleLang,
      icon: Globe,
      action: () => {
        cycleLang();
        setCommandOpen(false);
      },
    },
  ];

  const filteredCommands = commandItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 bg-[var(--nav)] text-[var(--text)] border-b border-[var(--border)] ${
        isScrolled ? "backdrop-blur-xl" : "backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity + System Telemetry Status */}
        <div className="flex items-center gap-4">
          <Link
            href={`/${lang}`}
            prefetch={false}
            className="group flex items-center gap-3 text-[var(--text)] focus:outline-none"
          >
            <InstrumentFrame
              size="sm"
              radius="rounded-lg"
              className="w-9 h-9 sm:w-10 sm:h-10"
            >
              <Image
                src="/images/logo.png"
                alt="Ivan Tech Coach"
                width={40}
                height={40}
                priority
                className="w-full h-full object-contain p-1"
              />
            </InstrumentFrame>
            <div className="flex flex-col">
              <span className="font-bold text-sm md:text-base tracking-tight leading-none text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                Ivan Tech Coach
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-[var(--text-muted)] mt-1 inline-flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
                  aria-hidden="true"
                />
                <span>AI · SYSTEMS · SEC</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm"
          aria-label="Main navigation"
        >
          <Link
            href={`/${lang}/about`}
            prefetch={false}
            className="text-[var(--text-soft)] hover:text-[var(--text)] transition-colors font-medium"
          >
            {content.nav.about}
          </Link>

          <Link
            href={`/${lang}/services`}
            prefetch={false}
            className="text-[var(--text-soft)] hover:text-[var(--text)] transition-colors font-medium"
          >
            {content.nav.services}
          </Link>

          <Link
            href={`/${lang}/contact`}
            prefetch={false}
            className="text-[var(--text-soft)] hover:text-[var(--text)] transition-colors font-medium"
          >
            {content.nav.contact}
          </Link>

          {/* Raycast / Warp Style Command Bar Trigger (⌘K) */}
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            aria-label={
              content.nav.commandHint ||
              (lang === "en"
                ? "Open AI Command Palette"
                : lang === "ca"
                  ? "Obrir paleta de comandes IA"
                  : "Abrir paleta de comandos IA")
            }
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--card-elevated)] border border-[var(--border)] hover:border-[var(--border-strong)] text-xs text-[var(--text-soft)] hover:text-[var(--text)] transition-all"
          >
            <Terminal size={13} className="text-[var(--primary)]" aria-hidden="true" />
            <span className="hidden lg:inline">
              {content.nav.commandHint ||
                (lang === "en"
                  ? "AI Diagnostics"
                  : lang === "ca"
                    ? "Diagnòstic IA"
                    : "Diagnóstico IA")}
            </span>
            <kbd className="tactile-kbd">⌘K</kbd>
          </button>

          <div className="h-4 w-[1px] bg-[var(--border)]" aria-hidden="true" />

          {/* Trilingual Segmented Switcher (ES · CA · EN) */}
          <div
            role="group"
            aria-label={
              lang === "en"
                ? "Language selector"
                : lang === "ca"
                  ? "Selector d'idioma"
                  : "Selector de idioma"
            }
            className="inline-flex items-center gap-0.5 p-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs font-mono"
          >
            <Globe size={13} className="text-[var(--text-muted)] mx-1" aria-hidden="true" />
            {supportedLanguages.map((code) => {
              const active = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => switchToLang(code)}
                  aria-pressed={active}
                  aria-label={`Switch language to ${code.toUpperCase()}`}
                  className={`px-2 py-0.5 rounded uppercase transition-colors ${
                    active
                      ? "bg-[var(--card-elevated)] text-[var(--primary)] border border-[var(--border-strong)] font-semibold"
                      : "text-[var(--text-soft)] hover:text-[var(--text)]"
                  }`}
                >
                  {code}
                </button>
              );
            })}
          </div>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to Light Engineering Dossier theme"
                : "Switch to Dark Obsidian Command Center theme"
            }
            className="p-2 rounded-lg bg-[var(--card)] hover:bg-[var(--card-elevated)] border border-[var(--border)] hover:border-[var(--border-strong)] text-[var(--text-soft)] hover:text-[var(--text)] transition-colors"
          >
            {theme === "dark" ? (
              <Sun size={15} aria-hidden="true" />
            ) : (
              <Moon size={15} aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            aria-label={
              lang === "en"
                ? "Open AI Command Palette"
                : lang === "ca"
                  ? "Obrir comandes IA"
                  : "Abrir comandos IA"
            }
            className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text-soft)]"
          >
            <Terminal size={18} className="text-[var(--primary)]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
          >
            {mobileOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mounted &&
        mobileOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="fixed top-0 right-0 w-72 h-full bg-[var(--bg)] text-[var(--text)] border-l border-[var(--border)] p-6 flex flex-col gap-6 z-[9999]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  {"[SYS-NAV // MENU]"}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close mobile menu"
                  className="p-1.5 rounded-md border border-[var(--border)] text-[var(--text-soft)]"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-col gap-4 text-base font-medium">
                <Link
                  href={`/${lang}/about`}
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 border-b border-[var(--border)] hover:text-[var(--primary)] transition-colors"
                >
                  {content.nav.about}
                </Link>

                <Link
                  href={`/${lang}/services`}
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 border-b border-[var(--border)] hover:text-[var(--primary)] transition-colors"
                >
                  {content.nav.services}
                </Link>

                <Link
                  href={`/${lang}/contact`}
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 border-b border-[var(--border)] hover:text-[var(--primary)] transition-colors"
                >
                  {content.nav.contact}
                </Link>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm font-mono">
                  <span className="flex items-center gap-2 text-xs">
                    <Globe size={15} aria-hidden="true" />
                    {lang === "en" ? "Language" : "Idioma"}
                  </span>
                  <div className="inline-flex items-center gap-1">
                    {supportedLanguages.map((code) => {
                      const active = lang === code;
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => switchToLang(code)}
                          aria-pressed={active}
                          className={`px-2 py-0.5 rounded text-xs uppercase transition-colors ${
                            active
                              ? "bg-[var(--card-elevated)] text-[var(--primary)] border border-[var(--border-strong)] font-semibold"
                              : "text-[var(--text-soft)] hover:text-[var(--text)]"
                          }`}
                        >
                          {code}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle color theme"
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm font-mono"
                >
                  <span className="flex items-center gap-2">
                    {theme === "dark" ? (
                      <Sun size={16} aria-hidden="true" />
                    ) : (
                      <Moon size={16} aria-hidden="true" />
                    )}
                    {lang === "en" ? "Theme" : "Tema"}
                  </span>
                  <span className="uppercase text-[var(--text-soft)]">
                    {theme === "dark" ? "Obsidian" : "Dossier"}
                  </span>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Command Palette Modal (⌘K / Ctrl+K) */}
      {mounted &&
        commandOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9999] flex items-start justify-center pt-20 px-4"
            onClick={() => setCommandOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="AI & Systems Command Palette"
          >
            <div
              className="w-full max-w-xl bg-[var(--card)] border border-[var(--border-strong)] rounded-xl shadow-2xl overflow-hidden animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)] bg-[var(--card-elevated)]">
                <Search
                  size={16}
                  className="text-[var(--primary)] flex-shrink-0"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={cp.placeholder}
                  aria-label={cp.placeholder}
                  autoFocus
                  className="w-full bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setCommandOpen(false)}
                  aria-label="Close command palette"
                  className="tactile-kbd hover:text-[var(--text)]"
                >
                  ESC
                </button>
              </div>

              {/* Command List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredCommands.length === 0 ? (
                  <p className="py-8 text-center text-xs font-mono text-[var(--text-muted)]">
                    {cp.empty}
                  </p>
                ) : (
                  filteredCommands.map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        type="button"
                        onClick={cmd.action}
                        className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left text-xs sm:text-sm text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--card-elevated)] transition-colors group"
                      >
                        <span className="flex items-center gap-3 truncate">
                          <Icon
                            size={15}
                            className="text-[var(--primary)] flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span className="truncate">{cmd.label}</span>
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--accent-violet)] hidden sm:inline">
                          {cmd.group.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Command Footer Telemetry */}
              <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--bg)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>{"IVAN TECH COACH // COCKPIT v2.0"}</span>
                <span>20+ YRS INFRA · SEC · AI</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default Header;
