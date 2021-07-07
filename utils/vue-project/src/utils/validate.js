/**
 * 验证
 * zhoufei
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/** 正整数 */
export const intergerRE = /^\d*$/

/** 小数、包含正整数、开头只能为一个零 */
export const decimalRE = /^(0|[1-9]\d*)(\.\d*)?$/

/** 手机号码 */
export const mobileRE = /^1[3456789]\d{9}$/
/** 座机 */
export const landlineRE = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
/** 邮编 */
export const postcodeRE = /^[1-9]\d{5}$/
/** 传真 */
export const faxRE = /^(\d{3,4}-)?\d{7,8}$/
<<<<<<< HEAD
=======
/** 电子邮箱 */
export const emailRE = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
>>>>>>> 46a8b3d90d551efb2aadde14e8edbb679da1fcf3

/**
 * 正整数
 * @param {*} val
 */
export function isInterger(val) {
  return intergerRE.test(val)
}

/**
 * 小数、包含正数、开头只能为一个零
 * @param {*} val
 */
export function isDecimal(val) {
  return decimalRE.test(val)
}

/**
 * 手机号码
 * @param {*} val
 */
export function isMoblie(val) {
  return mobileRE.test(val)
}

/**
 * 座机号码
 * @param {*} val
 */
export function isLandline(val) {
  return landlineRE.test(val)
}

/**
 * 邮编
 * @param {*} val
 */
export function isPostcode(val) {
  return postcodeRE.test(val)
}

export function isFax(val) {
  return faxRE.test(val)
}
/**
 * 电子邮箱
 * @param {*} val
 */
export function isEmail(val) {
  return emailRE.test(val)
}
