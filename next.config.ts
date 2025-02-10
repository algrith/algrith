// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import removeImports from 'next-remove-imports';

import withTwin from './utils/twin.mjs';

export default removeImports()(
  withTwin({
    reactStrictMode: true,
  })
);