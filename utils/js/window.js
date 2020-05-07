/**
 * 一些和页面相关，window相关的
 */

/*
* 防抖
* @param {function} fn 
* @param {number} delay 延迟 
*/
function debounce(fn, delay = 500) {
  let timeout = null
  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

/**
  * 节流
  * @param {function} fn 
  * @param {number} interval 间隔
  */
function throttle(fn, interval = 500) {
  let timer = null
  return function () {
    if (timer === null) {
      let context = this
      let args = arguments

      timer = setTimeout(function () {
        fn.apply(context, args)
        timer = null
      }, interval)
    }
  }
}
