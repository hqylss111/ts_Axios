import { isPlainObject } from './util'

// 处理data 数据
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

//处理请求data 如果是字符串转换成json数据
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      //
    }
  }
  return data
}
