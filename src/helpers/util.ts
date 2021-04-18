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

export function extend<T, U>(to: T, form: U): T & U {
  //交叉类型是将多个类型合并为一个类型

  let result: any = {}

  for (const key in form) {
    ;(to as T & U)[key] = form[key] as any
    result[key] = form[key]
  }

  return result as T & U
}
