import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';

import { ContentWrapper, LayoutWrapper } from '@/components/shared/layout/styled';
import AntDesignThemeProvider from '@/components/shared/theme/provider';
import NextAuthProvider from '@/components/shared/auth-provider';
import ThemeSwitch from '@/components/shared/theme/switch';
import Alert from '@/components/shared/feedback/alert';
import Header from '@/components/shared/layout/header';
import Navbar from '@/components/shared/layout/navbar';
import Footer from '@/components/shared/layout/footer';
import { fontClassNames } from '@/libs/fonts';
import ReduxProvider from '@/store/provider';
import { inProduction } from '@/utils';
import GlobalStyles from '@/styles';
import colors from '@/libs/colors';

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
  keywords: ['Business', 'Artisans', 'Buyers', 'Sellers', 'Online Market', 'Sales'],
  metadataBase: process.env.NEXT_PUBLIC_APP_URL,
  referrer: 'origin-when-cross-origin',
  description: 'Algrith Website',
  manifest: '/app.webmanifest',
  applicationName: 'Algrith',
  publisher: 'Algrith LLC',
  creator: 'Algrith LLC',
  openGraph: {
    url: process.env.NEXT_PUBLIC_APP_URL,
    description: 'Algrith Website',
    siteName: 'Algrith',
    title: 'Algrith',
    locale: 'en_US',
    type: 'website',
    images: []
  },
  icons: {},
  title: {
    template: '%s | Algrith',
    default: 'Algrith'
  },
  robots: {
    nocache: !inProduction,
    follow: inProduction,
    index: inProduction,
    googleBot: {
      noimageindex: inProduction,
      follow: inProduction,
      index: inProduction,
    },
  }
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => (
  <ReduxProvider>
    {/* <NextAuthProvider> */}
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
    {/* </NextAuthProvider> */}
  </ReduxProvider>
);

export default RootLayout;