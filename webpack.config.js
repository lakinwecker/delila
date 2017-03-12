const webpack = require('webpack')
const { resolve } = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractSass = new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      disable: process.env.NODE_ENV === "development"
});
module.exports = {
  entry: './src/main',
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    },
    {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.ts',
      '.tsx',
      '.jsx'
    ]
  },
  devtool: 'source-map',
  plugins: process.env.NODE_ENV === 'production'
    ? [
      new webpack.optimize.UglifyJsPlugin(),
      extractSass,
      new CheckerPlugin()
    ]
    : [
      extractSass,
      new CheckerPlugin()
    ]
}
