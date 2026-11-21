import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  { ignores: ['.next/**', 'out/**', 'coverage/**', 'node_modules/**', 'next-env.d.ts'] },
  ...nextCoreWebVitals,
  {
    rules: {
      'react/no-unescaped-entities': 'warn',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '__tests__/**'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]

export default eslintConfig
