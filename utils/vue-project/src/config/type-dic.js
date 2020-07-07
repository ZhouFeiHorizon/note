/**
 * 字典配置
 * 对后端请求的数据字典进行请求数据、缓存
 * 添加自定义 class、转换为对象，方便查找
 */
/**
 * example
 [
   {
			"createTime":"2020-06-28 10:06:55",
			"dictId":"3410868540936192",
			"itemId":"3411696572043268",
			"itemName":"special_urgent",
			"itemSort":5,
			"itemValue":"特提"
    },
    ...
  ]
  转换为
  {
   3411696572043268: {
      value: 3411696572043268,
      key: 3411696572043268,
      text: "特提",
      className: 'el-tag el-tag--danger el-tag--light',
      type: 'danger',

			"createTime":"2020-06-28 10:06:55",
			"dictId":"3410868540936192",
			"itemId":"3411696572043268",
			"itemName":"special_urgent",
			"itemSort":5,
      "itemValue":"特提",
    },
    ...
  }
*/

import http from '@/utils/request'
import { loadCache, putCache } from '@/utils/cache'

// 优先级字典配置
const priortiyDicConfig = {
  普通: { className: 'el-tag el-tag--light' },
  平急: { className: 'el-tag el-tag--success el-tag--light', type: 'success' },
  紧急: { className: 'el-tag el-tag--warning el-tag--light', type: 'warning' },
  特急: { className: 'el-tag el-tag--danger el-tag--light', type: 'danger' },
  特提: { className: 'el-tag el-tag--danger el-tag--light', type: 'danger' }
}

/**
 *  dictId=3410868540936193 获取公文类型
 */
export function getDocumentTypeDicObj() {
  return requestDicHandler('3410868540936193', 'document_type_dic', {})
}

/**
 * dictId=3410868540936192 获取优先级
 */
export function getPriortiyDicObj() {
  return requestDicHandler('3410868540936192', 'priortiy_dic', priortiyDicConfig)
}

/**
 * 请求处理字典
 * @param {*} dicId  字典id
 * @param {*} storeKey 存储key
 * @param {*} configObj 配置对象
 */
function requestDicHandler(dicId, storeKey, configObj) {
  return new Promise((resolve, reject) => {
    let content = loadCache(storeKey, null)
    if (content) {
      resolve(content)
    } else {
      http
        .get(`/dictItem/getDictItem/${dicId}`)
        .then(({ data }) => {
          content = {}
          configObj = configObj || {}
          data.data.forEach(item => {
            const key = item.itemId
            const text = item.itemValue
            const otherData = configObj[text] || {}

            content[key] = {
              ...otherData,
              value: key,
              key: key,
              text,
              ...item
            }
          })

          putCache(storeKey, content)

          resolve(content)
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}
