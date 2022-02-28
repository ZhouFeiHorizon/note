/* eslint-disable */
export const inBrowser = typeof window !== 'undefined'
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = (UA && UA.indexOf('android') > 0) || weexPlatform === 'android'
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios'
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
export const isPhantomJS = UA && /phantomjs/.test(UA)
export const isFF = UA && UA.match(/firefox\/(\d+)/)

/** 在App里面 */
export const inApp = UA && UA.indexOf('workplus') > 0

/** 在微信浏览器\微信环境 */
export const inWechatBrowser = UA && UA.indexOf('micromessenger') > 0

/** 在小程序浏览器里面 */
// 有点问题，直接在index.html里面判断
// let _inWeexBrowser = false
// if (!inWechatBrowser) {
//   // //说明不在微信中
//   _inWeexBrowser = false
// } else {
//   wx.miniProgram.getEnv((res) => {
//     if (res.miniprogram) {
//       // 走在小程序的逻辑
//       _inWeexBrowser = true
//     } else {
//       // 走不在小程序的逻辑
//       _inWeexBrowser = false
//     }
//   })
// }

/** 在小程序浏览器里面 */
export const inWeexBrowser = (window && window.__wxjs_environment === 'miniprogram') || (UA && UA.indexOf('miniprogram') > 0)
