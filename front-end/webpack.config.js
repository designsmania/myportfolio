const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const DEVELOPMENT = process.env.NODE_ENV === "development";
const PRODUCTION = process.env.NODE_ENV === "production";
const STAGING = process.env.NODE_ENV === "staging";

let CDN = STAGING ? "https://d8poasi6iqc7x.cloudfront.net/staging.trvlr" : "https://d8poasi6iqc7x.cloudfront.net/trvlr";

if (DEVELOPMENT) CDN = "../";

const CSS_DEV =  ["style-loader", "css-loader", "sass-loader"];
const cssExtract = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader','postcss-loader','sass-loader'],
    publicPath: '../'
});


const pathsToClean = [
   'dist/css/*',
   'dist/*.html',
   'dist/*.js',
   'dist/*.js.map',

 ]
 module.exports = {
   entry: ["babel-polyfill","./src/index.js"],
   output: {
     path: path.resolve(__dirname, "dist"),
     filename: "[name].bundle.js"
   },
   module: {
     rules: [
       {
         test: /\.js$/,
         exclude: /node_modules/,
         use: [
           {
             loader: 'babel-loader',
             options: {
                 presets: ["env"]
             }
           }
         ]
       },
       {
         test: /\.html$/,
         use: ['html-loader']
       },
       {
         test: /\.(css|scss|sass)$/,
         exclude: /node_modules/,
         use: cssExtract
       },

       {
         test: /\.(jpg|png|svg)$/,
         use: [
             {
                 loader: 'file-loader',
                 options: {
                     name: '[name].[ext]',
                     outputPath: 'images/'
                 }
             }
         ]
       }
     ]
   },

   devtool: 'source-map',
   devServer: {
     contentBase: path.join(__dirname, "dist"),
     open: true,
     host: '127.0.0.1',
     port:8080,
     compress: true,
     hot: true
   },
   plugins: [
     new webpack.ProvidePlugin({
       TweenMax: "gsap/TweenMax",
       Draggable: "gsap/Draggable"
     }),
     new HtmlWebpackPlugin({
       template: "src/index.html"
     }),
     new CopyWebpackPlugin([
      {from:'./src/images', to: 'images'},
      {from:'./src/data', to: 'data'}
    ]),
     new ExtractTextPlugin({
       filename: 'css/app.css',
       disable: DEVELOPMENT,
       allChunks: true
     }),
     new webpack.DefinePlugin({
       DEVELOPMENT: JSON.stringify(DEVELOPMENT),
       PRODUCTION: JSON.stringify(PRODUCTION),
       STAGING: JSON.stringify(STAGING),       
       CDN: JSON.stringify(CDN),
     }),
     new CleanWebpackPlugin(
       pathsToClean, {
       root: __dirname,
       verbose: true,
       dry: false,
       exclude: ['images/*', "videos/*", "libs/*"]
     }),
     new webpack.optimize.ModuleConcatenationPlugin(),
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NamedModulesPlugin()
   ]
 }
