import { isPlainObject } from './util'

function noramlizeHeaderName(headers: any, noralizeName: string): any {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== noralizeName && name.toLocaleUpperCase() === noralizeName.toLocaleUpperCase()) {
      headers[noralizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeades(headers: any = {}, data: any): any {
  // 要先处理一边 让key保持一致 因为content-type 可以大写 也可以小写
  noramlizeHeaderName(headers, 'Content-type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;chartset=utf-8'
    }
  }
  return headers
}

export function parseHeades(headers: string): any {
  let parese = Object.create(null)
  if (!headers) {
    return parese
  }
  headers
    .toLowerCase()
    .trim()
    .split(/[\r\n]+/)
    .forEach(line => {
      let [key, val] = line.split(':')
      key = key.trim().toLocaleLowerCase()
      if (!key) {
        return
      }
      if (val) {
        val.trim()
      }
      parese[key] = val
    })
  console.log(parese)

  return parese
}
