import Axios from 'axios'

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.transformRequest = [data=> {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]
Axios.defaults.withCredentials = true

Axios.interceptors.response.use(res => {
    console.log(`[ Response: ${res.config.url} ]`)
    return res.data
})

export default Axios
