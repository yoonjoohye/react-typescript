# Plan kit

> 만다라트와 smart 기법을 합친 계획도구를 개발하기 위해 만들었음

> 곧 리팩토링 옮길 예정임. (진행중)

Skills
---
> react + typescript + webpack



## 웹팩 설정

```
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
            }
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
```





## ScreenShot

no Image
