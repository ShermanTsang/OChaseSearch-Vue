import Axios from 'axios'

Axios.interceptors.response.use(res => {
    console.log(`[ Response: ${res.config.url} ]`)
    return res.data
})

export default Axios
