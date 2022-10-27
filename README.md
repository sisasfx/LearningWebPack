# js-portfolio TO UNDERSTAND WEBPACK!

### npm install webpack webpack-cli -D
### You can use npx webpack --mode production 

Or  Once you create file webpack.config.js and write that code --> module.exports = {
    entry: './src/index.js',
   output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.js']
    },
###     console npx webpack --mode production --config webpack.config.js

 Then add Babel, Babel allows the code to be runned in all browsers npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime --> will be added in package.json --> folloW the standar in software industry, create .babelrc 
 {
    "presets": [
        "@babel/preset-env"  
    ],
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
 }

#### Then add module --> rules in webpack.config.js

## How to add HTML --> npm install html-webpack-plugin -D --> add to webpack.config.js by require fun. After module add plugins: -->  plugins: [
       new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),

### Then delete script index.js because webpack will get it from dist folder

## How to add CSS --> npm install mini-css-plugin css-loader -D --> delete link styles.css from HTML. 
 import in src/index.js './styles/main.css' and add to webpack.config new rule 
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
            test: /\.css|.styl$/i, 
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader' 
            ]
        }
    ]
 and add plugin! then if you want to use SASS, LESS, STYLUS... do --> npm install stylus stylus-loader -D --> add rule (allready added above)

 How to copy images from src to dist folder --> npm install copy-webpack-plugin -D --> add import in webpack.config.js and write the pattern in plugins -->
 new CopyPlugin({
            patterns: [
               {
              from: path.resolve(__dirname, "src", "assets/images"),  
                    to: "assets/images"
                }
            ]
        }), 

 Then we have to refactor src="" in HTML to src from new pattern

 A better way to perform our resources in our App/Web is by adding in module -> rules    
       {
            test: /\.png/,
            type: 'asset/resource'
        }
    ]
 And import our images and use then with string Interpolation in our src -> template
 import getData from '../utils/getData.js';
 import gitHub from '../assets/images/github.png';
 import twiter from '../assets/images/twitter.png';
 import instagram from '../assets/images/instagram.png'


## Google fonts

In our styles.css we import our fonts from and url, also we have them in assets/fonts.

A better way to do this is by adding in styles.css.

@font-face {
	font-family: 'Ubuntu';
	src: url('../assets/fonts/ubuntu-regular.woff2') format('woff2'),
		url('../assets/fonts/ubuntu-regular.woff') format('woff');
		font-weight: 400;
		font-style: normal;
}

### run npm install url-loader file-loader -D add to webpack.config.js / module -> rules

{
            test: /\.(woff|woff2)$/,
            use : {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    name: "[name].[ext]",
                    outputPath: "./assets/fonts/",
                    publicPath: "./assets/fonts/",
                    esModule: false
                }
            }
        }

### Add to module.exports -> output
 assetModuleFilename: 'assets/images/[hash][ext][query]'

 DETELE IMPORT IN STYLES.CSS

## Optimitazion: hash, compresion and min. files
#### npm install css-minimizer-webpack-plugin terser-webpack-plugin -D 

Add this lines after plugins
optimization :{
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }

    And in every "name" or "filename" add [name].[contenthash].extension 

    ** In webpack file there's comments to help **

## WebPack Alias
It is used to replace import '../../../whatever' all dots and slashes
In resolve, after extensions we add the following code.
Each alias references a folder path.
 resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },

#### The good thing is to replace relative path for an alias! @template/...     @styles/... 

## Variables de entorno
Create file .env --> don't push it to git ask leader team for var. and create ** .env-example ** --> this file is pushed to git without info.

## npm install clean-webpack-plugin -D
const { CleanWebpackPlugin} = require('clean-webpack-plugin'); in ** webpack.config.js ** and add plugin.

Then change packaje.json scripts "dev" and "prod" 

