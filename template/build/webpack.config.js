var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var GitRevisionPlugin = require('git-revision-webpack-plugin');
var gitRevisionPlugin = new GitRevisionPlugin();
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function src(dir) {
    return resolve(path.join('src', dir))
}

var theme = {};
var pkgPath = resolve('package.json');
var pkg = require(pkgPath);
theme = pkg.theme;

module.exports = {
    entry: {
        main: src('index.jsx')
    },
    devtool: 'inline-source-map',
    target: 'web',
    output: {
        path: resolve('dist'),
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            MOCK: !!process.env.MOCK,
            CODE_VERSION: `"${gitRevisionPlugin.commithash()}"`,
            CODE_ENV: JSON.stringify(process.env.CODE_ENV)
        }),
        new HtmlWebpackPlugin({
            title: 'xxx系统',
            template: src('index.html'),
            filename: 'index.html',
            minify: {
                minifyCSS: true,
                minifyJS: true,
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true
            },
            chunks: ['runtime', 'vendor', 'main'],
            favicon: src('favicon.ico'),
            chunksSortMode: 'dependency'
        }),
        new InlineManifestWebpackPlugin('runtime')
    ],
    resolve: {
        alias: {
            'network': src('network'),
            'actions': src('actions'),
            'containers': src('containers'),
            'components': src('components'),
            'utils': src('utils'),
            'assets': src('assets'),
            'pages': src('pages'),
            'layouts': src('layouts')
        },
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /node_modules/,
                include: resolve('')
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: resolve('')
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/images/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.css?$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, 'postcss-loader']
            },
            {
                test: /\.less?$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: true,
                        localIdentName: '[local]___[hash:base64:5]'
                    }
                }, 'postcss-loader', {
                    loader: 'less-loader',
                    options: {
                        modifyVars: theme
                    }
                }]
            },
            {
                test: /\.less?$/,
                exclude: /src/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, 'postcss-loader', {
                    loader: 'less-loader',
                    options: {
                        modifyVars: theme
                    }
                }]
            }
        ]
    }
};
