const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  safelist: ['text-3xl', 'font-medium', 'mb-6'],
  theme: {
    extend: {
      colors: {
        trans: {
          'black-08': 'rgba(0,0,0,.8)'
        },
        primary: 'var(--tsxup-primary)',
        primaryLight: 'var(--tsxup-primary-light)',
        signalSuccess: 'var(--tsxup-signal-success)',
        signalError: 'var(--tsxup-signal-error)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ]
}
