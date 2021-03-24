const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 这里必须是/，否则动态路由引用错误
  publicPath: '/',
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@network', resolve('src/network'))
      .set('@views', resolve('src/views'))
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@assets/css/global.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://jinyuu.cn',
        changeOrigin: true,
        ws: false
      }
    },
  }
}
