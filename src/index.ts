import { AxiosPromise, AxiosReportConfig, AxiosRespose } from './types'
import { buildURL } from './helpers/url'
import xmlHttpReport from './xmlHttpReport'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeades } from './helpers/headers'

function Axios(config: AxiosReportConfig): AxiosPromise {
  // 使用 xml 请求
  processConfig(config)
  return xmlHttpReport(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosReportConfig): void {
  config.url = transformUrl(config)

  //heades必须在data 之前因为如果是普通对象 我们要把普通对象设置为json对象
  config.headers = transformHeaders(config)

  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosReportConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 处理请求体data 数据
function transformRequestData(config: AxiosReportConfig) {
  return transformRequest(config.data)
}

//处理haders
function transformHeaders(config: AxiosReportConfig): any {
  const { headers = {}, data } = config
  return processHeades(headers, data)
}

//处理数据
function transformResponseData(data: AxiosRespose): AxiosRespose {
  data.data = transformResponse(data.data)
  return data
}

export default Axios
