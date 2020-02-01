const config = require('./config')

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '逐网逐搜',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  css: {
    loaderOptions: {
      css: {
        import: true,
      },
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
    open: true,
    host: config['server.host'],
    port: config['server.port'],
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
  },
  pluginOptions: {
    apollo: {
      lintGQL: true
    }
  }
}
