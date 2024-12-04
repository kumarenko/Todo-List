const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // Для минификации

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production'; // Проверка на продакшн

    return {
        mode: isProd ? 'production' : 'development', // Задаем режим сборки
        entry: ['./src/index.tsx'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? '[name].[contenthash].js' : '[name].[hash].js', // Для продакшн используем contenthash для кэширования
            publicPath: '/',
        },
        devServer: {
            port: 3001,
            historyApiFallback: true,
        },
        resolve: {
            extensions: ['.jsx', '.tsx', '.js', '.ts', '.json']
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: './src/index.html',
                favicon: './src/media/logo.ico',
            }),
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
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][hash][ext][query]'
                    }
                },
                {
                    test: /\.(css|less)$/,
                    use: ['style-loader', 'css-loader', 'less-loader']
                }
            ]
        },
        optimization: {
            minimize: isProd, // Минимизируем код только в продакшне
            minimizer: [new TerserPlugin()],
            splitChunks: {
                chunks: 'all',
            }
        },
        devtool: isProd ? 'source-map' : 'eval-source-map', // Для продакшн используем source-map для лучшей отладки
    };
};
