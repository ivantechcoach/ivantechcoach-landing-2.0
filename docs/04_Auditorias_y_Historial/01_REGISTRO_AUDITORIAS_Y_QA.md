---
title: "01 — Registro de Auditorías Técnicas, QA y Despliegue"
tags:
  - qa
  - auditoria
  - pnpm
  - vercel
  - i18n
  - seguridad
  - dependencias
created: 2026-10-23
updated: 2026-11-21
status: verified
---

# 🛡️ Registro de Auditorías Técnicas y Control de Calidad (QA)

En la raíz del repositorio se conservan los informes históricos de ingeniería que documentan la evolución técnica del proyecto:

- `[QA_IMPLEMENTACION.md](../../QA_IMPLEMENTACION.md)` — Reporte de pruebas unitarias, accesibilidad (`jest-axe`) y calidad.
- `[MIGRACION_PNPM.md](../../MIGRACION_PNPM.md)` y `[LIMPIEZA_NPM.md](../../LIMPIEZA_NPM.md)` — Endurecimiento de la cadena de suministro mediante el uso exclusivo de `pnpm`.
- `[VERCEL_DEPLOYMENT_CHECKLIST.md](../../VERCEL_DEPLOYMENT_CHECKLIST.md)` — Lista de verificación pre-producción.

---

## 📊 Estado Actual de la Barrera de Calidad (2026-10-23 / 2026-10-24)

| Compuerta | Comando | Resultado | Detalle |
| :--- | :--- | :--- | :--- |
| **ESLint** | `pnpm run lint` | ✅ **PASS (0 warnings, 0 errors)** | Corregido `HeroSection.tsx` a `next/image` |
| **TypeScript** | `pnpm run typecheck` | ✅ **PASS (`tsc --noEmit`)** | Tipado estricto en toda la arquitectura trilingüe |
| **Unit & A11y (`jest-axe`)** | `pnpm run test` | ✅ **PASS (`9/9` suites, `51/51` tests)** | Incluye `InstrumentFrame.test.tsx`, paridad `es`/`ca`/`en` y rutas middleware |
| **OPSEC / Git Hygiene** | `git status` | ✅ **PASS** | `/CVs/` protegido en `.gitignore`; cero PII expuesta |

---

## 🔐 Etapa de Endurecimiento de Seguridad de Dependencias (2026-11-21)

Auditoría y remediación de vulnerabilidades de la cadena de suministro npm, con salto mayor de framework aprobado explícitamente. **Punto de partida:** 132 vulnerabilidades (`7 críticas` / `64 altas` / `53 moderadas` / `8 bajas`). **Resultado:** `0` en todos los niveles.

### Barrera de Calidad

| Compuerta | Comando | Resultado | Detalle |
| :--- | :--- | :--- | :--- |
| **Supply Chain** | `pnpm audit --audit-level moderate` | ✅ **PASS (0 vulnerabilidades)** | 132 → 0; *No known vulnerabilities found* |
| **ESLint** | `pnpm run lint` | ✅ **PASS (0 warnings, 0 errors)** | Migrado a flat-config nativo (`eslint.config.mjs`, ESLint 9) |
| **TypeScript** | `pnpm run typecheck` | ✅ **PASS (`tsc --noEmit`)** | `params` asíncrono (Next 16); tipos propios de `nodemailer` v10 |
| **Unit & A11y (`jest-axe`)** | `pnpm run test` | ✅ **PASS (`9/9` suites, `51/51` tests)** | Sin regresión; `ContactForm` verificado |
| **Build** | `pnpm run build` | ✅ **PASS** | Next 16 SSG, 18 rutas (`/es`, `/ca`, `/en`) |
| **Peer deps** | `pnpm install` | ✅ **PASS (0 warnings)** | Retirado `react-day-picker` (arrastró `date-fns@4`) |

### Matriz de Actualización de Versiones

| Paquete | Antes | Después | Motivo |
| :--- | :--- | :--- | :--- |
| `next` | `^14.2.0` | **`16.4.6`** | RCE crítico sin auth (Image Optimization) + DoS/SSRF; solo parcheados en ≥15.5.x/16 |
| `nodemailer` | `^6.9.8` | **`^10.6.1`** | Advisory `<7.0.11`; API `createTransport`/`sendMail` sin cambios |
| `@types/nodemailer` | `^6.4.14` | **(eliminado)** | v10 trae tipos propios; elimina la cadena crítica `@aws-sdk`/`fast-xml-parser` |
| `eslint` | `^8.57.1` | **`^9.39.5`** | Requisito de `eslint-config-next@16` (peer `eslint >=9`) |
| `eslint-config-next` | `14.2.0` | **`16.4.6`** | Flat-config nativo |
| `react-router-dom` | `^7.18.2` | **(eliminado)** | Sin uso (App Router gestiona el enrutado) — etapa previa |
| `react-day-picker` | `^8.10.2` | **(eliminado)** | Sin uso; único consumidor de `date-fns@4` (resolvía warning de peer) |

### Decisiones de Arquitectura

- **Next 15 vs 16:** 14.2.x está en EOL de seguridad (solo 2 backports); el gate `moderate` era imposible sin salto mayor. Decisión del cliente: subir a **16.4.6** (última parcheada). Se descartó Next 17 por no existir. **Requisito nuevo: Node ≥20.9** (verificar runtime de producción en Vercel).
- **Overrides acotados por rango de versión** (`minimatch@>=7 <11.0.1` → `^11.0.9`, `glob@>=9 <=14.0.1` → `^14.0.6`): un override global rompía `@eslint/eslintrc` (usa `minimatch@3` con export `default`); el selector de rango solo reescribe las instancias realmente vulnerables del tooling dev.
- **`react-hooks/set-state-in-effect`** (regla nueva de react-hooks 7): 5 sitios de lectura SSR-safe desde APIs solo-cliente (`matchMedia`/`localStorage`/`sessionStorage`/`innerWidth`) en `Header`, `WarpHover`, `AntigravityLite`. Resueltos con `eslint-disable-next-line` justificado por sitio; la regla sigue activa para el resto del código.
- **Migración Next 16:** `next lint` eliminado → scripts usan `eslint .`; `params` pasa a `Promise` (await) en `[lang]/layout.tsx` + 4 páginas; Next auto-actualizó `tsconfig.json` (`jsx: react-jsx`) y `next-env.d.ts`.

### Trazabilidad

- **Rama:** `chore/security-updates`
- **Commits:** `bccd76c` (seguridad + Next 15.5.29) · `769b4cc` (Next 16.4.6 + ESLint 9 flat-config) · `472dd3a` (limpieza `react-day-picker`)
- **PR:** [#2](https://github.com/ivantechcoach/ivantechcoach-landing-2.0/pull/2) → `main` (abierto, **sin merge**)
- **Preview Vercel:** https://ivantechcoach-landing-2-0-p0zi2h9gj.vercel.app

---

## Comandos Estándar de Verificación (`pnpm`)
```bash
pnpm run lint       # ESLint (0 warnings)
pnpm run typecheck  # TypeScript (tsc --noEmit)
pnpm run test       # Jest + Testing Library + Jest-Axe (51 tests)
pnpm run build      # Compilación SSG de producción Next.js (/es, /ca, /en)
pnpm run qa         # Ejecución completa de las 4 barreras de calidad
```
