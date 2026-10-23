# Security, Performance & Accessibility Rules (`.agents/rules/engineering-guardrails.md`)

1. **OPSEC & PII**: Never hardcode personal phone numbers or private emails not intended for public contact, and keep `/CVs/` excluded in `.gitignore`.
2. **Resource Discipline**: Avoid continuous `requestAnimationFrame` or `<canvas>` loops for decorative backgrounds; use pure CSS `1px` structural grids.
3. **WCAG 2.1 AA Compliance**: Maintain a minimum contrast ratio of `4.5:1` for body text and `3:1` for UI components in both `.theme-dark` and `.theme-light`. Every icon-only button MUST have an `aria-label`.
4. **i18n Atomicity**: Never edit `content/es.json` without updating the exact same keys in `content/en.json`.
