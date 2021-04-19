import axios from '../../src/index'




function isPlainObject(data: any): data is object {
  return Object.prototype.toString.call(data) === '[object Object]'
}
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}



const a = {
  Accept: "application/json, text/plain, */*"
}
const b = {
  'Content-type': "application/x-www-form-urlencoded"
}
const c = {
  Accept: "application/json, text/plain, */*",
  common: {
    Accept: "application/json, text/plain, */*"
  },
  d: 1
}
let demo = deepMerge(a, b, c)
console.log(demo, 1);

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })


// axios.interceptors.request.use(res => {
//   res.headers.cc = 233333333333333333;
//   console.log(res,15);
//   return res;
// })
// let id =  axios.interceptors.response.use(res => {
//   res.data = 10;
//   return res;
// })
// console.log(id,1111);

// axios.defaults.method = 'post'




axios.defaults.headers['test'] = 2222;
axios({
  method: 'post',
  url: "/base/login",
  headers: {
    'a': 1,
    'content-type': "12323232"
  },
  data: null
})
