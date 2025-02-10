// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import removeImports from 'next-remove-imports';
import withPWA from 'next-pwa';

import withTwin from './utils/twin.mjs';

export default removeImports()(
  withTwin({
    reactStrictMode: true,
    ...withPWA({
      disable: process.env.NODE_ENV === 'development',
      skipWaiting: true,
      register: true,
      dest: 'public'
    })
  })
);