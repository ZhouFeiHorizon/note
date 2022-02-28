/**
 * 数字转换并添加单位
 * @param {number} val 
 * @param {number} fractionDigits 
 * @returns {number|string}
 */
 export function numAddUnit(val, fractionDigits) {
  if (!val) return val
  const len = String(parseInt(val)).length
  // 1234
  if (len <= 4) {
    return val
  }
  // Number 转一遍，把多余的零去掉 '36.10' ==> 36.1
  // 1234 5678
  const myriad = 10000
  if (len <= 8) {
    // 万
   return Number((val / myriad).toFixed(fractionDigits)) + '万'
  }
  // 1234 5678 9012
  if (len <= 12) {
    // 亿
    return Number((val / Math.pow(myriad, 2)).toFixed(fractionDigits))  + '亿'
  }
  // 万亿
  return Number((val / Math.pow(myriad, 3)).toFixed(fractionDigits))  + '万亿'
}



// 1455 5385 0000
/**
 * 全屏
 */
export function fullScreen(ele = document) {
  var requestMethod =
    document.documentElement.requestFullscreen ||
    document.documentElement.webkitRequestFullScreen ||
    document.documentElement.mozRequestFullScreen ||
    document.documentElement.msRequestFullscreen
  requestMethod.call(ele)
}