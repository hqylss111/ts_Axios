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
  headers?: string[]
  timeout?: number
}
