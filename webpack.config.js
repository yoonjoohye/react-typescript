const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let config = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    devtool:'inline-source-map',
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.sass', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                        plugins: ['@babel/proposal-object-rest-spread']
                    }
                },
                exclude: /(node_modules)/
            },
            {
                test: /\.(ts|tsx)$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: './dist/',
                        name: '[name].[ext]?[hash]',
                    }
                }
            },
            // {
            //     test: /\.(png|svg|jpe?g|gif|ico|eot|ttf|woff|woff2|otf)$/,
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             publicPath: './dist/',
            //             name: '[name].[ext]?[hash]',
            //             limit: 10000
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, 'public/assets/img/puzzle.ico'),
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new WebpackManifestPlugin({
            fileName: 'manifest.json'
        })
    ],
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial'
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool='inline-source-map';
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    if (argv.mode === 'production') {
        config.devtool='source-map';
        config.plugins.push(new UglifyJsPlugin());
    }
    return config;
};


// module.exports = {
//     entry: "./src/index.tsx",
//     mode: "development",
//     devtool: "source-map",
//     resolve: {
//         extensions: [".ts", ".tsx", ".js", "jsx"]
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(ts|tsx|js|jsx)$/,
//                 use: {
//                     loader: "babel-loader",
//                     options: {
//                         presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
//                     }
//                 },
//                 exclude: /(node_modules|dist)/
//             },
//             {
//                 test: /\.(ts|tsx)$/,
//                 use: ["ts-loader"],
//                 exclude: /node_modules/
//             },
//             {
//                 test: /\.(sc|sa|c)ss$/,
//                 use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
//                 exclude: /node_modules/
//             }
//         ]
//     },
//     plugins: [
//         new miniCssExtractPlugin({
//             filename: "[name].[hash].css"
//         }),
//         new UglifyJsPlugin(),
//         new HtmlWebpackPlugin({
//             favicon: path.resolve(__dirname, 'public/assets/puzzle.ico'),
//             template: path.resolve(__dirname, 'public/index.html')
//         }),
//         new WebpackManifestPlugin({
//             fileName: "manifest.json",
//             basePath: "/",
//         }),
//         new webpack.HotModuleReplacementPlugin()
//
//     ],
//     optimization: {
//         splitChunks: {
//             name: "vendor",
//             chunks: "initial"
//         },
//         runtimeChunk: {
//             name: "runtime"
//         }
//     },
//     output: {
//         filename: "[name].[hash].js",
//         path: path.resolve(__dirname, "dist")
//     }
// }