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
  url:"/23232321",
  data:{
    a:1,
    b:2
  },
}).then(res => {
  // console.log(res,222222);
}).catch(err => {
  console.log(err,2222);
})


