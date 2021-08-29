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
  configureWebpack: {
    output: {
      filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
    },
  },
  devServer: {
    port: 8080,
    public: 'localhost:8080',
    host: 'localhost',
    // host: '192.168.2.9',
    hot:true,
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