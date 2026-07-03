const { defineConfig } = require('@vue/cli-service')
const XEUtils = require('xe-utils')

process.env.VUE_APP_BUILD_TIME = XEUtils.toDateString(new Date(), 'yyyy-MM-dd HH:mm:ss')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_BASE_PATH,
  assetsDir: 'static',
  devServer: {
    port: process.env.VUE_APP_SERVER_PORT,
    proxy: {
      '/adminapi': {
        target: env.VUE_APP_ADMIN_DEV_API_URL,
        changeOrigin: true,
        pathRewrite: { '^/adminapi': '' } 
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
