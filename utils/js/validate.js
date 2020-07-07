/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}
