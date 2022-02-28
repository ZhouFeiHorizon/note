import * as env  from '@/utils/env'
/**
 * 文件idstr的解决方案
 * 文件绑定的是id,多个时以逗号分隔
 *
 * 注意
 * @TODO 什么时候清除缓存、如果一直保存缓存、如果访问页面中有大量文件，使用缓存过多，就会导致页面卡顿
 * 所以可以根据业务情况自定义清除
 *
 * @author zhoufei
 * @date 2021/4/13
 */

import request from './request'
import { previewFileUrl, downloadFileUrl } from './index'
import { isProd } from '@/config'

function joinParamsArray(key, value) {
  if (Array.isArray(value)) {
    return value.map(val => `${key}=${val}`).join('&')
  }
  return `${key}=${value}`
}

const wordExcelSuffixs = ['doc', 'docx', 'xls', 'xlsx']
const HOST = location.protocol + '//' + location.host

// 简单判断是否是域名
let isDomain = !/^[\.\d]+$/.test(document.domain)

const http = {
  /**
   * 具体业务请求文件列表
   * idArr、idStr
   */
  getFiles(ids) {
    if (typeof ids === 'string') ids = ids.split(',')
    return request.get('/file/getFile?' + joinParamsArray('ids', ids)).then(({ data }) => {
      return data.map(file => {
        file.name = file.fileName + '.' + file.suffix
        // 是 word | excel
        // 不能在微信小程序中-微信小程序中不能用微软的在线预览
        if (!env.inWeexBrowser && isProd && isDomain && wordExcelSuffixs.includes(file.suffix)) {
          /*
            # 微软在线预览
            word:  https://view.officeapps.live.com/op/embed.aspx?src=https://szsme.zxqyj.sz.gov.cn/group1/M00/00/16/Cv28E2DJmh6ALvguACNbIkU7Nrw688.doc
            excel: https://view.officeapps.live.com/op/embed.aspx?src=http://7749tian.com/doc/a.xls
          */
          // file.url = previewFileUrl(file.id)
          const url = HOST + '/' + file.fileId
          file.url = `https://view.officeapps.live.com/op/embed.aspx?src=${url}`
        } else {
          file.url = previewFileUrl(file.id)
        }
        file.downloadUrl = downloadFileUrl(file.id)
        return file
      })
    })
  }
  // @DEM0
  //   getFiles(arr) {
  //     console.log(' >>> :', arr)
  //     // return Promise.reject({
  //     //   code: '200',
  //     //   msg: '文件名存在相同'
  //     // })
  //     return Promise.resolve([
  //       {
  //         id: '111',
  //         name: 'xx'
  //       }, {
  //         id: '222',
  //         name: 'xxx'
  //       },
  //       {
  //         id: '333'
  //       },
  //       {
  //         id: '444'
  //       }, {
  //         id: '555'
  //       }
  //     ])
  //   }
}

// 需要请求的文件id 队列
const fileIdQueueSet = new Set()

// 缓存的文件信息
const cachefileMap = new Map()

// 请求的函数
let requestPromise = null

/**
 * 获取缓存文件信息
 * @param {string} id
 * @returns
 */
function getCacheFile(id) {
  const file = cachefileMap.get(id)
  // 如果已经标识被删除的标志、再次访问，我们就要取消被删除
  if (file && file.id && file.__deleteFlag__) {
    file.__deleteFlag__ = false
  }
  return file
}

/**
 * 设置缓存文件信息
 * @param {Object} file
 */
function setCacheFile(file) {
  cachefileMap.set(file.id, file)
}

/**
 * 删除缓存中的文件
 * @param {*} file
 * @returns
 */
function removeCacheFile(file) {
  const key = file.id
  const url = file.url
  // 有这样的地址 blob:http://xxxx.
  if (url.includes('blob:http://')) {
    file.url = previewFileUrl(file.id)
  }
  file.__deleteFlag__ = true
  // return cachefileMap.delete(key)
  // 延迟删除、比如页面切换、从编辑变到查看等
  setTimeout(() => {
    if (file.__deleteFlag__) {
      cachefileMap.delete(key)
    }
  }, 2000)
}

/**
 * 获取文件信息、返回的 Promise 里面的数据是一个数组
 * 可以用在绑定文件的id上，当id变化是，来获取文件信息
 * @param {Array|String} ids  id字符串数组或者id字符串、以逗号分隔
 * @example getFiles('11122,3333').then((data) => {})
 * @returns
 */
function getFiles(ids) {
  const idArr = Array.isArray(ids) ? ids : (ids || '').split(',')
  // 过滤掉缓存中已有的
  const filterIds = []
  const requesIdArr = idArr.filter(id => {
    if (!id) {
      // 文件id中有空
      return false
    }
    filterIds.push(id)
    const fileInfo = getCacheFile(id)
    // 有文件信息
    if (fileInfo) {
      // 可以使用缓存中的
      // cacheFile.push(fileInfo)
      return false
    } else {
      fileIdQueueSet.add(id)
      return true
    }
  })

  return new Promise((resolve, reject) => {
    // 没有id直接返回缓存中的
    if (requesIdArr.length <= 0) {
      // return resolve(cacheFile)
      return resolve(_getCacheFiles(filterIds))
    }
    // eslint-disable-next-line
    __requetFileInfo(requesIdArr).then(files => {
      // resolve(cacheFile.concat(files))
      // 保持顺序
      resolve(_getCacheFiles(filterIds))
    }, reject)
  })
}

function _getCacheFiles(idArr) {
  return idArr.map(id => {
    return getCacheFile(id)
  })
}

function __requetFileInfo(requesIdArr) {
  return new Promise((resolve, reject) => {
    if (!requestPromise) {
      requestPromise = __request__()
    }
    requestPromise.then(allFileData => {
      const result = []
      allFileData.forEach(file => {
        if (requesIdArr.includes(file.id)) {
          result.push(file)
        }
        setCacheFile(file)
      })
      resolve(result)
    }, reject)
  })
}

function __request__() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ids = Array.from(fileIdQueueSet.values())

      // 清空队列
      fileIdQueueSet.clear()
      requestPromise = null

      if (ids.length) {
        http.getFiles(ids).then(resolve, reject)
      } else {
        // 如果没有ids
        resolve([])
      }
    }, 10)
  })
}


/** 根据文件文件列表得到 idStr */
function byFilesGetIdStr(fileList) {
  return fileList.map(file => file.id).join(',')
}

export { getCacheFile, setCacheFile, removeCacheFile, getFiles, byFilesGetIdStr }
