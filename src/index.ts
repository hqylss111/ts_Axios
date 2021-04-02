import { AxiosReportConfig } from './types'
import { buildURL } from './helpers/url'
import xmlHttpReport from './xmlHttpReport'
import { transformRequest } from './helpers/data'

function Axios(config: AxiosReportConfig): void {
  // 使用 xml 请求
  processConfig(config)
  xmlHttpReport(config)
}

function processConfig(config: AxiosReportConfig): void {
  config.url = transformUrl(config)
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

export default Axios
