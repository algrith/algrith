import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';

import { ContentWrapper, LayoutWrapper } from '@/components/shared/layout/styled';
import AntDesignThemeProvider from '@/components/shared/theme/provider';
import ThemeSwitch from '@/components/shared/theme/switch';
import Alert from '@/components/shared/feedback/alert';
import Header from '@/components/shared/layout/header';
import Navbar from '@/components/shared/layout/navbar';
import Footer from '@/components/shared/layout/footer';
import { fontClassNames } from '@/libs/fonts';
import ReduxProvider from '@/store/provider';
import { inProduction } from '@/utils';
import { assets } from '@/libs/assets';
import GlobalStyles from '@/styles';
import colors from '@/libs/colors';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: colors.dark.primary },
    { media: '(prefers-color-scheme: light)', color: 'white' }
  ]
};

export const metadata: Metadata = {
  keywords: ['Algrith', 'Web', 'Web design', 'Business', 'Artisans', 'Buyers', 'Sellers', 'Online Market', 'Sales', 'Marketplace', 'Algorithms'],
  description: 'Turning ideas into impactful digital products, designs, and experiences.',
  referrer: 'origin-when-cross-origin',
  bookmarks: `${appUrl}/bookmarks`,
  manifest: '/app.webmanifest',
  applicationName: 'Algrith',
  publisher: 'Algrith LLC',
  creator: 'Algrith LLC',
  metadataBase: appUrl,
  openGraph: {
    description: 'Turning ideas into impactful digital products, designs, and experiences.',
    title: 'Algrith - Strategic Digital Solutions for Modern Businesses',
    siteName: 'Algrith',
    locale: 'en_US',
    type: 'website',
    url: appUrl,
    images: [
      {
        url: assets.icons.chrome384,
        type: 'icon',
        height: 384,
        width: 384,
      },
      {
        url: assets.icons.chrome192,
        type: 'icon',
        height: 192,
        width: 192
      },
      {
        url: assets.icons.favicon32,
        type: 'icon',
        height: 32,
        width: 32
      },
      {
        url: assets.icons.favicon16,
        type: 'icon',
        height: 16,
        width: 16
      },
    ]
  },
  // facebook: {
  //   appId: '123456789012345',
  // },
  twitter: {
    description: 'Turning ideas into impactful digital products, designs, and experiences.',
    title: 'Algrith: Strategic Digital Solutions for Modern Businesses.',
    images: [
      {
        url: assets.brand.logos.white,
        height: 600,
        width: 800,
      },
      {
        url: assets.brand.logos.white,
        height: 1600,
        width: 1800,
      },
    ]
  },
  authors: {
    name: 'Algrith LLC',
    url: appUrl
  },
  robots: {
    nocache: !inProduction,
    follow: inProduction,
    index: inProduction,
    googleBot: {
      noimageindex: inProduction,
      follow: inProduction,
      index: inProduction,
    }
  },
  icons: {
    shortcut: assets.icons.favicon,
    icon: assets.icons.favicon,
    apple: assets.icons.apple,
    other: [
      {
        color: colors.theme.primary,
        url: assets.icons.safari,
        rel: 'mask-icon'
      },
      {
        url: assets.icons.chrome512,
        sizes: '512x512',
        rel: 'icon',
      },
      {
        url: assets.icons.chrome192,
        sizes: '192x192',
        rel: 'icon',
      },
      {
        url: assets.icons.favicon32,
        sizes: '32x32',
        rel: 'icon',
      },
      {
        url: assets.icons.favicon16,
        sizes: '16x16',
        rel: 'icon',
      },
    ]
  },
  title: {
    template: '%s | Algrith - Strategic Digital Solutions for Modern Businesses',
    default: 'Algrith - Strategic Digital Solutions for Modern Businesses'
  }
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => (
  <ReduxProvider>
    <html lang="en-US">
      <body className={fontClassNames}>
        <Suspense>
          <GlobalStyles />
        </Suspense>

        <AntDesignThemeProvider>
          <LayoutWrapper>
            <LayoutWrapper>
              <Suspense>
                <Header />
                <Navbar />
              </Suspense>
              
              <ThemeSwitch />

              <ContentWrapper>
                {children}
              </ContentWrapper>

              <Alert />
              <Footer />
            </LayoutWrapper>
          </LayoutWrapper>
        </AntDesignThemeProvider>
      </body>
    </html>
  </ReduxProvider>
);

export default RootLayout;