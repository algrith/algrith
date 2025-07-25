import type { Config } from 'tailwindcss';
import colors from './libs/colors';

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: () => ({
        'intro-index': "url('/images/section-backgrounds/abstract-art-atom.jpeg')",
        'intro-about': "url('/images/section-backgrounds/intro-about.jpg')",
      }),
      fontFamily: {
        'nunito-sans': ['var(--font-nunito-sans)', 'Sans-serif'],
        'montserrat': ['var(--font-montserrat)', 'Sans-serif'],
        'manrope': ['var(--font-manrope)', 'Sans-serif'],
        'raleway': ['var(--font-raleway)', 'Sans-serif'],
        'roboto': ['var(--font-roboto)', 'Sans-serif'],
        'dosis': ['var(--font-dosis)', 'Sans-serif'],
        'gilroy': ['gilroy', 'Sans-serif'],
      },
      colors: {
        'dark-mode-quaternary': colors.dark.quaternary,
        'dark-mode-secondary': colors.dark.secondary,
        'dark-mode-septenary': colors.dark.septenary,
        'dark-mode-octonary': colors.dark.octonary,
        'dark-mode-tertiary': colors.dark.tertiary,
        'theme-secondary': colors.theme.secondary,
        'dark-mode-quinary': colors.dark.quinary,
        'dark-mode-primary': colors.dark.primary,
        'dark-mode-senary': colors.dark.senary,
        'theme-primary': colors.theme.primary,
        'theme-success': colors.theme.success,
        'theme-error': colors.theme.error,
        'theme-text': colors.theme.text,
        'theme-link': colors.theme.link,
        'navyblue': '#0b214a'
      },
      spacing: {
        '5.5': '1.3rem',
        '13': '3.2rem',
        '15': '3.3rem',
        '23': '4.7rem',
        '33': '7.3rem',
        '84': '23rem',
        '112': '26rem',
        '126': '28rem',
        '144': '32rem',
        '166': '38rem',
        '188': '44rem',
        '210': '50rem',
        '232': '56rem',
      },
      fontSize: {
        '7.5xl': '5.5rem',
        'md': '0.8125rem',
        'xm': '1rem'
      },
      scale: {
        '35': '.35',
        '45': '.45',
        '65': '.65',
        '85': '.85'
      }
    }
  }
} satisfies Config;
