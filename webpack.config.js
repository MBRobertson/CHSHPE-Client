var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'www');
var APP_DIR = path.resolve(__dirname, 'src');

var TRAVIS = process.env.TRAVIS ? JSON.parse(process.env.TRAVIS) : false;
var plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
];

if (TRAVIS) {
    console.log('TRAVIS mode (will fail on error)');
    plugins.push(new webpack.NoErrorsPlugin());
}

var config = {
    bail: TRAVIS,
    entry: ['whatwg-fetch', path.join(APP_DIR, 'app.jsx')],
    plugins: plugins,
    resolve: {
        alias: {
            'config': path.join(__dirname, 'src', 'config.jsx'),
            'data': path.join(__dirname, 'src', 'data.jsx')
        }
    },
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
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file?name=./fonts/[name].[ext]'
            },
            {
                test: /\.(png|svg)$/,
                loader: 'file?name=./img/[name].[ext]'
            }
        ]
    }
};

module.exports = config;
