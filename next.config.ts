import removeImports from 'next-remove-imports';

import withTwin from './utils/twin.mjs';
import path from 'path';

export default removeImports()(
  withTwin({
    productionBrowserSourceMaps: true,
    reactStrictMode: false,
    output: 'standalone',
    experimental: {
      serverActions: {
        bodySizeLimit: '200mb'
      }
    },
    turbopack: {
      root: path.join(__dirname, '.')
    }
  })
);