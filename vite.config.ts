import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { ConfigEnv, UserConfigExport } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import { viteVConsole } from 'vite-plugin-vconsole';

function resolve(dir: string) {
  return path.join(__dirname, dir);
}

// https://vitejs.dev/config/

export default function ({ command }: ConfigEnv): UserConfigExport {
  return {
    server: {
      host: '0.0.0.0', // 解决不能通过ip访问
      proxy: {
        '/api': 'http://api.beehub.paradeum.com:8110',
        '/static': 'http://api.beehub.paradeum.com:8110'
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      eslintPlugin({
        fix: true
      }),
      styleImport({
        libs: [VantResolve()]
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      viteVConsole({
        entry: path.resolve('src/main.ts'), // entry file
        localEnabled: command == 'serve', // dev environment
        enabled: command != 'serve', // build production
        config: {
          maxLogNumber: 1000,
          theme: 'dark'
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    }
  };
}
