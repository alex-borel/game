module.exports = {
    entry: {
        app: './js/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        publicPath: 'dist/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devtool: 'source-map'
}

