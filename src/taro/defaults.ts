import { AxiosReportConfig } from '../types'

const defaults: AxiosReportConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodNoData = ['delete', 'get', 'headers', 'options']
methodNoData.forEach(methods => {
  defaults.headers[methods] = {}
})

const methodWithData = ['post', 'put', 'patch']
methodWithData.forEach(methods => {
  defaults.headers[methods] = {
    'Content-type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
