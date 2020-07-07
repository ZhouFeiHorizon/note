module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'import', // https://www.npmjs.com/package/babel-plugin-import
      {
        /** 按需加载 element-ui */
        libraryName: 'element-ui',
        // ~ + 自定义路径
        // styleLibraryName: '~src/assets/css/element-ui.scss',
        // style: false
        // style: './src/assets/css/element-ui.scss'
      }
    ]
  ]
}
