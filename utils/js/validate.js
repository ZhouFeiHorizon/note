/**
 * 验证
 * zhoufei
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
 export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/** 正整数 */
export const intergerRE = /^\d*$/

/** 小数、包含正整数、开头只能为一个零 */
export const decimalRE = /^(0|[1-9]\d*)(\.\d*)?$/

/** 手机号码 */
export const mobileRE = /^1[3456789]\d{9}$/
/** 座机 */
export const landlineRE = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
/** 邮编 */
export const postcodeRE = /^[1-9]\d{5}$/
/** 传真 */
export const faxRE = /^(\d{3,4}-)?\d{7,8}$/
/** 电子邮箱 */
export const emailRE = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
/** 信用代码 */
export const creditCodeRE = /^[A-Z0-9]{18}$/
/** 英文名称 */
export const englishName = /^[a-zA-Z&.,\'\/\\\-\_\(\)\s]+$/g

/**
 * 正整数
 * @param {*} val
 */
export function isInterger(val) {
  return intergerRE.test(val)
}

/**
 * 小数、包含正数、开头只能为一个零
 * @param {*} val
 */
export function isDecimal(val) {
  return decimalRE.test(val)
}

/**
 * 手机号码
 * @param {*} val
 */
export function isMoblie(val) {
  return mobileRE.test(val)
}

/**
 * 座机号码
 * @param {*} val
 */
export function isLandline(val) {
  return landlineRE.test(val)
}

/**
 * 邮编
 * @param {*} val
 */
export function isPostcode(val) {
  return postcodeRE.test(val)
}

export function isFax(val) {
  return faxRE.test(val)
}
/**
 * 电子邮箱
 * @param {*} val
 */
export function isEmail(val) {
  return emailRE.test(val)
}

/**
 * 信用代码
 * @param {*} val
 */
export function isCreditCode(val) {
  return creditCodeRE.test(val)
}

/**
 * 英文名称
 * @param {*} val
 */
export function isEnglishName(val) {
  return englishName.test(val)
}

/** 身份证号码规则、但不能校验是否正确 */
export const IDCardNORE = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/

/**
 * 是否是身份证号码
 * @param {string} idcard 注意身份证号码必须是字符串，数字格式javascript放不了这么多位
 */
export function isIDCardNO(idcard) {
  const result = parseIDCardNO(idcard)
  if (typeof result === 'object') return true
  return false
}

/**
 * 解析身份证号码
 * @param {string} ID
 */
function parseIDCardNO(ID) {
  if (ID === '' || ID === undefined || ID === null) return false

  if (typeof ID !== 'string') return '非法字符串'

  let city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  let birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2))
  let d = new Date(birthday)
  let newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
  let currentTime = new Date().getTime()
  let time = d.getTime()
  let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let sum = 0
  let i
  let residue

  if (!/^\d{17}(\d|x)$/i.test(ID)) return '非法身份证'
  if (city[ID.substr(0, 2)] === undefined) return '非法地区'
  if (time >= currentTime || birthday !== newBirthday) return '非法生日'
  for (i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i]
  }
  residue = arrCh[sum % 11]
  if (residue !== ID.substr(17, 1)) return '非法身份证哦'

  return {
    result: city[ID.substr(0, 2)] + ',' + birthday + ',' + (ID.substr(16, 1) % 2 ? ' 男' : '女')
  }
}

const VantValidator = function(value, rule) {
  // 不在这里验证必填
  if (value === '' || value === undefined || value == null) {
    return true
  }
  if (!rule.regexp.test(value)) {
    return false
  }
  return true
}

const validator = VantValidator

/**
 * 校验规则
 */
export const rulesConf = Object.freeze({
  generateRequired(label, trigger = 'onBlur') {
    return {
      require: true,
      message: (trigger === 'onBlur' ? '请输入' : '请选择') + (label || ''),
      trigger
    }
  },
  /** 必填 */
  required: {
    require: true,
    message: '这是必填项，请输入',
    trigger: 'onBlur'
  },

  // 有可能数据要校验，但不是必填的
  // 所以以下校验都没有加必填标识
  mobile: {
    message: '手机号码格式不正确',
    regexp: mobileRE,
    validator,
    trigger: 'onBlur'
  },
  /** 邮政编码 */
  postcode: {
    message: '邮政编码格式不正确',
    regexp: postcodeRE,
    validator,
    trigger: 'onBlur'
  },

  /** 信用代码 */
  creditCode: {
    message: '信用代码格式不正确',
    regexp: creditCodeRE,
    validator,
    trigger: 'onBlur'
  },
  /** 邮箱 */
  email: {
    message: '邮箱格式不正确，请重新输入',
    regexp: emailRE,
    validator,
    trigger: 'onBlur'
  },
  /** 身份证号码 */
  idCard: {
    message: '身份证号码格式不正确，请重新输入',
    regexp: IDCardNORE,
    validator,
    trigger: 'onBlur'
  },
  url: {
    regexp: /^http[s]?:\/\/.*/,
    message: 'url地址输入不正确，请重新输入',
    validator,
    trigger: 'onBlur'
  }
})
