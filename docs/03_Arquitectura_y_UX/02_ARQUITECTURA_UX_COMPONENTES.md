---
title: "02 — Especificación UX: Simulador de IA, Command Palette y Bento Grid"
tags:
  - ux
  - componentes
  - simulador-ia
  - cmdk
created: 2026-10-23
---

# 🖥️ Especificación de Componentes UI/UX de Nueva Generación

Para que el visitante sienta que está ante un especialista real en Modelos de IA e Infraestructura TI, la experiencia interactiva se articula en 4 componentes clave:

## 1. Header con Paleta de Comandos (`⌘K` / `Ctrl+K`)
- Aprovecha `cmdk` para ofrecer un buscador rápido de acciones:
  - Ir directo a escenarios de IA (Datos Cloud/RAG, Ciberseguridad para IA, Hardware AI-Ready, Automatización SOPs).
  - Ver credenciales verificadas (CCNA, Google Cybersecurity, FUNDAE, +20 años).
  - Alternar tema (*Obsidian Command Center* ↔ *Engineering Dossier*) o idioma (`ES` ↔ `EN`).
  - Iniciar consulta técnica.

## 2. Hero con Consola Interactiva de Diagnóstico IA + Sistemas
- Reemplaza la antigua tarjeta estática inclinada por una consola interactiva de arquitectura con pestañas seleccionables en tiempo real:
  - Muestra para cada caso: **Problema detectado**, **Arquitectura / Modelo de IA recomendado**, **Capa de Seguridad / Infraestructura** y **Métrica de impacto real**.

## 3. Bento Grid Técnico de Servicios (`Services.tsx`)
- Cada tarjeta de servicio incluye un código de módulo técnico (`[MOD-01]` a `[MOD-06]`), descripción orientada a resultados sin humo y etiquetas del stack técnico involucrado.

## 4. Dossier de Trayectoria y Credenciales Verificadas (`About.tsx`)
- Presenta las métricas auditables del CV (`95% FCR`, `-30% Costos Hardware`, `+200 GB Cloud Migrados`, `-25% Downtime`, `+20 Años`) junto con las certificaciones oficiales (Google Cybersecurity, FUNDAE Ciberseguridad y Redes 2025, Cisco CCNA 1–3, Linux & SQL).

## 5. Instrument Frame — Profundidad para Retrato y Logo (`InstrumentFrame.tsx`)
- **Problema detectado en revisión local**: el retrato y el logo se veían como imágenes planas pegadas sobre el pergamino o la obsidiana.
- **Solución (ADR)**: componente reutilizable con halo bicolor estático, campo de puntos, esquinas de registro tipo plano técnico, bisel cónico de `1px` y scanlines solo en modo oscuro.
- **Restricciones respetadas**: sin `filter: blur`, sin animaciones infinitas (el barrido del bisel solo ocurre al pasar el cursor o con foco de teclado), capas decorativas `aria-hidden` y colores 100% gobernados por tokens de tema (`--frame-*`).
- **Uso**: `sm` en el logo del `Header`, `md` en el Dossier (`About.tsx`), `lg` con etiqueta `ID VERIFICADO · 20+ AÑOS` en `/about` (`AboutPage.tsx`).
- **Especificación**: sección 4.1 de `DESIGN.md`.
