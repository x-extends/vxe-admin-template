import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    base: `/admin-template-v${env.VITE_APP_VXE_VERSION}/`,
    plugins: [
      vue(),
      vueJsx(),
      createHtmlPlugin({
        inject: {
          data: {
            ...env
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      },
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx']
    },
    server: {
      port: 9080,
      proxy: {
        '/demo': {
          target: 'http://localhost:25819',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/demo/, '')
        }
      }
    },
    build: {
      rollupOptions: {
        // 不打包依赖
        external: ['echarts'],
        plugins: [
          // 不打包依赖映射的对象
          externalGlobals({
            echarts: 'echarts'
          })
        ]
      }
    }
  }
}
