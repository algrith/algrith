import removeImports from 'next-remove-imports';

import { inProduction } from './utils/server';
import withTwin from './utils/twin.mjs';
import path from 'path';

export default removeImports()(
  withTwin({
    productionBrowserSourceMaps: inProduction,
    reactStrictMode: false,
    output: 'standalone',
    turbopack: {
      root: path.join(__dirname, '.')
    },
    experimental: {
      serverActions: {
        bodySizeLimit: '200mb'
      }
    }
  })
);