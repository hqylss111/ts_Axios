import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })


axios.interceptors.request.use(res => {
  res.headers.cc = 233333333333333333;
  console.log(res,15);
  return res;
})
let id =  axios.interceptors.response.use(res => {
  res.data = 10;
  return res;
})
console.log(id,1111);

axios.interceptors.response.eject(id)
axios({
  method: 'post',
  url: "/base/login",
  headers: {
    'a': 1111111111111111111,
    'content-type': "12323232"
  },
  data: null
}).then(res => {
  console.log(res.data,);

})



// axios({
//   method:'post',
//   url:"/base/login",
//   headers:{
//     'a':1,
//     'content-type':"12323232"
//   },
//   data:null
// })