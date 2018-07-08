const path = require('path');
function getFilename(env) {
    if (env === "production")
        return "linq.min.js";
    else
        return "linq.js";
}
module.exports = (env) => {
    return {
        entry: './src/index.ts',
        mode: env,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: getFilename(env),
            path: path.resolve(__dirname, 'lib/web')
        }
    }
};