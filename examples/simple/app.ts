import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })


axios({
  method:'post',
  url:"/base/login",
  data:{
    a:1,
    b:2
  },
}).then(res => {
  console.log(res,1111);
  
})


axios({
  method:'post',
  url:"/base/login",
  headers:{
    'a':1,
    'content-type':"12323232"
  },
  data:null
})