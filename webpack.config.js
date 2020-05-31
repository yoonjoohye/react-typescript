const path = require('path');
const webpack = require('webpack');
const {cleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let config = {
    entry: "./src/index.tsx",
    mode: "development",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", "jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    }
                },
                exclude: /(node_modules|dist)/
            },
            {
                test: /\.(ts|tsx)$/,
                use: ["ts-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "[name].[hash].css"
        }),
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, 'public/assets/puzzle.ico'),
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new WebpackManifestPlugin({
            fileName: "manifest.json",
            basePath: "/",
        })
    ],
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks: "initial"
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist")
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
        config.plugins.push( new webpack.HotModuleReplacementPlugin());
    }
    if (argv.mode === 'production') {
        config.plugins.push( new UglifyJsPlugin());
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