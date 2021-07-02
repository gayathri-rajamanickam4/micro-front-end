const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        /** marketing: import name
         * 'marketing@http://localhost:8081/remoteEntry.js' - here marketing should be same name exposed by MFE
         */
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
