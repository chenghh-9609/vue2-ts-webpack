const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(config, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/chunk.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'deterministic',
    minimize: true,
    runtimeChunk: 'single',
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/,
        include: /\/src/,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: {
          chunks: "initial",
          // 模块缓存规则，设置为false，默认缓存组将禁用
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20, // 优先级
          reuseExistingChunk: true, // 默认使用已有的模块
        },
        vendors: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
          priority: -10,
        },
        elementUI: {
          chunks: 'all',
          name: 'chunk-elementUI', // 单独将 elementUI 拆包
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          priority: 10,
        },
      },
    },
  },
  plugins: [
    new TerserPlugin({
      test: /\.js(\?.*)?$/i, //匹配需要压缩的文件类型
      include: /\/src/, //匹配参与压缩的文件
      parallel: true, // 多进程并发运行以提高构建速度，强烈建议添加此配置
      minify: TerserPlugin.uglifyJsMinify, // 类型为function，可自定义压缩函数，此处使用ugligy-js压缩
      extractComments: false, // 删除注释
      terserOptions: {
        compress: true,
        format: {
          comments: false,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html'),
      chunks: ['vendor', 'app', 'element-ui'],
      minify: {
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        collapseWhitespace: true,
        useShortDoctype: true,
      },
    }),
  ],
});
