module.exports = {
  devServer:{
    open: true,
    proxy: {
      // 后端本地
      '/nd': {
        target: 'http://192.168.2.111:9100',
        changeOrigin: true,
        ws: true
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
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