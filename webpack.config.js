const path = require('path');
module.exports = {
    mode: "development",
    entry: './src/linq.ts',
    devtool: 'cheap-module-eval-source-map',
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
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        filename: 'linqts.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: "node"
};