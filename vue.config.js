const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: `/admin-template-v${process.env.VUE_APP_VXE_VERSION}/`,
  devServer: {
    port: 8083,
    proxy: {
      '/demo/': {
        target: 'http://localhost:25819',
        pathRewrite: {
          '^/demo/': '/'
        }
      }
    }
  },
  configureWebpack: {
    performance: {
      hints: false
    },
    externals: {
      echarts: 'echarts'
    }
  },
  chainWebpack (config) {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
  }
})
