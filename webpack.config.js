const path = require('path');
const Dotenv = require('dotenv-webpack');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: ['./src/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].js",
        publicPath: '/',  // Добавьте эту строку для корректной работы маршрутизации
    },
    devServer: {
        port: 3001,
        historyApiFallback: true,
        // https: {
        //     key: path.resolve(__dirname, 'server.key'),
        //     cert: path.resolve(__dirname, 'server.cert'),
        // },
        // host: '192.168.55.4'

    },
    resolve: {
        extensions: ['.jsx', '.tsx', '.js', '.ts', '.json']
    },
    plugins: [
        new HTMLWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin(),
        new Dotenv(),
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
                test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
                type: 'asset/resource',  // Используем встроенный тип для обработки изображений
                generator: {
                    filename: 'images/[name][hash][ext][query]'  // Путь для выходных файлов
                }
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    devtool: 'eval-source-map'
};
