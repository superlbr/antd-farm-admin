import path from 'path';
import { defineConfig } from '@farmfe/core';
import farmJsPluginSvgr from '@farmfe/js-plugin-svgr';

const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
  // compile options
  compilation: {
    lazyCompilation: true,
    persistentCache: true,
    minify: !isDevelopment,
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      }
    }
  },
  plugins: [
    '@farmfe/plugin-react',
    // [DOC] https://www.farmfe.org/zh/docs/plugins/official-plugins/js-svgr#options
    farmJsPluginSvgr({})
  ]
});
