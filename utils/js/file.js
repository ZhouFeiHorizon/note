import http, { baseURL } from './request'

const imageSuffixs = ['jpg', 'png', 'jpeg', 'gif', 'webp', 'bmp']

// 常见 MIME 类型列表 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
export const mimeType = {
  /* 扩展名: MIME 类型 */
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pdf': 'application/pdf',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

/**
 * 是否是图片
 * @param {*} suffix
 */
export function isImage(suffix) {
  return imageSuffixs.indexOf(String(suffix).toLowerCase()) !== -1
}

/**
 * 文件大小转换
 * @param {*} sizeKB KB大小
 */
export function fileSizeToStr(sizeKB) {
  if (!sizeKB) return '0KB'
  // 小于 1MB
  if (sizeKB < 1024) {
    return sizeKB + 'KB'
  }

  // 小于 1GB
  if (sizeKB < 1024 * 1024) {
    return (sizeKB / 1024).toFixed(2) + 'MB'
  }

  return (sizeKB / (1024 * 1024)).toFixed(2) + 'GB'
}

/**
 * blob 数据保存为文件
 * @param {*} blobData blob数据
 * @param {string} fileName 保存文件名、在mac上，文件名必须要写后缀，要不然下载会有问题、在window上可以忽略
 */
export function blobSaveFile(blobData, fileName) {
  // const contentType = mimeType[extension]
  // if (contentType === undefined) {
  //   console.warn(`没有找到${extension}类型的文件`)
  // }
  fileName = decodeURI(fileName)

  const blob = new Blob([blobData] /* , { type: contentType } */)

  if ('msSaveOrOpenBlob' in window.navigator) {
    // ie使用的下载方式
    return window.navigator.msSaveOrOpenBlob(blob, fileName)
  }

  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  // 注意、在mac上，文件名必须要写后缀，要不然下载会有问题、在window上可以忽略
  a.download = fileName

  // 下面这个写法兼容火狐
  a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
  window.URL.revokeObjectURL(blob)
}
