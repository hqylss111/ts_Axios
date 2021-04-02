import { AxiosReportConfig } from './types'
import xmlHttpReport from './xmlHttpReport'

function Axios(config: AxiosReportConfig): void {
  // 使用 xml 请求
  xmlHttpReport(config)
}

export default Axios
