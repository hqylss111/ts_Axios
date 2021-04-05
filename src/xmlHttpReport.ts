import { parseHeades } from './helpers/headers'
import { isPlainObject } from './helpers/util'
import { AxiosReportConfig, AxiosPromise, AxiosRespose } from './types'

export default function xmlHttpReport(config: AxiosReportConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers = {}, responseType } = config
    // 创建一个xml请求实例
    const XmlHttpReport = new XMLHttpRequest()

    // 如果设置了type 就赋值给他
    if (responseType) {
      XmlHttpReport.responseType = responseType
    }

    // method 请求类型  url:请求地址 async 是否是异步
    XmlHttpReport.open(method.toUpperCase(), url, true)

    XmlHttpReport.onreadystatechange = function handleLoad() {
      // 4没有接受响应结果
      if (XmlHttpReport.readyState !== 4) return null
      //获取请求头
      const resposeHeader = parseHeades(XmlHttpReport.getAllResponseHeaders())
      //获取data
      const resposerData =
        XmlHttpReport.responseType !== 'text' ? XmlHttpReport.response : XmlHttpReport.responseText
      const respose: AxiosRespose = {
        headers: resposeHeader,
        data: resposerData,
        status: XmlHttpReport.status,
        config,
        statusText: XmlHttpReport.statusText,
        request: XmlHttpReport
      }
      resolve(respose)
    }

    // 给请求设置headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        XmlHttpReport.setRequestHeader(name, headers[name])
      }
    })

    // 发送数据
    XmlHttpReport.send(data)
  })
}
