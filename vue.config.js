const config = require('./config')

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '首页',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/scss/variables.scss";
        @import "@/assets/scss/global.scss";
        @import "@/assets/scss/override.scss";
        @import "@/assets/scss/animate.scss";
        `
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: `${config['api.protocol']}://${config['api.domain']}`,
        ws:true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/' : '/v1/'
        }
      }
    }
  }
}
