/**
 * 测试接口专用请求封装
 */

import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
})

request.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err)
)

export default request