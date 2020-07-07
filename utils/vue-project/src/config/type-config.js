/**
 * 类型配置
 * text属性渲染成文本、className 渲染成类名 value 配置类型的值 key，本身键值
 * zhoufei
 */

/**
 * 生成键值对的配置/用map要主要类型必须一致
 * Array[] arrItem =  [key, text, otherData]
 * @param {Array<Array<key, text, otherData>>} arr 数据数据
 * @returns {key:{...otherData,key,text}}
 */
function generateCofingMap(arr) {
  const map = new Map()
  for (let i = 0, len = arr.length; i < len; i++) {
    const [key, text, otherData] = arr[i]
    map.set(key, {
      ...otherData,
      key,
      text
    })
  }
  return map
}

/**
 * 生成键值对的配置
 * Array[] arrItem =  [key, text, otherData]
 * @param {Array<Array<key, text, otherData>>} arr 数据数据
 * @returns {key:{...otherData,key,text}}
 */
export function generateCofingObj(arr) {
  const obj = {}
  for (let i = 0, len = arr.length; i < len; i++) {
    const [key, text, otherData] = arr[i]
    obj[key] = {
      value: key,
      ...otherData,
      key,
      text
    }
  }
  return obj
}

/**
 * 渲染状态HTML
 * @param {*} config 配置对象
 * @example
 * ```html
 * <span class="zzzzzzz" v-html="renderSatusHTML(statusObj[status])"></span>
 */
export function renderSatusHTML(config) {
  if (!config) return null
  let className = config.className || ''
  let text = config.text || ''
  return `<span class="${className}">${text}</span>`
}

// @example
// export default {
//   /** 段位 */
//   danGradingMap: generateCofingMap([
//     [1, '青铜'],
//     [2, '白银'],
//     [3, '黄金'],
//     [5, '铂金'],
//     [6, '砖石'],
//   ]),
//   danGradingObj: generateCofingObj([
//     [1, '青铜'],
//     [2, '白银'],
//     [3, '黄金'],
//     [5, '铂金'],
//     [6, '砖石'],
//   ]),
// };

/* 反馈 */
const feedback = {
  status: generateCofingObj([
    [1, '反馈超时', { className: 'danger-color' }],
    [2, '反馈未超时']
  ])
}
/** 优先级 */
// 优先级：(0-普通，1-平急，2-紧急，3-特急，4-特提)
export const priorityObj = generateCofingObj([
  [0, '普通', { type: 'success' }],
  [1, '平急', { type: 'success' }],
  [2, '紧急', { type: 'warning' }],
  [3, '特急', { type: 'danger' }],
  [4, '特提', { type: 'danger' }]
])

/* 阅读 */
export const readObj = generateCofingObj([
  [1, '已读'],
  [2, '未读', { className: 'danger-color' }]
])
// 是否需反馈 (1-需反馈 2-不需要反馈)
export const isNeedFeedbackObj = generateCofingObj([
  [1, '需反馈', { className: 'danger-color' }],
  [2, '不需要反馈']
])

// 是否反馈 (1-已反馈 2-未反馈)
export const isFeedbackObj = generateCofingObj([
  [1, '已反馈'],
  [2, '未反馈', { className: 'danger-color' }]
])

// 是否被催办 1-催办 2-未催办
export const isCBObj = generateCofingObj([
  [1, '催办'],
  [2, '未催办']
])

export { feedback, priorityObj as priority }
