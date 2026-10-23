---
name: itc-refero-design-system
description: >-
  Enforces the Ivan Tech Coach Refero Styles design system (Warp/Raycast Obsidian Command Center in dark mode, Pravah/Anthropic Engineering Dossier in light mode) defined in DESIGN.md. Use whenever creating or modifying CSS, Tailwind configuration, layouts, or React UI components.
---

# Ivan Tech Coach — Refero Styles Design System Skill

Always follow this runbook when modifying `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, or any component inside `components/`.

## 1. Dual-Theme Token Architecture (`DESIGN.md`)
Every component must support both themes seamlessly using CSS custom properties:

- **Dark Mode (Default: `.theme-dark`) — *Obsidian Command Center* (Warp / Raycast)**:
  - Canvas: `--bg: #040506`, `--bg-2: #0d0f12`
  - Surfaces: `--card: #121418`, `--card-elevated: #1b1d22`
  - Typography: `--text: #faf9f6` (Warm Bone), `--text-soft: #a0a3ab`, `--text-muted: #666970`
  - Borders: `--border: rgba(255, 255, 255, 0.08)`, `--border-strong: rgba(255, 255, 255, 0.16)`
  - Accents: `--primary: #10b981` (Telemetry Emerald), `--accent-violet: #cbb0f7` (Phosphor Violet)
  - Primary Action CTA: `--cta-bg: #faf9f6`, `--cta-text: #040506`

- **Light Mode (`.theme-light`) — *Engineering Dossier on Warm Parchment* (Pravah / Anthropic)**:
  - Canvas: `--bg: #f3f1ed`, `--bg-2: #e9e5de`
  - Surfaces: `--card: #ffffff`, `--card-elevated: #f7f5f0`
  - Typography: `--text: #181011` (Ink Black), `--text-soft: #4a4546`, `--text-muted: #736d6e`
  - Borders: `--border: #d8d4ce`, `--border-strong: #181011`
  - Accents: `--primary: #047857`, `--accent-violet: #5b21b6`
  - Primary Action CTA: `--cta-bg: #181011`, `--cta-text: #faf9f6`

## 2. Structural & Typographic Rules
1. **1px Blueprint Grid**: Separate sections and Bento modules with `1px solid var(--border)` and subtle top inner-shadow (`inset 0 1px 0 0 rgba(255,255,255,0.06)` in dark mode).
2. **Monospace Telemetry Indices**: Every major section and card must feature a monospace technical coordinate or badge (`font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]`), e.g. `[SYS-01 // AI ARCHITECTURE]`.
3. **Prohibited Legacy Patterns**:
   - NEVER use floating blur blobs (`blobPulse`, `liquidBlur`), `<canvas>` wave/noise overlays inside `Hero`, or neon text-shadows (`neonPulse`).
   - NEVER tilt cards (`rotate-3`) or use exaggerated hover scaling (`hover:scale-105` / `hover:scale-110`).
4. **Accessibility (`jest-axe`)**:
   - All interactive controls (theme toggle, language toggle, command palette button, simulator tabs) MUST have explicit `aria-label`, `aria-expanded`, or visible accessible text so `axe` reports 0 violations.
