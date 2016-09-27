var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'www');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: path.join(APP_DIR, 'app.jsx'),
    output: {
        path: BUILD_DIR,
        filename: 'js/app.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: path.join(APP_DIR, 'css')
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=./fonts/[name].[ext]'
            }
        ]
    }
};

module.exports = config;
