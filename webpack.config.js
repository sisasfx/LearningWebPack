const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //npm install html-webpack-plugin -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')//npm install copy-webpack-plugin -D 

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.js']
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
        }
    ]
    },
    plugins: [ //Added after the plugin html-webpack-plugin -D (Development)
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(), // Adding plugin
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
    ]
}