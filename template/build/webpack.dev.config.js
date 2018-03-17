var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.config');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

base.mode = 'development';
// base.devtool = 'cheap-module-eval-source-map';
// add hot-reload related code to entry chunks
Object.keys(base.entry).forEach(function (name) {
    base.entry[name] = ['react-hot-loader/patch', 'webpack-hot-middleware/client'].concat(base.entry[name]);
});
// base.entry.unshift('babel-polyfill', 'react-hot-loader/patch', 'webpack-hot-middleware/client');
base.optimization = {
    runtimeChunk: {
        name: "manifest"
    },
    splitChunks: {
        cacheGroups: {
            common: {
                test: /[\\/]node_modules[\\/]/,
                name: "common",
                chunks: "all"
            }
        }
    }
};
base.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("static/css/[name].css", {
        allChunks: true
    })
);

module.exports = base;
