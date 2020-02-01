import Axios from 'axios'
import Config from '../../config'

if (process.env.NODE_ENV === 'production') {
  Axios.defaults.baseURL = `${Config['api.protocol']}://${Config['api.domain']}/${Config['api.version']}`
}
Axios.defaults.timeout = 5000
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.withCredentials = true
Axios.defaults.transformRequest = [data => {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

Axios.interceptors.response.use(res => {
  console.log(`[ Response: ${res.config.url} ]`)
  return res.data
})

Axios.jsonp = (url,callbackField) => {
  if(!url){
    console.error('Require url parameter!')
    return
  }
  return new Promise((resolve,reject) => {
    window.jsonCallBack =(result) => {
      resolve(result)
    }
    const JSONP=document.createElement("script")
    JSONP.type="text/javascript"
    JSONP.src=`${url}&${callbackField}=jsonCallBack`
    document.getElementsByTagName("head")[0].appendChild(JSONP)
    setTimeout(() => {
      document.getElementsByTagName("head")[0].removeChild(JSONP)
    },500)
  })
}

export default Axios
