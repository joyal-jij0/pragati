import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Suppress unused variables error
      '@typescript-eslint/no-unused-vars': 'off',

      // Suppress usage of 'any'
      '@typescript-eslint/no-explicit-any': 'off',

      // Allow unescaped entities in JSX
      'react/no-unescaped-entities': 'off',

      // Suppress warnings about using <img> instead of <Image />
      '@next/next/no-img-element': 'off',

      // Optionally, if you want to ignore specific patterns for unescaped entities
      // "react/no-unescaped-entities": ["error", { "forbid": ["<", ">", "&", "'"] }],
    },
  },
]

export default eslintConfig
