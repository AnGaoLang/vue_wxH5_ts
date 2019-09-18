module.exports = {
  devServer:{
    open: true,
    proxy: {
      '/nd': {
        target: 'http://hhlqr.whcewei.com/',
        changeOrigin: true,
        ws: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/nd/' : '/',
  configureWebpack: {
    devtool: 'source-map',
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/css/variable.scss"`
      },
      scss: {
        data: `@import "~@/assets/css/variable.scss";`
      },
    }
  }
}