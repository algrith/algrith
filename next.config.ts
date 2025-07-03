import removeImports from 'next-remove-imports';

import withTwin from './utils/twin.mjs';

export default removeImports()(
  withTwin({
    reactStrictMode: true,
    output: 'standalone',
    turbo: {}
  })
);