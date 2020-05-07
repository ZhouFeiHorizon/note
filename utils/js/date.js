

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