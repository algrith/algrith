import babelPluginTypescript from '@babel/plugin-syntax-typescript';
import babelPluginMacros from 'babel-plugin-macros';
import * as path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const includedDirs = [path.resolve(__dirname, '/')]

/** @returns {import('next').NextConfig} */
export default function withTwin(
  /** @type {import('next').NextConfig} */
  nextConfig,
) {
  return {
    ...nextConfig,
    webpack(
      /** @type {import('webpack').Configuration} */
      config,
      options,
    ) {
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];

      config.module.rules.push({
        test: /\.(tsx|ts)$/,
        include: includedDirs,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMaps: options.dev,
              plugins: [
                babelPluginMacros,
                [babelPluginTypescript, { isTSX: true }],
              ],
            },
          },
        ],
      });

      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'handlebars': 'handlebars/runtime.js'
      };
      
      config.resolveLoader.alias = {
        ...(config.resolveLoader.alias || {}),
        'hbs': 'handlebars-loader'
      };

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  }
}