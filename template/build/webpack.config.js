var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
    return path.join(__dirname, '../', dir)
}

function src(dir) {
    return resolve(path.join('src', dir))
}

module.exports = {
    entry: {
        main: src('index.jsx')
    },
    target: 'web',
    output: {
        path: resolve('dist'),
        filename: 'static/js/[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            MOCK: !!process.env.MOCK
        }),
        new HtmlWebpackPlugin({
            template: src('index.html'),
            filename: 'index.html',
            minify: {
                minifyCSS: true,
                minifyJS: true
            },
            chunks: ['manifest', 'vendor', 'main'],
            // favicon: __dirname + '/favicon.ico',
            chunksSortMode: 'dependency'
        })
    ],
    resolve: {
        alias: {
            'network': src('network'),
            'actions': src('actions'),
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
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, 'postcss-loader']
            },
            {
                test: /\.less?$/,
                exclude: /node_modules/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: true,
                        localIdentName: '[local]___[hash:base64:5]'
                    }
                }, 'postcss-loader', 'less-loader']
            },
            {
                test: /\.less?$/,
                exclude: /src/,
                use: ['style-loader', MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, 'postcss-loader', 'less-loader']
            }
        ]
    }
};
