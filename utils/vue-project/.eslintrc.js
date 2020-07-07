module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 分号不错误
    // https://eslint.org/docs/user-guide/configuring
    // 'semi': 0, //语句强制分号结尾
    semi: [2, 'never'], // 语句强制分号结尾
    quotes: [2, 'single'], // 引号类型 `` "" ''
    yoda: 'off',
    // allow async-await
    'generator-star-spacing': 'off', // 生成器函数*的前后空格
    // allow debugger during development

    // 忽略vue组件标签是自闭合有end标签会报错检查
    // IDE检查时去掉这项检查，避免被“优化”掉
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'space-before-function-paren': [2, 'never'], // 函数定义时括号前面要不要有空格
    'no-useless-escape': 0 // 禁用不必要的转义字符
  }
}
