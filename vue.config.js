const { defineConfig } = require('@vue/cli-service')
const XEUtils = require('xe-utils')

process.env.VUE_APP_BUILD_TIME = XEUtils.toDateString(new Date(), 'yyyy-MM-dd HH:mm:ss')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: `/admin-template-v3/`,
  assetsDir: 'static',
  devServer: {
    port: 8083
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
