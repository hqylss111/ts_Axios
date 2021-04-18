import axios from '../../src/index'



// 这样写的话 其实是执行的request 因为axios 返回的是一个request


// 其实执行的就是aixos.request
interface IData<T = any> {
  data:T,
  code:string,
}

// axios<IData>({ //这样我就知道他的data要返回一个 IData 类型
//   method:'post',
//   url:"/base/login",
//   headers:{
//     'a':1,
//     'content-type':"12323232"
//   },
//   data:null
// }).then(e => {
//   // e.data.msg
//   console.log(e,111);
  
// })




// function getMes<T>(){
//     return axios.post<IData<T>>('/base/login').then(res => {
//       return res.data
//     })
// }


interface Demo {
  mes:string
}

async function test(){
  console.log(1111);
  
  let a = await axios.post<Demo>('/base/login').then(res => {
    console.log(res.data);
    
  })
  
}
test()
