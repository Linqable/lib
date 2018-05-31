const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/linq.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: 'linqts.js',
        path: path.resolve(__dirname, 'dist')
    }
};