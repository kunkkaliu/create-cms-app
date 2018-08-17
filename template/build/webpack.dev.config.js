var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.config');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

base.mode = 'development';
// base.devtool = 'cheap-module-eval-source-map';
// add hot-reload related code to entry chunks
Object.keys(base.entry).forEach(function (name) {
    base.entry[name] = ['react-hot-loader/patch', 'webpack-hot-middleware/client'].concat(base.entry[name]);
});
// base.entry.unshift('babel-polyfill', 'react-hot-loader/patch', 'webpack-hot-middleware/client');
base.optimization = {
    runtimeChunk: {
        name: "runtime"
    },
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all"
            }
        }
    }
};
base.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
        filename: "static/css/[name].css"
    })
);

module.exports = base;
