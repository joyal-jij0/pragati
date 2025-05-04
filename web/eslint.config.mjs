import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// NOTE: This is a prototype/proof-of-concept implementation.
// For rapid development and demonstration purposes, we've suppressed various ESLint warnings and TypeScript checks.
// In a production environment, these rules should be properly configured and warnings should be addressed.

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Prototype-specific relaxed rules to speed up development
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
]

export default eslintConfig
