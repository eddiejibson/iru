const path = require("path");

module.exports = {
    mode: 'production',
    entry: './src/iru.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'iru.min.js'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["minify"],
                        [
                            "@babel/env",
                            {
                                targets: {
                                    edge: "15",
                                    firefox: "40",
                                    chrome: "40",
                                    safari: "8",
                                    ie: "10"
                                },
                                useBuiltIns: "entry",
                            },
                        ],
                    ],
                }
            }
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    resolve: {
        mainFields: ['browser', 'main']
    }
};