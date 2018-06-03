const path = require('path');
module.exports = {
    mode: "development",
    entry: './src/linqable.ts',
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
        filename: 'linqable.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: "node"
};