const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); /* eslint-disable-line */

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components)/,
        use: [
          {loader: 'eslint-loader'},
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(js|mjs|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'babel-loader' },
        ] // options 在 .babelrc 定义
      }
    ]
  },
  // optimization: {
  //   minimizer: [new UglifyJsPlugin({
  //     uglifyOptions: {
  //       compress: {
  //         warnings: false,
  //         drop_console: true,
  //         pure_funcs: ['console.log']
  //       }
  //     },
  //     // sourceMap: config.build.productionSourceMap,
  //     parallel: true
  //   })],
  // },
};