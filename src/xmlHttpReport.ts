import { AxiosReportConfig } from './types'

export default function xmlHttpReport(config: AxiosReportConfig): void {
  const { data = null, url, method = 'get' } = config

  // 创建一个xml请求实例
  const XmlHttpReport = new XMLHttpRequest()

  // method 请求类型  url:请求地址 async 是否是异步
  XmlHttpReport.open(method.toUpperCase(), url, true)

  // 发送数据
  XmlHttpReport.send(data)
}
