---
title: "00 — Auditoría de Línea Base y Plan de Ingeniería Reentrante"
tags:
  - baseline
  - reentrancia
  - arquitectura
  - seguridad
  - qa
created: 2026-10-23
status: verified
---

# 🔬 Etapa 0 y Etapa 1 (Reentrancia): Auditoría de Línea Base y Plan Maestro

Siguiendo el principio de **reentrancia en ingeniería de sistemas**, antes de modificar cualquier componente de producción realizamos una inspección completa del estado actual del repositorio, sus dependencias ocultas, contratos de pruebas (`__tests__`) y superficie de seguridad Git.

---

## 1. Hallazgos Críticos Descubiertos en la Inspección de Línea Base

Al auditar el código fuente desde la raíz antes de pasar a la Etapa 2, detectamos **4 elementos críticos** que un cambio superficial habría pasado por alto:

1. **Capas Globales Ocultas en [`app/layout.tsx`](../../app/layout.tsx)**:
   - El layout raíz monta `<AntigravityBackground />` y `<TechBackground />` (`SNYK++ Premium Background System`), los cuales inyectan un `<canvas>` de ruido dinámico, *listeners* de scroll parallax y *blobs* de energía en todas las páginas.
   - **Acción en Etapa 2**: Reemplazar ese sistema pesado por una cuadrícula estructural limpia de `1px` (*Blueprint Grid*) acorde a [`DESIGN.md`](../../DESIGN.md), reduciendo carga de CPU/GPU y eliminando el "humo visual".

2. **Script de Hidratación de Tema en [`app/layout.tsx`](../../app/layout.tsx)**:
   - Actualmente línea 101 fuerza `'light'` por defecto (`localStorage.getItem('itc-theme') || 'light'`).
   - **Acción en Etapa 2**: Actualizar el valor por defecto a `'dark'` (*Obsidian Command Center* de Warp/Raycast) manteniendo soporte instantáneo y sin parpadeo (*Zero-FOUC*) para `'light'` (*Engineering Dossier* de Pravah/Anthropic).

3. **Contratos de Pruebas Automatizadas Existentes (`__tests__/`)**:
   - [`Hero.test.tsx`](../../__tests__/components/Hero.test.tsx): Exige que `Hero` **no** renderice etiquetas `<canvas>`, que muestre `content.title.split('.')[0]`, `content.subtitle`, `content.ctaPrimary` y enlace a `/${lang}/contact`.
   - [`Header.test.tsx`](../../__tests__/components/Header.test.tsx) y [`accessibility.test.tsx`](../../__tests__/accessibility.test.tsx): Ejecutan auditoría `jest-axe` sobre `Header` y `Footer` (cero violaciones WCAG/ARIA permitidas) y validan los enlaces `Sobre mí`, `Servicios` y `Contacto`.
   - [`utf8-validation.test.ts`](../../__tests__/utf8-validation.test.ts): Valida la integridad UTF-8 de `content/es.json` y `content/en.json`.

4. **Seguridad y Privacidad en Git (`OPSEC / Ciberseguridad`)**:
   - La carpeta `CVs/` contiene los PDFs originales con tu número de teléfono personal.
   - **Acción de Seguridad**: Añadir `/CVs/` a [`.gitignore`](../../.gitignore) para que los PDFs de referencia queden seguros en tu máquina local y no se suban por accidente al repositorio público de GitHub sin sanitizar datos personales (PII).

---

## 2. Matriz Reentrante de las 6 Etapas (Estado Actualizado)

| Etapa | Nombre de Ingeniería | Entregables Técnicos | Estado |
| :--- | :--- | :--- | :--- |
| **Etapa 0** | **Context Engineering & OPSEC** | `DESIGN.md`, `AGENTS.md`, `.agents/skills/itc-design-and-qa/SKILL.md`, Vault Obsidian `D:\obsidian\IvanTechCoach-Web`, `.gitignore` OPSEC | ✅ **Completada y Auditada** |
| **Etapa 1** | **Auditoría de Línea Base & Especificación** | Inspección de `layout.tsx`, `TechBackground.tsx`, contratos `__tests__/` y este documento de arquitectura | ✅ **Completada y Auditada** |
| **Etapa 2** | **Implementación de Cimientos (Design System & Contratos de Datos)** | Refactor de `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, `TechBackground.tsx` + Contratos de contenido `content/es.json` y `content/en.json` | ✅ **Completada y Auditada** |
| **Etapa 3** | **Desarrollo Modular UI/UX (Componentes)** | `Header.tsx` (con `⌘K` Command Palette), `Hero.tsx` (Simulador Interactivo IA + Sistemas), `Services.tsx` (Bento Grid Técnico), `About.tsx` (Dossier de Credenciales y KPIs) | ✅ **Completada y Auditada** |
| **Etapa 4** | **Verificación y QA Automatizado** | Ejecución y ampliación de tests en `__tests__/` + `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`, `pnpm run build` | ✅ **Completada y Auditada** |
| **Etapa 5** | **Documentación Final & Release** | Actualización de `README.md`, cierre de notas en Obsidian y preparación de commit limpio para GitHub / Vercel | ✅ **Lista para Release** |
