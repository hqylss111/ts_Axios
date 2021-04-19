import {
  AxiosPromise,
  AxiosReportConfig,
  AxiosRespose,
  Method,
  rejectFun,
  requestFun
} from '../types'
import displatchRequest from './displatchRequest'
import AxiosInstanceManager from './AxiosInstanceManager'
import mergeConfig from './mergeConfig'
/**
 * chain
 * 他有可能添加了拦截器 接受了一个resolvedFun
 * 有可能没有添加就是接受一个 config 返回一个 AxiosPromise 其实就是displatchRequest
 */

/**
 * 原型链上要有request 和response
 */

interface interceptor {
  request: AxiosInstanceManager<AxiosReportConfig>
  response: AxiosInstanceManager<AxiosRespose>
}

interface Ichain<T> {
  resolved: requestFun<T> | ((config: AxiosReportConfig) => AxiosPromise) //你有可能传递一个拦截器 有可能不传递就是直接去请求
  rejected?: rejectFun
}

//Axios实体类
export default class Axios {
  interceptors: interceptor

  defaults: AxiosReportConfig

  constructor(config: AxiosReportConfig) {
    this.defaults = config

    this.interceptors = {
      request: new AxiosInstanceManager<AxiosReportConfig>(),
      response: new AxiosInstanceManager<AxiosRespose>()
    }
  }

  //发送请求模块 返回一个axios Promise
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    //请求前就要数据合并 defaults默认配置 config 用户配置
    config = mergeConfig(this.defaults, config)

    // let chine:Array<Ichine> = [];
    // 拦截器promise 队列

    //队列中一定要先有个 displatchRequest
    // reuqest => reuqest => displatchRequest => response => response
    let chain: Ichain<any>[] = [
      {
        resolved: displatchRequest,
        rejected: undefined
      }
    ]

    //请求拦截器
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor) //往栈里面push拦截器
    })

    //响应拦截器
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      // 循环数组的length 次数
      const { resolved, rejected } = chain.shift()! //永远难道数组的第一项
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosReportConfig): AxiosPromise {
    return this.__requestMethodWithoutData('get', url, config)
  }

  header(url: string, config?: AxiosReportConfig): AxiosPromise {
    return this.__requestMethodWithoutData('header', url, config)
  }

  options(url: string, config?: AxiosReportConfig): AxiosPromise {
    return this.__requestMethodWithoutData('options', url, config)
  }

  delete(url: string, config?: AxiosReportConfig): AxiosPromise {
    return this.__requestMethodWithoutData('delete', url, config)
  }

  post(url: string, data?: any, config?: AxiosReportConfig): AxiosPromise {
    return this.__requestMethodata('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosReportConfig): AxiosPromise {
    return this.__requestMethodata('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosReportConfig): AxiosPromise {
    return this.__requestMethodata('patch', url, data, config)
  }

  __requestMethodWithoutData(method: Method, url: string, config?: AxiosReportConfig) {
    return this.request(
      Object.assign(config || {}, {
        url,
        method
      })
    )
  }
  __requestMethodata(method: Method, url: string, data?: any, config?: AxiosReportConfig) {
    return this.request(
      Object.assign(config || {}, {
        url,
        method,
        data
      })
    )
  }
}
