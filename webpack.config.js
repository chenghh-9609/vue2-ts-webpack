const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
  target: 'web',
  entry: {
    app: './src/main.ts',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash].js',
    clean: true,
  },
  stats: {
    colors: true,
    assets: true,
    assetsSort: '!size',
    assetsSpace: 15,
    groupAssetsByExtension: true,
    moduleAssets: false,
    hash: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    warnings: false,
  },
  devServer: {
    port: 5000,
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: 'inline-source-map', //开发环境使用
  optimization: {
    runtimeChunk: 'single', //解决热更新失效问题
    splitChunks: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ttf|woff|woff2|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/], //TypeScript 将文件作为模块导入.vue
          transpileOnly: true, //不要进行类型检查
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html'),
    }),
    new VueLoaderPlugin(),
  ],
};
