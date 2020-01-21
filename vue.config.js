const path = require('path')
const resolve = dir => path.join(__dirname, dir)

// production是指线上
const BASE_URL = process.env.NODE_ENV === 'production' ? '/iview-admin' : '/'
module.exports = {
  publicPath: BASE_URL,
  // @表示src，就是个简写
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    proxy: 'http://47.104.240.145:8001'
  }
}
