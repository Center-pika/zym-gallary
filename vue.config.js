const webpack = require('webpack')
const Timestamp = new Date().getTime();

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      })
    ]
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // publicPath: './',
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
    },
  },
  devServer: {
    port: 8080,
    public: 'localhost:8080',
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://121.36.164.142/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}