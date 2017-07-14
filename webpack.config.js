var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: [
        './public/javascript/index.js'
    ],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: '/public'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
        ]
    }
}
