import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000
})


service.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
)


export default service