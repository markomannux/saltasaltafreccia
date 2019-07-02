const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const path = require('path');
module.exports = {
  entry: './src/index.js',
  devServer: {
    openPage: 'saltasaltafreccia/',
    proxy: {
      '/saltasaltafreccia': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/saltasaltafreccia': '',
        },
      },
    },
    contentBase: './dist',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: path.join(__dirname, 'src/es6'),
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif|wav)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Salta salta freccia',
      template: './src/index.html',
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
      publicPath: '/saltasaltafreccia/',
    }),
    new WebpackPwaManifest({
      'name': 'Salta Salta Freccia',
      'short_name': 'SSF',
      'description': 'Description!',
      'background_color': '#01579b',
      'theme_color': '#01579b',
      'theme-color': '#01579b',
      'start_url': '/saltasaltafreccia//',
      'display': 'fullscreen',
      'orientation': 'landscape',
      'prefer_related_applications': false,
      'icons': [
        {
          src: path.resolve('src/assets/images/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
};
