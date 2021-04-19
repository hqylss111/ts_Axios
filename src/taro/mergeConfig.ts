import { deepMerge, isPlainObject } from '../helpers/util'
import { AxiosReportConfig } from '../types'
/**
 *
 * @param val1 配置1
 * @param val2  配置2
 * @returns  传递两个配置对象 返回遍历配置对象 拿到key  在获取不同策略函数的处理不同的数据
 */

function defaultStart(val1: any, val2: any): any {
  //初始化
  return typeof val2 !== 'undefined' ? val2 : val1
}

function formValue2Start(val1: any, val2: any): any {
  //如post 等 data 必须要取配置2对象的函数
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function headerStart(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}

const starts = Object.create(null)
const startKeyFormValue2 = ['url', 'params', 'data']
startKeyFormValue2.forEach(key => {
  starts[key] = formValue2Start
})

const headerStartkey = ['headers']
headerStartkey.forEach(key => {
  starts[key] = headerStart
})

export default function mergeConfig(
  axiosConfig1: AxiosReportConfig,
  axiosConfig2?: AxiosReportConfig
): AxiosReportConfig {
  if (!axiosConfig2) {
    axiosConfig2 = {}
  }

  const config = Object.create(null)

  for (const key in axiosConfig2) {
    mergeField(key)
  }

  for (const key in axiosConfig1) {
    if (!axiosConfig2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const start = starts[key] || defaultStart //合并策略函数

    config[key] = start(axiosConfig1[key], axiosConfig2![key])
  }
  return config
}
