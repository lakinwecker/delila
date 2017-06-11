/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

const path = require('path');
const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

var babelOptions = {
  "presets": [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    "es2016"
  ]
};

const extractSass = new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      disable: process.env.NODE_ENV === "development"
});
module.exports = {
  entry: { 
    main: './src/main',
  },
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
      test: /\.ts(x)?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
      loader: 'file?name=public/fonts/[name].[ext]'
    }]
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.ts',
      '.tsx',
      '.jsx',
      '.scss'
    ]
  },
  devtool: 'source-map',
  plugins: process.env.NODE_ENV === 'production'
    ? [
      new webpack.optimize.UglifyJsPlugin(),
      extractSass,
    ]
    : [
      extractSass,
    ]
}
