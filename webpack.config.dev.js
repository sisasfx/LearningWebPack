const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //npm install html-webpack-plugin -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')//npm install copy-webpack-plugin -D 
const DotEnv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', //Before adding CssMinimizer and Terser we had main.js
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true, // --> keeps whatching changes
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    //After do .babelrc
    module: {
        rules:[
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css|.styl$/i, // -> Adding new rule for .css & preprocesor stylus
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader' //npm install stylus stylus-loader -D
            ]
        },
        {
            test: /\.png/,
            type: 'asset/resource'
        },
        {
            test: /\.(woff|woff2)$/,
            use : {
                loader: 'url-loader',
                options: {
                    limit: 10000, //Or boolean true|false enables file transform un base64
                    mimetype: "application/font-woff", //MIME type (Multipurpose Internet Mail Extensions) they are the standard way of sending content over the network.
                    name: "[name].[contenthash].[ext]", //[contenthash] added after CssMinimizer and teaser
                    outputPath: "./assets/fonts/",
                    publicPath: "../assets/fonts/",
                    esModule: false // is a module? true|false
                }
            }
        }
    ]
    },
    plugins: [ //Added after the plugin html-webpack-plugin -D (Development)
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({ // Adding plugin
            filename: 'assets/[name].[contenthash].css' //Added after CssMinimizer and Terser
        }), 
        new CopyPlugin({
            patterns: [
                {
                    /*Copy assets folder from --> to dist folder in assets/images
                    also we need to refactor src in html to assets/images*/
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new DotEnv(),
    ],
}