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
        // prependData: `@import "~@/assets/css/variable.scss"` // 最新版本用这个定义全局sass变量
      },
      scss: {
        data: `@import "~@/assets/css/variable.scss";`
        // prependData: `@import "~@/assets/css/variable.scss";`
      },
    }
  },
  // 配置自定义格式文件（m4a）的提取和打包 
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
          options.transformAssetUrls = {
            audio: 'src', 
            source: 'src',
          }
          return options;
      });

    config.module
      .rule('media')
      .test(/\.(mp4|m4a|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
  }
}