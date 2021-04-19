import Axios from './taro/Axios'
import { extend } from './helpers/util'
import { AxiosInstance, AxiosReportConfig } from './types/index'
import defaults from './taro/defaults'
function createInstance(config: AxiosReportConfig): AxiosInstance {
  //创建一个axios
  const context = new Axios(config)

  const instacne = Axios.prototype.request.bind(context)

  //context 对象所有的属性复制到 instacne 上
  extend(instacne, context)

  return instacne as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
