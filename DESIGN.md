# DESIGN.md — Ivan Tech Coach (AI & Systems Engineering Advisory)

> **Source Reference Library**: [Refero Styles (`styles.refero.design`)](https://styles.refero.design/)
> **Primary Archetype (Dark Default)**: [Warp (`d4c51049`)](https://styles.refero.design/style/d4c51049-58eb-404a-9fcb-f195928b1c99) + [Raycast (`3b6a17f0`)](https://styles.refero.design/style/3b6a17f0-3bdf-418c-a95e-0b89e5a8b2f8) — *Obsidian Command Center*
> **Secondary Archetype (Light Editorial)**: [Pravah (`30a8b128`)](https://styles.refero.design/style/30a8b128-a5bb-4d86-85eb-743b78091596) — *Engineering Dossier on Warm Parchment*

---

## 1. Visual Philosophy & Mood ("Zero Tech Smoke")

Ivan Tech Coach speaks in the visual language of a **precision engineering instrument and executive technical dossier**. 
With 20+ years of battle-tested experience in IT infrastructure, hardware diagnostics, Cisco networking, cybersecurity, and practical AI model integration, the interface rejects decorative "AI slop" (floating neon blobs, heavy drop shadows, tilted glass cards, and rainbow gradients).

Instead, authority is communicated through:
1. **Achromatic Surface Discipline**: 95% of the viewport consists of stepped architectural neutrals (obsidian/graphite in dark mode; warm parchment/ink in light mode).
2. **1px Structural Blueprints**: Sections and cards are separated by crisp `1px` hairline borders and subtle inner highlights (`inset 0 1px 0 0`), resembling a hardware schematic or IDE cockpit.
3. **Surgical Telemetry Accents**: Color is rationed strictly for functional signals—active inference states, verified KPIs, security status badges, and command triggers.
4. **Live Interactive Proof**: Rather than static marketing claims, the UI embeds interactive diagnostic consoles, a `⌘K` command palette, and verifiable field metrics.

---

## 2. Color System & Semantic Tokens

### 2.1 Dark Theme (Default) — *Obsidian Command Center* (Warp / Raycast)

| Token | Hex / Value | Role & Usage Rule |
| :--- | :--- | :--- |
| `--bg` | `#040506` | **Void Obsidian**: Primary page canvas and terminal preview base. |
| `--bg-2` | `#0d0f12` | **Graphite Base**: Secondary section canvas for subtle tonal alternation. |
| `--card` | `#121418` | **Onyx Surface**: First elevation step for Bento cards, diagnostic panels, and modals. |
| `--card-elevated` | `#1b1d22` | **Carbon Surface**: Nested UI wells, interactive tabs, code blocks, and keyboard key caps. |
| `--text` | `#faf9f6` | **Warm Bone**: Primary headlines and high-emphasis text. Avoids the harsh clinical glare of `#ffffff` on black. |
| `--text-soft` | `#a0a3ab` | **Ash Mid**: Everyday running body copy and descriptions. |
| `--text-muted` | `#666970` | **Iron / Dim**: Telemetry labels, timestamps, coordinates, and inactive states. |
| `--border` | `rgba(255, 255, 255, 0.08)` | **Hairline Structure**: Default `1px` structural grid and card border. |
| `--border-strong` | `rgba(255, 255, 255, 0.16)` | **Active Hairline**: Hover/focused card edge and active console border. |
| `--primary` | `#10b981` | **Telemetry Emerald**: Surgical accent for active AI nodes, verified metrics, and system-online indicators. |
| `--accent-violet` | `#cbb0f7` | **Phosphor Violet (Warp)**: Secondary technical signal for AI model architecture tags and command highlights. |
| `--cta-bg` | `#faf9f6` | **High-Contrast Action Fill**: Primary CTA buttons use solid Warm Bone fill on dark canvas. |
| `--cta-text` | `#040506` | **High-Contrast Action Label**: Deep obsidian text inside primary CTA buttons. |

### 2.2 Light Theme — *Engineering Dossier on Warm Parchment* (Pravah / Anthropic)

| Token | Hex / Value | Role & Usage Rule |
| :--- | :--- | :--- |
| `--bg` | `#f3f1ed` | **Warm Parchment**: Primary editorial canvas; non-digital, tactile engineering dossier feel. |
| `--bg-2` | `#e9e5de` | **Stone Band**: Alternating section background and recessed console container. |
| `--card` | `#ffffff` | **Pure Paper**: Card surfaces and elevated panels sitting one step above parchment without heavy shadows. |
| `--card-elevated` | `#f7f5f0` | **Bone Well**: Inner tabs, code containers, and technical metadata strips. |
| `--text` | `#181011` | **Ink Black**: Dominant typographic color for headlines and primary text. |
| `--text-soft` | `#4a4546` | **Charcoal**: Body copy and long-form service descriptions. |
| `--text-muted` | `#736d6e` | **Dim Field Note**: Monospace badges, coordinates, and captions. |
| `--border` | `#d8d4ce` | **Bone Hairline**: Crisp `1px` structural border separating dossier modules. |
| `--border-strong` | `#181011` | **Ink Rule**: High-emphasis active border and structural header divider. |
| `--primary` | `#047857` | **Deep Telemetry Green**: High-contrast technical status and metric indicator on light surfaces. |
| `--accent-violet` | `#5b21b6` | **Archival Violet**: Secondary technical accent for AI model tags on parchment. |
| `--cta-bg` | `#181011` | **Ink Action Fill**: Primary CTA button fill in light mode. |
| `--cta-text` | `#faf9f6` | **Warm Bone Label**: Primary CTA text in light mode. |

---

## 3. Typography Rules

1. **Primary Sans (`Inter` / System Geometric Grotesque)**:
   - **Display Headlines (`h1`)**: `44px–64px`, weight `600–700`, tight negative tracking (`-0.035em`), line-height `1.05`.
   - **Section Headings (`h2`)**: `30px–42px`, weight `600`, tracking `-0.025em`, line-height `1.15`.
   - **Module Titles (`h3`)**: `20px–24px`, weight `600`, tracking `-0.015em`, line-height `1.25`.
   - **Body Copy**: `16px–18px`, weight `400`, normal tracking, line-height `1.60`, max line width `65ch`.
2. **Technical Monospace (`JetBrains Mono` / `ui-monospace`)**:
   - Used for **Telemetry Badges**, **System Coordinates** (`[SYS-01 // AI-INFRA]`), **Verified KPIs** (`95% FCR`, `-30% COST`), **Command Shortcuts** (`⌘K`), and the **Interactive AI Diagnostic Console**.
   - Uppercase labels use `11px–12px`, weight `500`, wide tracking (`0.08em–0.10em`).

---

## 4. Layout, Spacing Rhythm & Component Behaviors

- **Max Container Width**: `1200px` (`max-w-6xl` / `max-w-7xl`) with visible or implied structural alignment.
- **Corner Radii**:
  - **Cards & Consoles**: `12px` (`rounded-xl`) — engineered and sharp, replacing soft `24px` (`rounded-3xl`) bubbles.
  - **Buttons & Controls**: `8px` (`rounded-lg`) for cockpit controls or `9999px` (`rounded-full`) for compact status pills.
  - **Keyboard Shortcuts (`kbd`)**: `6px` (`rounded-md`) with `1px` border and subtle bottom shadow (`0 1px 0 rgba(255,255,255,0.1)`).
- **Surface Elevation**:
  - Achieved via background color steps (`--bg` → `--card` → `--card-elevated`) and `1px` borders, **never** via large blurred drop shadows.

### 4.1 Instrument Frame (Portrait & Logo Depth System)

Component: `components/InstrumentFrame.tsx` · Styles: `.instrument-frame*` in `app/globals.css`.

Gives identity imagery depth without breaking the "Zero Bloat" rules. Layers, back to front:

| Layer | Implementation | Theme tokens |
| :--- | :--- | :--- |
| Two-tone halo | Static `radial-gradient` (emerald top-left, violet bottom-right). **No `filter: blur`.** | `--frame-halo-a`, `--frame-halo-b` |
| Dot-matrix field | `8px` dot grid with radial mask (portrait sizes only) | `--frame-dot` |
| Registration corners | Four `1px` L-brackets offset `7px` outside the frame | `--primary` |
| Conic bezel | `1px` conic border over a `--border-strong` base; sweeps `140deg → 320deg` **only on hover/focus** via `@property --frame-angle` | `--primary`, `--accent-violet` |
| Scanline + vignette | Dark: faint scanlines + bottom vignette. Light: vignette only (`--frame-scanline: none`) | `--frame-scanline`, `--frame-vignette` |
| Telemetry label | Optional mono chip over the bottom edge; copy comes from content JSON | `--card`, `--border-strong` |

Sizes: `sm` (logo: halo + bezel only), `md` (dossier card portrait), `lg` (about page portrait + label). All decorative layers are `aria-hidden`.

---

## 5. Strict Guardrails for AI Agents (Do's & Don'ts)

### DO:
- **DO** pair every AI advisory claim with concrete infrastructure, security, or operational metrics from Ivan's verified trajectory (`+20 years`, `95% FCR`, `-30% hardware cost`, `+40% cloud retrieval efficiency`, `CCNA`, `Google Cybersecurity`).
- **DO** use high-contrast neutral CTAs (`--cta-bg` / `--cta-text`) as the primary action button.
- **DO** use monospace eyebrows (`[01 // ARQUITECTURA IA & DATOS]`) to index sections like an engineering specification.
- **DO** keep animations fast, deterministic, and functional (`150ms–200ms ease-out`).

### DON'T:
- **DON'T** add floating background blobs (`blobPulse`, `liquidBlur`), fog layers, or neon text-shadows (`neonPulse`).
- **DON'T** rotate cards (`rotate-3`) or apply bouncy hover scales (`hover:scale-105` / `hover:scale-110`) to content containers.
- **DON'T** use generic stock marketing phrases ("unlock the magic of AI")—always frame AI through **operational stability, data governance, and measurable ROI**.
