module.exports = {
  devServer:{
    open: true, // 自动打开浏览器
    // 代理
    proxy: {
      // 后端本地
      '/nd': {
        target: 'http://192.168.2.110:9100',
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
    // 全局引入scss
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