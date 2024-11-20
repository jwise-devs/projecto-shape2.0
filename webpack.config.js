const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'public/assets/js'),
        publicPath: '/assets/js/', // Caminho público
    },
    module: {
        rules: [

            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },

    watch: true,
    

};