const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // libraryTarget: 'commonjs2'
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
        exclude: /\.module.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.module.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[name]_[hash:base64:6]',
            }
          }
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
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};