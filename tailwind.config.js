module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F6F3EC',
        secondary: '#2F6D5F',
        'text-primary': '#181614',
        'text-secondary': '#6B6459',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'ping': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'marquee': 'marquee 32s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        sm: '4px',
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text-secondary'),
            '--tw-prose-headings': theme('colors.text-primary'),
            '--tw-prose-links': theme('colors.secondary'),
            '--tw-prose-bold': theme('colors.text-primary'),
            '--tw-prose-code': theme('colors.secondary'),
            '--tw-prose-quotes': theme('colors.text-secondary'),
            '--tw-prose-quote-borders': theme('colors.secondary'),
            '--tw-prose-hr': '#E4DFD3',
            '--tw-prose-th-borders': '#E4DFD3',
            '--tw-prose-td-borders': '#E4DFD3',
            a: { textDecoration: 'none' },
            'a:hover': { textDecoration: 'underline' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
