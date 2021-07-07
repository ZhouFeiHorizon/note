/**
 * 根据字段 key 获取值或设置值
 */

export function getValueByPath(object, prop) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

export function setValueByPath(object, prop, val) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      current[path] = val
      break
    }
    current = current[path]
  }
}
