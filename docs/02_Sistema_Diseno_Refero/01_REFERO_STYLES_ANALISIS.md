---
title: "01 — Análisis de Refero Styles: Warp, Raycast y Pravah"
tags:
  - refero-styles
  - design-system
  - ui-ux
created: 2026-10-23
---

# 🎨 Sistema de Diseño Extraído de `styles.refero.design`

Este documento resume la investigación realizada en **[Refero Styles](https://styles.refero.design/)** y cómo se tradujo al archivo maestro `[DESIGN.md](../../DESIGN.md)` del repositorio.

---

## 1. Referencias Seleccionadas

1. **[Warp Design System](https://styles.refero.design/style/d4c51049-58eb-404a-9fcb-f195928b1c99)** — *"Obsidian command center"*
   - Lienzo negro obsidiana (`#000000` / `#040506`), elevación por pasos grises (`#121212` → `#1e1e1d`), texto en hueso cálido (`#faf9f6`) para evitar fatiga visual y acento puntual en violeta fósforo (`#cbb0f7`).
2. **[Raycast Design System](https://styles.refero.design/style/3b6a17f0-3bdf-418c-a95e-0b89e5a8b2f8)** — *"Midnight command center"*
   - Uso de bordes finos (`1px`) y sombras internas superiores (`inset 0 1px 0 0 rgba(255,255,255,0.08)`) que dan sensación táctil de tecla o panel de control de hardware.
3. **[Pravah Design System](https://styles.refero.design/style/30a8b128-a5bb-4d86-85eb-743b78091596)** — *"Engineering dossier on warm parchment"*
   - Utilizado para el **Modo Claro** de la web: fondo pergamino cálido (`#f3f1ed`), tinta negra (`#181011`), bordes hueso (`#d8d4ce`) y etiquetas técnicas monoespaciadas en mayúsculas (`tracking-[0.10em]`).

---

## 2. Por qué se descartó el diseño anterior ("SNYK++ / Blobs")

- El sistema anterior dependía de animaciones `blobPulse` y `liquidBlur` con colores neón (`#00D1FF`).
- En consultoría de IA e infraestructura crítica, el exceso de efectos decorativos reduce la percepción de rigor técnico.
- La nueva arquitectura visual prioriza **legibilidad, velocidad de carga, telemetría verificable y contraste AAA**.
