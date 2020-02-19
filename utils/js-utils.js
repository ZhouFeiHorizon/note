
/**
 * 是否是原生Object对象
 * @param {any} obj 
 */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * Remove an item from an array
 * @param {Array<*>} arr 
 * @param {*} item 
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item)
    if (index > -1) {
      arr.splice(index, 1)
    }
  }
}

/**
 * 判断是否是对象
 * @param {any} obj 
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}
// for...in 和 Object.keys的区别是Object.keys不会遍历原型链上的属性
/**
 * 是否是空对象
 * @param {object} obj 
 */
function isEmptyObject(obj) {
  if (Object.keys(obj).length === 0) return true
  return false
}

/**
 * 是否是原始类型值
 * @param {*} value 
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * 一个对象是否拥有某个属性, 不会访问原型链上的属性
 * @param {object} obj 
 * @param {string} key 
 */
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * 链式Object对象是否定义
 * @param {object} ctx 可选 运行环境上下文，
 * @param {string} chainStr 链式字符串
 * @return {boolean} 是否定义
 * @example 
 *  var obj = { 
 *    a：{
 *      b: 'xxx'
 *    }
 *  }
 * isChainObjectDef(obj.a, 'b') ==> true
 * isChainObjectDef('obj.a.b') ==> fasle
 * isChainObjectDef('obj.a.b.c.d') ==> fasle
 * 
 */
function isChainObjectDef(ctx, chainStr) {
  const keys = chainStr.split('.')
  if (typeof ctx === 'string') {
    chainStr = ctx
    ctx = this || window
  }
  let ns = ctx[keys[0]]
  for (let i = 1; i < keys.length; i++) {
    if (ns[keys[i]] === undefined) {
      return false
    }
    ns = ns[keys[i]]
  }
  return ns !== undefined
}



/**
 * 根据包名，在指定空间中创建对象 
 * @param {any} oNamespace 命名空间
 * @param {*} sPackage 包名
 * @param {object}
 * @example 
 * >> namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
 * >> {a: {test: 1, b: {c: {d: {}}}}}
 */
function namespace(oNamespace, sPackage) {
  var keys = sPackage.split('.')
  var ns = oNamespace
  for (var i = 0; i < keys.length; i++) {
    if (!isPlainObject(ns[keys[i]])) {
      ns[keys[i]] = {}
    }
    ns = ns[keys[i]]
  }
  return oNamespace
}




function zeroize(n) {
  return Number(n) >= 10 ? n : '0' + n
}

/**
 * new Date
 * @param date 
 */
function newDate(date = new Date()) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    return date
  } else if (Number(date)) {
    return (new Date(Number(date)))
  } else {
    // 在ios上必须要用 YYYY/MM/DD 的格式
    // date = date.replace(new RegExp(/-/gm) ,"/");
    return (new Date(date))
  }
}

/**
 * 按所给的时间格式输出指定的时间
 * @params {date|number|string} data 
 * @params {string} format 格式化字符串
 * @renter {string} 格式化的时间
 * @example formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w') ==> "2014-09-05 13:14:20 星期五"
 * 格式说明
  对于 2014.09.05 13:14:20
  yyyy: 年份，2014
  yy: 年份，14
  MM: 月份，补满两位，09
  M: 月份, 9
  dd: 日期，补满两位，05
  d: 日期, 5
  HH: 24制小时，补满两位，13
  H: 24制小时，13
  hh: 12制小时，补满两位，01
  h: 12制小时，1
  mm: 分钟，补满两位，14
  m: 分钟，14
  ss: 秒，补满两位，20
  s: 秒，20
*/
function formatDate(date = new Date(), format = 'yyyy/MM/dd HH:mm 周w') {
  date = newDate(date)
  var y = date.getFullYear()
  var obj = {
    M: date.getMonth() + 1, // 0 ~ 11
    d: date.getDate(), // 1 ~ 31
    H: date.getHours(), // 0 ~ 23
    h: date.getHours() % 12,
    m: date.getMinutes(), // 0 ~ 59
    s: date.getSeconds(), // 0 ~ 59
    w: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]    // 0 ~ 6
  }
  format = format.replace(/yy(yy)?/, function (_, v) {
    return v ? y + '' : (y + '').slice(-2)
  })
  for (var key in obj) {
    // format = format.replace(new RegExp(`${key}(${key})?`), (_, v) => v ? zeroize(obj[key]) : obj[key])
    var reg = new RegExp(key + '(' + key + ')?')
    format = format.replace(reg, function (_, v) {
      return v ? zeroize(obj[key]) : obj[key]
    })
  }
  return format
}

function isDef(v) {
  return v !== undefined && v !== null
}

/**
将 rgb 颜色字符串转换为十六进制的形式，如 rgb(255, 255, 255) 转为 #ffffff
1. rgb 中每个 , 后面的空格数量不固定
2. 十六进制表达式使用六位小写字母
3. 如果输入不符合 rgb 格式，返回原始输入
@param {string} sRGB
*/
function rgb2hex(sRGB) {
  function normal(n) {
    return n <= 255
  }
  function toHex(n) {
    return n < 16 ? '0' + (+n).toString(16) : (+n).toString(16)
  }
  var reg = /^rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)$/

  return sRGB.replace(reg, function (all, r, g, b) {
    if (normal(r) && normal(g) && normal(b)) {
      return '#' + toHex(r) + toHex(g) + toHex(b)
    }
    return all
  })
}
/**
将 rgb 颜色字符串转换为十进制的形式，如 #ffffff  转为 rgb(255, 255, 255)； #ffffffff 转为 rgba(255, 255, 255,255)
如果输入不符合 格式，返回原始输入
@param {string} sHex
*/

function hexrgb2(sHex) {
  var r, g, b, a
  function abnormal(n) {
    return n > 255 || n < 0
  }
  // #000 #000000 #ff000044
  switch (sHex.length) {
    case 4:
      r = sHex.slice(1, 2)
      g = sHex.slice(2, 3)
      b = sHex.slice(3, 4)
      break
    case 9:
      a = sHex.slice(-2)
    case 7:
      r = sHex.slice(1, 3)
      g = sHex.slice(3, 5)
      b = sHex.slice(5, 7)
      break
    default: return sHex
  }
  r = parseInt(r, 16)
  g = parseInt(g, 16)
  b = parseInt(b, 16)
  if (a !== undefined) {
    a = parseInt(a, 16)
    if (abnormal(a)) {
      return sHex
    }
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'
  }
  return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}




/**
 * 短横线转驼峰命名
 * @param {string} str 
 * @example
 * >> camelize('-webkit-border--image--')
 * >> webkitBorderImage
 */
function camelize(str) {
  str = str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : ''
  })
  return str.slice(0, 1).toLowerCase() + str.slice(1)
}



/**
 * 驼峰转下划线
 * @param {string} str 
 */
function hyphenate(str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

/**
 * 首字母大写
 * @param {string} str
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 两个值是否改变
 * @param oldValue 
 * @param value 
 */
function hasChanged(oldValue, value) {
  // (value === value || oldValue === oldValue) 排除 NaN
  return oldValue !== value && (oldValue === oldValue || value === value)
}

/********************************************************* */
/** 数组 #ff0000 */
/********************************************************* */
/**
 * 数组去重
 */

Array.prototype.uniq = function () {
  var arr = this,
    len = arr.length,
    res = [],
    haveNaN = false
  if (Array.from && Set) {
    return Array.from(new Set(arr))
  } else {
    for (var i = 0; i < len; i++) {
      if (String(arr[i]) === 'NaN') {
        if (!haveNaN) {
          haveNaN = true
          res.push(arr[i])
        }
      } else if (res.indexOf(arr[i]) === -1) {
        res.push(arr[i])
      }
    }
    return res
  }

}

function map(arr, cb, ctx) {
  ctx = ctx || window
  if (typeof cb !== 'function') {
    throw new TypeError('cb isn\'t a function')
  }
  var res = []
  for (var i = 0; i < arr.length; i++) {
    res.push(cb.call(ctx, arr[i], i, arr))
  }
  return res
}
// 数组中的最大值
Array.prototype.max = function () {
  return Math.max.apply(Array, this)
}
// 数组的最小值
Array.prototype.min = function () {
  return Math.min.apply.apply(Array, this)
}

/**
 * 把类数组转为数组
 * @param {*} list 
 * @param {number} start 开始下标
 */
function toArray(list, start) {
  var start = status || 0
  var i = list.length - start
  var ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}



/**
 * 将_from的属性混合（会覆盖）to对象中
 * @param {object} to 目标对象
 * @param {object} _from 
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key]
  }
  return to
}
/**
 *  合并Array数组中的每一个对象到一个新的Object中
 * @param {array} arr 
 */
function toObject(arr) {
  var res = {}
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

/**
 * 保证一个函数只执行一次
 * @param {function} fn 函数
 * @example
    function handler() { console.log('执行了') }
    var handlerOnce = once(handler)
    handlerOnce() // 执行了
    handlerOnce()
 */
function once(fn) {
  var called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

/**
 * 判断val的具体类型 小写
 * @param {*} val 
 * @returns {string} null  number undefined string object array function date regexp
 * 
 */
function toType(val) {
  if (val === null) {
    return val + ''
  }
  var type = typeof val
  // [object RegExp] (8, -1)
  return type === 'object'
    ? Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
    : type
}
/**
 * 判断是否是一个伪数组
 * @param {*} obj 
 */
function isArrayLike(obj) {
  if (typeof obj === 'function') {
    return false
  }
  var length = !!obj && obj.length
  var type = toType(obj)
  return type === 'array' || length === 0 ||
    typeof length === 'number' && length > 0 && (length - 1) in obj
}

function hiddenMobile(val) {
  return (val + '').replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}


/**
 * 将阿拉伯数字翻译成中文的大写数字
 * 数字转中文
 * @param num 数字
*/
function numberToChinese(num) {
  var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
  var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
  k = 0,
    re = "";
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
          .test(a[0]))
          re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
      re = AA[0] + re;
    if (a[0].charAt(i) != 0)
      re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    k++;
  }

  if (a.length > 1) // 加上小数部分(如果有小数部分)
  {
    re += BB[6];
    for (var i = 0; i < a[1].length; i++)
      re += AA[a[1].charAt(i)];
  }
  if (re == '一十')
    re = "十";
  if (re.match(/^一/) && re.length == 3)
    re = re.replace("一", "");
  return re;
}

/**
 获取 url 中的参数
  1. 指定参数名称，返回该参数的值 或者 空字符串
  2. 不指定参数名称，返回全部的参数对象 或者 {}
  3. 如果存在多个同名参数，则返回数组
 * @param {string} sUrl 
 * @param {string} sKey
 * @returns string | object | array
 * @example 
    >> getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe', 'key')
    >> [1, 2, 3]
 */
function getUrlParam(sUrl, sKey) {
  var res = {}
  sUrl.replace(reg, function (all, key, val) {
    if (res[key] === undefined) { // 没有
      res[key] = val
    } else if (Array.isArray(res[key])) { // 有了 
      res[key].push(val)
    } else { // 才一个
      res[key] = [].concat(res[key], val)
    }
  })

  if (sKey !== undefined) {
    return res[sKey] || ''
  }
  return res
}

function getUrlParams(sUrl) {
  // 普通的中文都可以用变量
  var res = {}
  sUrl.replace(reg, function (all, key, val) {
    res[key] = val
  })
  return res
}
/**
 * 去除字符串两边的空格
 * @param {string} str 
 */
function trim(str) {
  if (typeof str !== 'string') {
    throw new TypeError('str isn\'t string type')
  }
}

/**
 * 判断一个字符是否是中文
 * @param {string} str 
 * @renturn boolean
 */
function isChaineseStr(str) {
  var reg = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/;
  if (reg.test(str)) {
    return false;
  }
  return true;
}


/*********************************************************** */
// localStorage
/*********************************************************** */

function LocalStorage(name, storeKey, defaultValue, type) {
  // this.name = name
  this.storeKey = storeKey
  this.type = type.toLowerCase()
  if (this.type === 'object' && typeof defaultValue === 'string') {
    defaultValue = JSON.stringify(defaultValue)
  }
  this.defaultValue = defaultValue
}

LocalStorage.prototype.get = function get() {
  let res = localStorage.getItem(this.storeKey)
  res = res === null ? this.defaultValue : res
  return this.type === 'boolean' ? !!res : (this.type === 'object' ? JSON.parse(res) : res)
}

LocalStorage.prototype.set = function set() {
  // 是否是JSON
  if (this.type === 'object') {
    if (typeof val === 'string') {
      val = JSON.stringify(val)
    }
    // state[this.name] = val
    localStorage.setItem(this.storeKey, JSON.stringify(val))
    return
  } else {
    // state[this.name] = val
    val = this.type === 'boolean' ? (val || '') : val
    localStorage.setItem(this.storeKey, val)
  }
}

LocalStorage.prototype.remove = function () {
  // state[this.name] = this.defaultValue
  localStorage.removeItem(this.storeKey)
}

/**
 * 当store中有本地存储时用
 */
class StoreLocalStorage {
  /**
   * 创建localStorage本地存储
   * @param {*} name state.** 下面的名字, 这里的必须和 state 下面的具体名一致
   * @param {*} storeKey  在本地存储中的 key值
   * @param {*} defaultValue 默认值
   * @param {*} type 类型 String  | Object | Boolean
   * @param {Bollean} autoprefixer 自动添加前缀 项目的前缀
   */
  constructor(name, storeKey, defaultValue, type = 'string', autoprefixer = true) {
    this.name = name
    // this.storeKey = autoprefixer ? curApp + '__' + storeKey : storeKey
    this.type = type.toLowerCase()
    if (this.type === 'object' && typeof defaultValue === 'string') {
      defaultValue = JSON.stringify(defaultValue)
    }
    this.defaultValue = defaultValue
  }
  set(state, val) {
    // 是否是JSON
    if (this.type === 'object') {
      if (typeof val === 'string') {
        val = JSON.stringify(val)
      }
      state[this.name] = val
      localStorage.setItem(this.storeKey, JSON.stringify(val))
      return
    }
    state[this.name] = val
    val = this.type === 'boolean' ? (val || '') : val
    localStorage.setItem(this.storeKey, val)
  }
  get() {
    let res = localStorage.getItem(this.storeKey)
    res = res === null ? this.defaultValue : res
    return this.type === 'boolean' ? !!res : (this.type === 'object' ? JSON.parse(res) : res)
  }
  // 重置
  reset(state) {
    state[this.name] = this.defaultValue
    // let val = this.defaultValue
    // val = this.type === 'boolean' ? (val || '') : val
    // localStorage.setItem(this.storeKey, val)
    localStorage.removeItem(this.storeKey)
  }
}

// function debounce(fn, delay = 500) {
//   let timeout = null
//   return function () {
//     if (timeout !== null) clearTimeout(timer)
//     timeout = setTimeout(fn, delay)
//   }
// }

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