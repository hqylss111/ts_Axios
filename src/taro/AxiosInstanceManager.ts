import { rejectFun, requestFun } from '../types'

//拦截器类型接口
interface interceptor<T> {
  resolved: requestFun<T>
  rejected?: rejectFun
}

export default class AxiosInstanceManager<T> {
  private interceptors: Array<interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  //添加拦截器
  use(resolved: requestFun<T>, rejected?: rejectFun): number {
    this.interceptors.push({
      resolved,
      rejected
    })

    return this.interceptors.length - 1
  }

  //删除拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  //因为 interceptors 是私有属性 外部想拿的他值 需要传递一个函数进来
  //传递一个函数进来 函数回调函数参数必须要有 interceptor  返回  void
  forEach(fn: (interceptor: interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
