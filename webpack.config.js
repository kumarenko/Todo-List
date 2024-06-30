const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: ['./src/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].js",
    },
    devServer: {
        port: 3001,
        historyApiFallback: true,
        // https: {
        //     key: path.resolve(__dirname, 'server.key'),
        //     cert: path.resolve(__dirname, 'server.cert'),
        // },
        // // Убедитесь, что у вас установлен host на localhost для исключения из требований https
        // host: '192.168.55.4'

    },
    resolve: {
        extensions: ['.jsx', '.tsx', '.js', '.ts', '.json']
    },
    plugins: [
        new HTMLWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.(jpeg|png|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    devtool: 'eval-source-map'
};
