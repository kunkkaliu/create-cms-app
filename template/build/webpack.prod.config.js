var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.config');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

base.mode = 'production';
base.devtool = 'source-map';
// add hot-reload related code to entry chunks
Object.keys(base.entry).forEach(function (name) {
    // base.entry[name] = ['babel-polyfill'].concat(base.entry[name]);
    base.entry[name] = [].concat(base.entry[name]);
});
// use hash filename to support long-term caching
base.output.filename = 'static/js/[name].[chunkhash].js';
base.output.chunkFilename = 'static/js/[name].[chunkhash].js';

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
    new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true
            }
        }
    }),
    new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash].css"
    }),
    new webpack.HashedModuleIdsPlugin()
);

if (!!process.env.ANALYZE) {
    base.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = base;