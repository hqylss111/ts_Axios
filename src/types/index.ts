// 请求接口类型定义
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// 请求体接口定义

export interface AxiosReportConfig {
  url: string
  method: Method
  data?: any
  params?: any
  headers?: any
  timeout?: number
  responseType?: XMLHttpRequestResponseType //返回类型
}

export interface AxiosRespose {
  data: any //返回数据
  status: number //返回状态码
  statusText: string // 返回类型
  headers: any // 请求头
  config: AxiosReportConfig //请求config
  request: any
}

//返回promise对象
export interface AxiosPromise extends Promise<AxiosRespose> {}
