const HtmlWebpackPlugin = require('html-webpack-plugin')
const themeConfig = require('./theme.config')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 部署应用包时的基本 URL
  // webpack配置
  configureWebpack: {
    entry: {
      compat: './src/utils/compat-utils.ts', // 兼容性，分类出来，在ie中加载
      app: './src/main.ts',
      ...themeConfig.entry
      // theme: ['./src/assets/themes/red/index.scss']
    },
    plugins: [
      process.env.NODE_ENV === 'production'
        ? new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/prod.html',
            inject: false, // 是否注入，默认值为true
            // minify: {
            //   // 默认值为 false, 不压缩
            //   removeAttributeQuotes: true, // 去掉双引号
            //   removeComments: true, // 去掉注释
            //   collapseWhitespace: true, // 去掉空白
            //   minifyJS: true // 压缩js
            // }
            minify: {
              removeAttributeQuotes: false, // 去掉双引号
              removeComments: true, // 去掉注释
              collapseWhitespace: false, // 去掉空白
              minifyJS: false // 压缩js
            }
          })
        : new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/dev.html',
            inject: true
          }),

      new webpack.DefinePlugin({
        $process: JSON.stringify({
          IS_WEB: !!process.env.IS_WEB,
          THEME: themeConfig.name // 仅在开发环境中用，生产环境中不用
        })
      })
    ]
  },

  // 生产环境的 source map
  productionSourceMap: false,

  css: {
    // sourceMap: true // 开启 CSS source maps
    sourceMap: process.env.NODE_ENV !== 'production' // 开启 CSS source maps
  }
}
