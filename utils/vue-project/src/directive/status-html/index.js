/**
 * 用于渲染 类型、状态
 * 和@/components/config/type-config 配合使用，text属性渲染成文本、className 渲染成类名
 * 使用
 * @example
 * <span v-status-html="statusObj[statusPropName]"></span>
 *
 * @ zhoufei
 */

import statusHtml from './main'

const install = function(Vue) {
  Vue.directive('status-html', statusHtml)
}

if (window.Vue) {
  window['status-html'] = statusHtml
  Vue.use(install); // eslint-disable-line
}

statusHtml.install = install
export default statusHtml

