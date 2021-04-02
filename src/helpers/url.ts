/** 用于处理url工具库 */
import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any) {
  if (!params || typeof params === 'undefined') {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]

    let values: any[] = []

    // 如果这个val 是数组 就直接赋值
    if (Array.isArray(val)) {
      values = val
      key += `[]`
    } else {
      values = [val]
    }

    // 对象 Data 还有普通的类型 还有特殊字符

    values.forEach(item => {
      if (isPlainObject(item)) {
        val = JSON.stringify(item)
      } else if (isDate(item)) {
        val = item.toISOString()
      }
      parts.push(`${key}=${encode(val)}`)
    })
  })

  const newParams = parts.join('&')

  const is = url.indexOf('?') !== -1 ? '&' : '?'

  if (newParams) {
    // 判断这个url 存在不哈奇值
    let lastIndex = url.indexOf('#')
    if (lastIndex !== -1) {
      url = url.slice(0, lastIndex) + is + newParams
    } else {
      url += is + newParams
    }
  }

  return url
}
