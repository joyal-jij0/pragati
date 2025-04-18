/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bae4c9',
          300: '#8ed0a9',
          400: '#5db785',
          500: '#3a9f67',
          600: '#2a8051',
          700: '#236643',
          800: '#1f5238',
          900: '#1b442f',
          950: '#0e2719',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-100',
    'text-blue-600',
    'bg-green-100',
    'text-green-600',
    'bg-amber-100',
    'text-amber-600',
    'bg-rose-100',
    'text-rose-600',
    'bg-indigo-100',
    'text-indigo-600',
    'bg-purple-100',
    'text-purple-600',
  ],
}