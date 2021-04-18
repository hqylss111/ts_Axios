import { AxiosReportConfig, AxiosRespose } from '../types'

//错误类
export class AxiosError {
  isAxiosEerror: boolean
  config: AxiosReportConfig
  code?: string | null
  request?: any
  respose?: AxiosRespose
  message: any
  constructor(
    message: any,
    config: AxiosReportConfig,
    code?: string | null,
    request?: any,
    respose?: AxiosRespose
  ) {
    this.message = message
    this.isAxiosEerror = true
    this.config = config
    this.code = code
    this.request = request
    this.respose = respose
    //因为你继承了内部的error 并且使用了super  就必须把当前的原型设置到内部Error身上
  }
}

//错误创建函数
export function createAxiosError(
  message: string,
  config: AxiosReportConfig,
  code?: string | null,
  request?: any,
  respose?: AxiosRespose
) {
  const error = new AxiosError(message, config, code, request, respose)
  console.log(error)
  return error
}
