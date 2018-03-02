/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

const path = require('path');
const { resolve } = require('path')

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test:    /\.html$/,
        exclude: /node_modules/,
        loader:  'file-loader?name=[name].[ext]',
      },
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader:  'elm-webpack-loader?verbose=true&warn=true',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ],
    noParse: /\.elm$/,
  },
  devServer: {
    inline: true,
    stats: { colors: true },
  },
}
