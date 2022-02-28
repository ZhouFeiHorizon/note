/**
 * 图片预览方法
 */

// import Vue from 'vue'
import { ImagePreview } from 'vant'
import router from '@/router'

// https://jsdoc.app/tags-param.html

/**
 * 图片预览
 * @param {Array} urlList 图片地址列表
 * @param {Object} options { onSwitch, onClose, initialIndex } 默认 vant 图片预览配置
 * @param {Number} options.initialIndex 预览的第一张图片
 */
const ImageViewer = function(urlList, options) {
  options = options || {}

  // 1 ---------- 有bug返回时名称会变，首页的时候不能拦截
  // const cancelListener = router.beforeEach((to, from, next) => {
  //   setTimeout(() => {
  //     next(false)
  //   }, 0)
  // })
  // return ImagePreview({
  //   startPosition: options.initialIndex || 0,
  //   ...options,
  //   images: urlList,
  //   onClose() {
  //     cancelListener()
  //   }
  // })

  // 2-------- 数据不能太多，页面还必须有缓存
  // router.push({
  //   name: 'ImagePreview',
  //   query: {
  //     startPosition: options.initialIndex,
  //     ...options,
  //     images: urlList
  //   }
  // })

  // 3-------------在浏览器里面会生成一个前进---
  window.history.pushState(null, null, document.URL)
  let isBack = false
  const stateChange = function stateChange() {
    isBack = true
  }
  window.addEventListener('popstate', stateChange, false)

  return ImagePreview({
    startPosition: options.initialIndex || 0,
    ...options,
    images: urlList,
    onClose() {
      setTimeout(() => {
        window.removeEventListener('popstate', stateChange)
        if (!isBack) {
          window.history.back()
        }
      }, 0)
    }
  })
}

export default ImageViewer
