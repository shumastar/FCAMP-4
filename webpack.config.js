const path = require('path');
const argv = require('yargs').argv;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevMode = argv.mode === 'development';
const isProdMode = !isDevMode;
const distPath = path.join(__dirname, '/dist');

const config = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: distPath
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: 'html-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              isProdMode ? require('cssnano') : () => {},
              require('autoprefixer')({
                browsers: ['last 2 versions']
              })
            ]
          }
        },
        'sass-loader'
      ]
    }, {
      test: /\.(gif|png|jpe?g|svg|ico)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 70
          }
        }
      },
      ],
    },
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ],
  optimization: isProdMode ? {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            drop_console: true
          },
        },
      }),
    ],
  } : {},
  devServer: {
    contentBase: distPath,
    port: 9000,
    compress: true,
    open: true
  }
};

module.exports = config;