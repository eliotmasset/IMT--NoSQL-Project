const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './index.tsx',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].js',
        library: {
            name: 'NoSQL',
            type: 'umd',
        },
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        corejs: 3,
                                        targets: 'defaults',
                                        useBuiltIns: 'usage',
                                    },
                                ],
                                ['@babel/preset-react'],
                                ['@babel/preset-typescript'],
                            ],
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = (_env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'eval';

        config.devServer = {
            static: path.resolve(__dirname, 'dist'),
            host: 'localhost',
            port: '2345',
            historyApiFallback: true,
            open: true,
            hot: true,
        };
    }

    return config;
};
