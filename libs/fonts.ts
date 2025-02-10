import { Montserrat, Nunito_Sans, Raleway, Manrope, Roboto, Dosis } from 'next/font/google';

export const nunitoSans = Nunito_Sans({
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-nunito-sans',
  adjustFontFallback: false,
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  adjustFontFallback: false,
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const manrope = Manrope({
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  adjustFontFallback: false,
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const raleway = Raleway({
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  adjustFontFallback: false,
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  adjustFontFallback: false,
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const dosis = Dosis({
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  adjustFontFallback: false,
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const fontClassNames = [
  montserrat.variable,
  nunitoSans.variable,
  raleway.variable,
  manrope.variable,
  roboto.variable,
  dosis.variable
].join(' ');

// 'gilroy': ['gilroy-font', 'sans-serif'],