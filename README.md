# js-portfolio TO UNDERSTAND WEBPACK!

# npm install webpack webpack-cli -D
# You can use npx webpack --mode production 

# Or  Once you create file webpack.config.js and write that code --> module.exports = {
#    entry: './src/index.js',
#   output: {
#        path: path.resolve(__dirname, 'dist'),
#        filename: 'main.js',
#    },
#    resolve: {
#        extensions: ['.js']
#    },

#     console npx webpack --mode production --config webpack.config.js

# Then add Babel, Babel allows the code to be runned in all browsers npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime --> will be added in package.json --> folloW the standar in software industry, create .babelrc 
# {
#    "presets": [
#        "@babel/preset-env"  
#    ],
#    "plugins": [
#        "@babel/plugin-transform-runtime"
#    ]
# }

# Then add module --> rules in webpack.config.js

# How to add HTML --> npm install html-webpack-plugin -D --> add to webpack.config.js by require fun. After module add plugins: -->  plugins: [
#        new HtmlWebpackPlugin({
#            inject: true,
#            template: './public/index.html',
#            filename: './index.html'
#        }),

# Then delete script index.js because webpack will get it from dist folder

### How to add CSS --> npm install mini-css-plugin css-loader -D --> delete link styles.css from HTML. 
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
