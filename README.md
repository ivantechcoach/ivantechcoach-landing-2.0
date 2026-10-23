# Ivan Tech Coach — AI & Systems Engineering Advisory Platform

Plataforma profesional trilingüe (`ES` · `CA` · `EN`) de **Jaime Iván Rodríguez Morales (Ivan Tech Coach)**: más de 20 años de experiencia real en **Infraestructura TI, Hardware, Redes (Cisco CCNA) y Ciberseguridad (Google / FUNDAE)** integrados con **Asesoría Práctica en Modelos de Inteligencia Artificial y Automatización Operativa** desde El Vendrell, Tarragona (Catalunya) hacia clientes locales e internacionales.

---

## 🎨 Sistema de Diseño: Refero Styles (`DESIGN.md`)

La interfaz sigue el estándar **`DESIGN.md`** extraído de **[Refero Styles](https://styles.refero.design/)** bajo la filosofía **"Zero Tech Smoke"** (cero *blobs* decorativos, cero consumo innecesario de GPU, máxima precisión instrumental):

- **Modo Oscuro (Por defecto — `.theme-dark`)**: *Obsidian Command Center* (inspirado en **Warp** y **Raycast** — lienzo `#040506`, tarjetas `#121418`, texto hueso cálido `#faf9f6`, bordes estructurales `1px` y telemetría esmeralda `#10b981` + violeta fósforo `#cbb0f7`).
- **Modo Claro (Editorial — `.theme-light`)**: *Engineering Dossier on Warm Parchment* (inspirado en **Pravah** y **Anthropic** — pergamino cálido `#f3f1ed`, tarjetas `#ffffff`, tinta `#181011` y bordes hueso `#d8d4ce`).
- **Montaje Óptico Concéntrico Sincronizado (`InstrumentFrame.tsx`)**: Sistema de profundidad para retrato y marca con doble anillo concéntrico, canal rebajado de instrumento (`4px–5px`), matriz de puntos circular (`closest-side`) y escuadras ópticas esmeralda sincronizadas en ambos temas.

---

## 🖥️ Características Principales de UI/UX

- **Arquitectura Trilingüe Nativa (`ES · CA · EN`)**: Paridad estructural 1:1 entre `content/es.json`, `content/ca.json` y `content/en.json`, detección automática `Accept-Language` en `middleware.ts`, selector táctil segmentado en cabecera y metadatos SEO/OpenGraph (`es_ES`, `ca_ES`, `en_US`).
- **Consola Interactiva de Diagnóstico IA + Sistemas (`Hero.tsx`)**: Simulador en tiempo real con 4 escenarios empresariales verificados (*MOD-01 Datos Cloud & IA Privada*, *MOD-02 Ciberseguridad para IA*, *MOD-03 Hardware AI-Ready vs Cloud* y *MOD-04 Automatización & SOPs IA*).
- **Paleta de Comandos Estilo Cockpit (`⌘K` / `Ctrl+K` en `Header.tsx`)**: Acceso instantáneo por teclado a diagnósticos de IA, navegación de módulos, alternancia de tema e idioma.
- **Bento Grid Técnico de Capacidades (`Services.tsx`)**: Matriz de 6 módulos (`SYS-01` a `SYS-06`) con métricas verificadas de impacto y etiquetas de stack técnico.
- **Dossier de Trayectoria y Credenciales Verificadas (`About.tsx` & `AboutPage.tsx`)**: Indicadores auditables (`95% FCR`, `-30% Costo Hardware`, `+200 GB Cloud Migrados`, `-25% Downtime`) y registro de certificaciones (`FUNDAE 2025`, `Google Cybersecurity 2024`, `Cisco CCNA 1–3`, `TSU Informática`).
- **Consola de Transmisión de Diagnóstico (`ContactForm.tsx`)**: Canal de contacto endurecido bajo criterios OWASP/RGPD con validación trilingüe en cliente y servidor.
- **Gobernanza Agéntica y Docs-as-Code**:
  - [`DESIGN.md`](./DESIGN.md): Especificación completa de tokens y reglas visuales.
  - [`AGENTS.md`](./AGENTS.md) y [`.agents/rules/`](./.agents/rules/): Reglas obligatorias de seguridad (OWASP/OPSEC), rendimiento y tipado.
  - [`.agents/skills/`](./.agents/skills/): 4 Skills modulares (`itc-refero-design-system`, `itc-cv-ai-content-guard`, `itc-qa-security-gate`, `itc-obsidian-github-sync`).
  - [`docs/`](./docs/): Bóveda de documentación estructurada en *Johnny.Decimal* y vinculada en local con **Obsidian** (`D:\obsidian\IvanTechCoach-Web`).

---

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router) + React 18
- **Tipado**: TypeScript 5 (Strict Mode)
- **Estilos y Tipografía**: Tailwind CSS + CSS Custom Properties + `Inter` & `JetBrains Mono`
- **Calidad y Accesibilidad**: ESLint (0 warnings), Jest 30, React Testing Library y `jest-axe` (WCAG 2.1 AA — 9 suites / 51 tests)
- **Gestor de Paquetes**: **`pnpm` exclusivo** (endurecimiento de cadena de suministro)

---

## 📜 Comandos de Desarrollo y Verificación (`pnpm` exclusivo)

```bash
# Servidor de desarrollo
pnpm run dev

# Compuertas de Calidad (QA Gate)
pnpm run lint        # Verificación ESLint (0 warnings, 0 errors)
pnpm run typecheck   # Verificación estricta TypeScript (tsc --noEmit)
pnpm run test        # Suite de pruebas unitarias, paridad trilingüe UTF-8 y accesibilidad (jest-axe)
pnpm run build       # Compilación estática (SSG) de producción Next.js (/es, /ca, /en)

# Ejecución integral (Lint + Typecheck + Test + Build)
pnpm run qa
```
