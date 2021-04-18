// 请求接口类型定义
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'header'
  | 'HEADER'
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
  url?: string
  method: Method
  data?: any
  params?: any
  headers?: any
  timeout?: number
  responseType?: XMLHttpRequestResponseType //返回类型
}

export interface AxiosRespose<T = any> {
  data: T //返回数据
  status: number //返回状态码
  statusText: string // 返回类型
  headers: any // 请求头
  config: AxiosReportConfig //请求config
  request: any
}

//返回promise对象
export interface AxiosPromise<T = any> extends Promise<AxiosRespose<T>> {}

// 返回error对象
export interface AxiosError extends Error {
  isAxiosError?: boolean
  config: AxiosReportConfig
  code?: string | null
  request?: any
  response?: AxiosRespose
}

export interface interceptor {
  request: AxiosInstanceManager<AxiosReportConfig>
  response: AxiosInstanceManager<AxiosRespose>
}

export interface Axios {
  interceptors: interceptor

  request<T = any>(config: AxiosReportConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosReportConfig): AxiosPromise<T>

  delet<T = any>(url: string, config?: AxiosReportConfig): AxiosPromise<T>

  header<T = any>(url: string, config?: AxiosReportConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosReportConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosReportConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosReportConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosReportConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosReportConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosReportConfig): AxiosPromise<T>
}

//拦截器
export interface AxiosInstanceManager<T> {
  //拦截
  use(resolved: requestFun<T>, rjeected?: rejectFun): number

  //删除拦截器
  eject(id: number): void
}

//因为他的data 是泛型 所以这个应该也是泛型 ==> Respose data => type  1111
export interface requestFun<T = any> {
  (val: T): T | Promise<T>
}

export interface rejectFun {
  (error: any): any
}
