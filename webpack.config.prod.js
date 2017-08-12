var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

const cssFilename = 'static/css/[name].[contenthash:8].css';
const extractTextPluginOptions = { publicPath: Array(cssFilename.split('/').length).join('../') }

module.exports = {
  entry: [
    'react-hot-loader/patch',
    __dirname + "/src/index.js"
  ],
  output: {
    path: __dirname + "/build",
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: './'
  },
  module: {
  	loaders: [
  		{
  			test: /\.js$/,
  			exclude: /node_modules/,
  			loader: 'babel-loader',
  			query: {
          presets: ['es2015','react','stage-2'],
          plugins: ['react-hot-loader/babel', 'transform-class-properties']
        }
  		},
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign({
            fallback: require.resolve('style-loader'),
            use: [
              { loader: "css-loader" }
            ]
          })
        )
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
        ],
        loader: "file-loader",
        options: {
          name: 'static/media/[name].[ext]',
        },
      },
  	]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: __dirname + "/public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        reduce_vars: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
     new ExtractTextPlugin({
      filename: 'main.css',
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],
};