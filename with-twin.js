const path = require('path');
const fs = require('fs');

// The folders containing files importing twin.macro
const includedDirs = [
  path.resolve(__dirname, './components'),
  path.resolve(__dirname, './styled'),
  path.resolve(__dirname, './pages')
];

const folderAliases = () => {
  const rootDir = path.resolve(__dirname);

  const folders = fs.readdirSync(rootDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

  return folders.reduce((aliases, folder) => {
    aliases[`@${folder}`] = path.resolve(rootDir, folder);
    return aliases;
  }, {});
};

module.exports = function withTwin(nextConfig) {
  return {
    ...nextConfig,
    webpack(config, options) {
      const { dev, isServer } = options;
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.js$/,
        include: includedDirs,
        use: [
          options.defaultLoaders.babel,
          {
            loader: 'babel-loader',
            options: {
              sourceMaps: dev,
              presets: [
                [
                  '@babel/preset-react',
                  { runtime: 'automatic', importSource: '@emotion/react' },
                ],
              ],
              plugins: [
                require.resolve('babel-plugin-macros'),
                require.resolve('@emotion/babel-plugin'),
              ],
            },
          },
        ],
      })

      if (!isServer) {
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          crypto: false,
          module: false,
          path: false,
          os: false,
          fs: false,
        };
      }

      // Add aliases
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        ...folderAliases()
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      } else {
        return config;
      }
    },
  }
};