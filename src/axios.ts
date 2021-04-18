import Axios from './taro/Axios'
import { extend } from './helpers/util'
import { AxiosInstance } from './types/index'

function createInstance(): AxiosInstance {
  //创建一个axios
  const context = new Axios()
  const instacne = Axios.prototype.request.bind(context)

  //context 对象所有的属性复制到 instacne 上
  extend(instacne, context)

  return instacne as AxiosInstance
}

const axios = createInstance()

export default axios
