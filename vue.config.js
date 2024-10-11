const { defineConfig } = require('@vue/cli-service')

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
