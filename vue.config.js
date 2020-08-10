const path = require("path")
const webpack = require("webpack")

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: ''
      }
    }
  },
  configureWebpack: config => {
    config.externals = {
      'vue': 'Vue'
    }
  },
  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //     })
  //   ]
  // },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
