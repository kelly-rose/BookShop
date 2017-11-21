/**
 * Created by siri on 2017-05-23.
 */
var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015',
                        'stage-1']

                    // ,plugins: [
                    //     'babel-plugin-transform-strict-mode'
                    // ]
                }
            }
        ]
    }
}