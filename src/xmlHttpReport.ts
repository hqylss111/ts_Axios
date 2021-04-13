import { parseHeades } from './helpers/headers'
import { isPlainObject } from './helpers/util'
import { AxiosReportConfig, AxiosPromise, AxiosRespose } from './types'

export default function xmlHttpReport(config: AxiosReportConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType, timeout } = config
    // 创建一个xml请求实例
    const XmlHttpReport = new XMLHttpRequest()

    // 如果设置了type 就赋值给他
    if (responseType) {
      XmlHttpReport.responseType = responseType
    }

    if (timeout) {
      XmlHttpReport.timeout = timeout
    }

    // method 请求类型  url:请求地址 async 是否是异步
    XmlHttpReport.open(method.toUpperCase(), url, true)

    XmlHttpReport.onreadystatechange = function handleLoad() {
      // 没有相应
      if (XmlHttpReport.readyState === 0) {
        return null
      }

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
      handRespone(respose)
    }

    //发生网络错误错误的时候
    XmlHttpReport.onerror = function(error) {
      reject(new Error('Nework error'))
    }

    //超时回调函数
    XmlHttpReport.ontimeout = function handTimeout() {
      reject(new Error('timeout is ' + timeout) + 'ms exceend')
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
    function handRespone(respose: AxiosRespose): void {
      if (respose.status >= 200 && respose.status <= 300) {
        resolve(respose)
      } else {
        reject('request file with status code' + respose.status)
      }
    }
  })
}
