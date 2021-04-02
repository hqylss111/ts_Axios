const toString = Object.prototype.toString

export function isDate(data: any): data is Date {
  // is 这个是data 是Date 的类型
  return toString.call(data) === '[object Date]'
}

export function isObject(data: any): data is Object {
  return data !== null && typeof data === 'object'
}

// 判断是否是对象
export function isPlainObject(data: any): data is object {
  return toString.call(data) === '[object Object]'
}
