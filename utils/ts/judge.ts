/** 判断两值是否相等、考虑原始值 */
function judgeValueEqual(a: any, b: any): boolean {
  if (typeof a === "object" && typeof b === "object") {
    // 取对象a和b的属性名
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    // 判断属性名的length是否一致
    if (aProps.length !== bProps.length) {
      return false;
    }
    // 循环取出属性名，再判断属性值是否一致
    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      if (typeof a[propName] === "object") {
        if (!judgeValueEqual(a[propName], b[propName])) {
          return false;
        }
      } else if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
}
