"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  lang: string;
  content: {
    nav: {
      about: string;
      services: string;
      contact: string;
    };
  };
}

type ThemeMode = "light" | "dark";

const themes: ThemeMode[] = ["light", "dark"];

const Header: React.FC<HeaderProps> = ({ lang: langProp, content }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  const lang = pathname.startsWith("/en") ? "en" : "es";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");
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
    const initialTheme = (stored && themes.includes(stored)) ? stored : "light";
    setTheme(initialTheme);

    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${initialTheme}`);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

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

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${mode}`);
  };

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    
    requestAnimationFrame(() => {
      setTheme(newTheme);
      window.localStorage.setItem("itc-theme", newTheme);
      applyTheme(newTheme);
    });
  };

  const getThemeIcon = () => {
    return theme === "light" ? <Moon size={18} /> : <Sun size={18} />;
  };

  const toggleLang = () => {
    const nextLang = lang === "es" ? "en" : "es";

    if (mobileOpen) {
      sessionStorage.setItem("itc-keep-menu", "1");
    } else {
      sessionStorage.removeItem("itc-keep-menu");
    }

    const newPath = pathname.replace(`/${lang}`, `/${nextLang}`);

    router.replace(newPath, { scroll: false });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 bg-[var(--nav)] text-[var(--text)] border-b border-[var(--border)] ${
        isScrolled
          ? "backdrop-blur-xl shadow-lg"
          : "backdrop-blur-md"
      }`}
      style={{ willChange: 'background-color, backdrop-filter' }}
    >
      <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href={`/?lang=${lang}`} className="flex items-center gap-3 text-[var(--text)] hover:opacity-80 transition-opacity duration-200">
          <Image
            src="/images/logo.png"
            alt="Ivan Tech Coach Logo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
            priority
          />
          <span className="text-lg md:text-xl font-bold tracking-tight">
            Ivan<span className="font-light">TechCoach</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm md:text-base">
          <a href="#about" className="text-[var(--text)] hover:text-[var(--primary)] transition">
            {content.nav.about}
          </a>

          <a href="#services" className="text-[var(--text)] hover:text-[var(--primary)] transition">
            {content.nav.services}
          </a>

          <Link href={`/${lang}/contact`} className="text-[var(--text)] hover:text-[var(--primary)] transition">
            {content.nav.contact}
          </Link>

          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-2)] transition"
          >
            <Globe size={16} />
            <span className="uppercase text-xs md:text-sm">{lang === "es" ? "EN" : "ES"}</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors"
            title={`Tema: ${theme}`}
          >
            {getThemeIcon()}
          </button>
        </nav>

        <button className="md:hidden text-[var(--text)] p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mounted &&
        mobileOpen &&
        createPortal(
          <div className="
            fixed inset-0 z-[2000] 
            bg-[var(--bg)]
            backdrop-blur-xl 
            flex flex-col
            text-[var(--text)]
          ">
            <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--border)]">
              <div className="flex items-center gap-3 text-[var(--text)]">
                <Image
                  src="/images/logo.png"
                  alt="Ivan Tech Coach Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
                <span className="text-lg font-bold tracking-tight">
                  Ivan<span className="font-light">TechCoach</span>
                </span>
              </div>

              <button className="text-[var(--text)] p-2" onClick={() => setMobileOpen(false)}>
                <X size={26} />
              </button>
            </div>

            <div className="flex-1 px-6 py-8 space-y-6 text-[var(--text)]">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="block text-2xl font-semibold text-left"
              >
                {content.nav.about}
              </button>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="block text-2xl font-semibold text-left"
              >
                {content.nav.services}
              </button>

              <Link
                href={`/${lang}/contact`}
                onClick={() => setMobileOpen(false)}
                className="block text-2xl font-semibold text-left"
              >
                {content.nav.contact}
              </Link>

              <button
                onClick={() => toggleLang()}
                className="mt-6 flex items-center gap-3 text-lg text-[var(--text)]"
              >
                <Globe size={22} />
                {lang === "es" ? "EN" : "ES"}
              </button>

              <button
                onClick={toggleTheme}
                aria-label="Cambiar tema"
                className="mt-6 flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors"
                title={`Tema: ${theme}`}
              >
                {getThemeIcon()}
              </button>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default Header;
