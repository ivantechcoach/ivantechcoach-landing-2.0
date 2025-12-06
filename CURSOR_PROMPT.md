# Prompt para Cursor AI: mejoras de QA con pnpm

Contexto breve del proyecto:
- Landing page con Next.js 14, TypeScript y Tailwind, con rutas en `/es` y `/en`.
- Middleware que redirige a `/es` cuando falta prefijo de idioma.
- Scripts existentes: `dev`, `build`, `start`, `lint` (aún sin ESLint instalado).

Objetivo del prompt:
Guíar a Cursor para fortalecer QA y la seguridad migrando de npm a pnpm, recuperando linting, añadiendo pruebas y mejores prácticas de i18n/accesibilidad.

Instrucciones para Cursor (copiar y pegar):
1) **Migración a pnpm segura**
   - Habilita pnpm (`corepack enable pnpm`) y elimina `package-lock.json` en favor de `pnpm-lock.yaml`.
   - Usa `pnpm install --frozen-lockfile=false` para generar el nuevo lockfile.
   - Ajusta el README y scripts de uso a comandos pnpm (`pnpm install/dev/build/start/lint`).

2) **Recuperar linting y type-checking**
   - Instala ESLint y configuración de Next: `pnpm add -D eslint @types/eslint @next/eslint-plugin-next eslint-config-next`.
   - Crea/ajusta `.eslintrc` para usar `eslint-config-next`; repara problemas hasta que `pnpm lint` pase.
   - Añade script `typecheck: "tsc --noEmit"` y ejecútalo en CI/local.

3) **Pruebas automatizadas**
   - Añade pruebas de componentes con Testing Library o Jest: `pnpm add -D @testing-library/react @testing-library/jest-dom jest ts-jest` (o Playwright para e2e).
   - Crea scripts `test` (unitario) y opcional `test:e2e`; asegúrate de que `pnpm test` se ejecute sin fallos.

4) **Internacionalización y UX**
   - Centraliza la lista de locales soportados y añade detección de preferencia (p.ej., `Accept-Language` con `negotiator`) antes de redirigir en `middleware.ts`.
   - Verifica que las rutas `/[lang]` y `/[lang]/contact` respeten el idioma elegido.

5) **Accesibilidad y rendimiento**
   - Mantén el enlace “Saltar al contenido” y tema persistente; añade pruebas de accesibilidad automáticas (axe o testing-library) en componentes clave.
   - Considera ejecutar Lighthouse o medir animaciones/canvas para evitar problemas en dispositivos de gama baja.

6) **Seguridad y mantenimiento**
   - Ejecuta `pnpm audit` y habilita en CI junto con `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
   - Usa `pnpm store prune` periódicamente para limpiar caché y limitar superficie de ataque.

Resultado esperado:
- Lockfile de pnpm, linting operativo, scripts de pruebas y type-checking funcionando, mejoras en middleware de idioma y documentación actualizada a pnpm.
