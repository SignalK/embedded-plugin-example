// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const { ModuleFederationPlugin } = require('webpack').container;
const { WatchIgnorePlugin } = require('webpack')

require('@signalk/server-admin-ui-dependencies')

const packageJson = require('./package')

module.exports = {
  entry: './src/index',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
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
        loader:
          'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'Calibration',
      library: { type: 'var', name: packageJson.name.replace(/[-@/]/g, '_') },
      filename: 'remoteEntry.js',
      exposes: {
        './PluginConfigurationPanel': './src/PluginConfigurationPanel.jsx',
      },
      shared: [{ react: { singleton: true } }],
    }),
    new WatchIgnorePlugin({
      paths: [path.resolve(__dirname, 'public/')]
    })
  ],
};