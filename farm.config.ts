import path from 'path';
import { defineConfig } from '@farmfe/core';
import farmJsPluginSvgr from '@farmfe/js-plugin-svgr';
import farmJsPluginLess from '@farmfe/js-plugin-less'

const { NODE_ENV } = typeof process == 'undefined' ? import.meta.env : process.env;
const isDevelopment = NODE_ENV === 'development';

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
    farmJsPluginSvgr({}),
    // [DOC] https://www.farmfe.org/zh/docs/plugins/official-plugins/js-less#options
    farmJsPluginLess({}),
  ]
});
