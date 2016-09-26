var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, path.join('www', 'js'));
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: path.join(APP_DIR, 'app.jsx'),
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
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
            }
        ]
    }
};

module.exports = config;
