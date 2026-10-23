---
name: itc-qa-security-gate
description: >-
  Runbook for OPSEC/PII protection, automated test contract preservation, and pnpm quality gates (lint, typecheck, test, build). Use before and after implementing code changes or preparing deployments.
---

# Ivan Tech Coach — QA, Test Contracts & OPSEC Security Gate

Follow this protocol to guarantee production stability and security across all stages.

## 1. Package Manager Security Rule (CRITICAL)
- **STRICTLY `pnpm` ONLY**: Never run `npm` or `npx`. Always use `pnpm` and `pnpm dlx`.

## 2. OPSEC & Git Hygiene Check
- Ensure `/CVs/`, `.env*.local`, and any files containing unredacted personal phone numbers or private keys are listed in `.gitignore` and never staged in Git (`git status --short`).

## 3. Existing Test Suite Contracts (`__tests__/`)
Before modifying components, verify that these existing test assertions remain satisfied:
1. `__tests__/components/Hero.test.tsx`:
   - `Hero` must NOT render a `<canvas>` element (`container.querySelector('canvas')` must be `null`).
   - `Hero` must render `content.title.split('.')[0]`, `content.subtitle`, and `content.ctaPrimary`.
   - The primary CTA must be an `<a>` linking to `/${lang}/contact`.
2. `__tests__/components/Header.test.tsx` & `__tests__/accessibility.test.tsx`:
   - `Header` must render `<nav>` and visible links for `content.nav.about`, `content.nav.services`, and `content.nav.contact`.
   - `Header` and `Footer` must pass `jest-axe` (`expect(results).toHaveNoViolations()`).
3. `__tests__/utf8-validation.test.ts` & `__tests__/lib/content.test.ts`:
   - `es.json` and `en.json` must contain zero corrupted characters and load cleanly via `getContent(lang)`.

## 4. Mandatory Verification Commands
Run in sequence at the end of every implementation stage:
```powershell
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
```
