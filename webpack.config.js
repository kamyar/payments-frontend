var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = [{
        entry: {
            index: "./frontend/react/index.js",
        },
        output: {
            path: "./static/js/",
            filename: "[name].js"
        },
        module: {
            loaders: [{
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"]
                }
            }]
        },
        resolve: {
            extensions: ["", ".js", ".json"]
        }
    }, {
        entry: {
            style: "./frontend/less/style.less"
        },
        output: {
            path: "./static/css/",
            filename: "[name].css"
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                },

                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*)?$/,
                    loader: 'url?limit=50000'
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("[name].css")
        ]
    }

];