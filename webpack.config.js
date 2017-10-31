const webpack = require('webpack')
const path = require('path')
const srcPath = path.resolve(__dirname, 'src')

const env = process.env.NODE_ENV

const rxactExternal = {
  root: 'Rxact',
  commonjs2: 'rxact',
  commonjs: 'rxact',
  amd: 'rxact'
}

const xstreamExternal = {
  root: 'Xstream',
  commonjs2: 'xstream',
  commonjs: 'xstream',
  amd: 'xstream'
}

const config = {
  externals: {
    rxact: rxactExternal,
    xstream: xstreamExternal,
  },
  entry: './src/index.js',
  resolve: {
    modules: [
      'node_modules',
      srcPath,
    ],
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
      include: srcPath,
    }],
  },
  output: {
    library: 'rxcat-xstream',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
  ],
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

module.exports = config
