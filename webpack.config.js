/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

const path = require('path');
const { resolve } = require('path')

module.exports = {
  entry: {
    main: './public/index.js',
  },
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'app.dist.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
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
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ],
    noParse: /\.elm$/,
  },
  devServer: {
    inline: true,
    stats: { colors: true },
  },
}
