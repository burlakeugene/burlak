const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: ['./src/common.js'],
  output: {
    filename: './js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                require('@babel/plugin-proposal-optional-chaining'),
                require('@babel/plugin-syntax-dynamic-import'),
                require('@babel/plugin-proposal-object-rest-spread'),
                [
                  require('@babel/plugin-proposal-decorators'),
                  { legacy: true },
                ],
                [
                  require('@babel/plugin-proposal-class-properties'),
                  { loose: true },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
