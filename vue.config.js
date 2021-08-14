const webpack = require('webpack')

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
  publicPath: process.env.NODE_ENV === 'development' ? './' : '/zym-gallary/',
  devServer: {
    port: 8080,
    public: 'localhost:8080',
    host: 'localhost'
  }
}