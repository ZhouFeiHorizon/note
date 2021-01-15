const _toString = Object.prototype.toString

export function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]'
}

export function isObject(v) {
  v !== null && typeof v === 'object'
}

/**
 * 是否是原生Object对象
 * @param {any} obj
 */
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 是否是空、
 * @param {*} v
 */
export function isEmpty(v) {
  return v === undefined || v === '' || v === null
}
