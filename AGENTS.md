# AGENTS.md — Master Engineering & Governance Rules (`ivan-tech-coach-landing`)

These rules are mandatory for all AI coding agents (Antigravity, Cursor, Claude Code) operating in this repository. They enforce the standards of a 20+ year Systems, Infrastructure, Cybersecurity, and Applied AI practice.

---

## 1. Supply Chain Security & Package Management (CRITICAL)
- **STRICTLY `pnpm` ONLY**: Never execute or suggest `npm` or `npx`. Always use `pnpm` and `pnpm dlx`.
- **Lockfile Hygiene**: Only `pnpm-lock.yaml` is permitted. Never commit `package-lock.json` or `yarn.lock`.
- **Zero Dependency Bloat**: Do not install new npm packages if existing workspace dependencies (`lucide-react`, `cmdk`, `@radix-ui/*`, `tailwindcss`) or native Web APIs solve the problem.

## 2. Cybersecurity, OPSEC & Privacy (OWASP / GDPR)
- **PII & OPSEC Protection**: Never expose personal phone numbers, residential addresses, private keys, or unredacted local documents (`/CVs/`, `.env*.local`) in client-side code, static assets, or Git commits.
- **XSS & Injection Prevention**: Never use `dangerouslySetInnerHTML` with dynamic or user-supplied data. Validate and sanitize all inputs in forms (`ContactForm.tsx`) and API routes.
- **External Links Hardening**: Every external link (`target="_blank"`) MUST include `rel="noopener noreferrer"`.

## 3. Systems Performance & Resource Discipline ("Zero Bloat")
- **CPU/GPU Efficiency**: Do not render continuous `<canvas>` noise generators, heavy particle loops, or multi-layer blur blobs (`filter: blur(64px)` animated in infinite loops) that drain client battery and GPU.
- **Motion & Accessibility**: Respect `@media (prefers-reduced-motion: reduce)` across all transitions. Keep UI transitions deterministic and fast (`150ms–200ms ease-out`).
- **Core Web Vitals**: Prevent Cumulative Layout Shift (`CLS = 0`), avoid React hydration mismatches (`Zero-FOUC` theme script in `<head>`), and use `next/image` with explicit dimensions.

## 4. Design System Authority (`DESIGN.md` — Refero Styles)
- All UI/UX changes MUST strictly obey [`DESIGN.md`](./DESIGN.md):
  - **Dark Mode (Default — `.theme-dark`)**: *Obsidian Command Center* (Warp / Raycast: `#040506` canvas, `#121418` cards, `#faf9f6` warm bone text, `1px` blueprint borders, surgical emerald `#10b981` and phosphor violet `#cbb0f7` telemetry).
  - **Light Mode (`.theme-light`)**: *Engineering Dossier on Warm Parchment* (Pravah / Anthropic: `#f3f1ed` parchment canvas, `#181011` ink text, `#d8d4ce` hairline borders).
- **Prohibited UI Patterns**: No floating blur blobs, no neon text-shadows, no tilted cards (`rotate-3`), and no bouncy hover scales (`hover:scale-105` on content cards).

## 5. TypeScript Strictness, i18n Parity & Content Integrity ("Zero Tech Smoke")
- **Strict Typing**: Do not introduce `any` or `@ts-ignore` to bypass compiler checks.
- **No Hardcoded UI Copy**: All user-facing strings must reside in [`content/es.json`](./content/es.json), [`content/ca.json`](./content/ca.json), and [`content/en.json`](./content/en.json) with 1:1 structural parity and clean UTF-8 encoding.
- **Verified Career Anchoring**: Every AI advisory claim, simulator scenario, and service must align with **Jaime Iván Rodríguez Morales's** verified metrics (`20+ years`, `95% FCR`, `-30% hardware cost`, `+200 GB SharePoint/OneDrive migration`, `-25% downtime`, `Cisco CCNA 1–3`, `Google Cybersecurity 2024`, `FUNDAE 2025`).

## 6. Reentrant Verification & Docs-as-Code Gate
- **Accessibility (`jest-axe`) & Unit Contracts**: Every component change must preserve or expand the test suite in [`__tests__/`](./__tests__/) with zero WCAG/ARIA violations.
- **Mandatory Quality Gate**: Run `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`, and `pnpm run build` before closing any implementation stage.
- **Obsidian ↔ GitHub Sync**: Keep [`docs/`](./docs/) (`D:\obsidian\IvanTechCoach-Web`) synchronized at the end of each stage.
