const path = require("path")
const webpack = require("webpack")

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
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
