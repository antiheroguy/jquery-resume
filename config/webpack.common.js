require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const entries = require('./entries')

module.exports = {
  entry: Object.entries(entries).reduce((config, [page, assets]) => {
    assets.forEach(asset => {
      config[asset] = path.resolve(__dirname, `../src/${asset}`)
    })
    return config
  }, {}),


  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    publicPath: '/',
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  plugins: [
    ...[].concat(
      Object.entries(entries).map(
        ([page, assets]) =>
          new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, `../src/pug/${page}.pug`),
            filename: `${page}.html`,
            chunks: assets,
            favicon: path.resolve(__dirname, '../src/images/favicon.ico'),
          })
      )
    ),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env)
    })
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: 'src',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]',
          context: 'src',
        },
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: 'jQuery'
          }, {
            loader: 'expose-loader',
            options: '$'
          }
        ]
      }
    ],
  },
}