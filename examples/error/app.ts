import axios from '../../src/index'


axios({
  method:'post',
  url:"/base/login",
  headers:{
    'a':1,
    'content-type':"12323232"
  },
  data:null
}).then(res => {
  console.log(res,1111);
  
})