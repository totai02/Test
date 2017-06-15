const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (function (options) {
    return {
        entry: {
            main: path.resolve("index.ts")
        }
        , output: {
            path: __dirname
            , filename: "bundle.js"
        }
        , devtool: '#source-map',
        module: {
            loaders: [
                {
                    test: /.ts$/
                    , include: [
                        path.resolve(__dirname, 'component')
                        , path.resolve(__dirname, 'config')
                        , path.resolve(__dirname, 'const')
                        , path.resolve(__dirname, 'core')
                        , path.resolve(__dirname, 'view')
                        , path.resolve(__dirname, 'index.ts')
                    ]
                    , loader: 'awesome-typescript-loader'
                }
                , {
                    test: /.(woff|css|png|json)$/
                    , include: [
                        path.resolve(__dirname, 'asset')
                    ]
                    , loader: 'file-loader?name=[name].[ext]' + '&publicPath=asset' + '&outputPath=asset'
                }
            ]
        }
        , resolve: {
            extensions: ['.ts', '.js']
        }
        , plugins: [
            new HtmlWebpackPlugin({
                title: 'Chắn'
            })
        ]
        , devServer: {
            /**
             * @link: https://webpack.js.org/configuration/stats
             */
            stats: {
                colors: true
                , chunks: false
                , hash: false
            }
        }
        , watchOptions: {
            aggregateTimeout: 300,
            poll: 250
            , ignored: /node_modules/
        }
    }
})