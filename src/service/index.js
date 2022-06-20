import axios from "axios";

const baseURL = process.env.VUE_APP_ISMOCK
    ? process.env.VUE_APP_API_MOCK_URL
    : process.env.VUE_APP_API_URL

const service = axios.create({
    //基础路径
    // baseURL: 'api/',
    baseURL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    //请求超时时间   （3s内没响应就失败了）
    timeout: 30000,

})
//请求拦截器  
//axios实例的拦截器的request请求使用配置对象，返回配置对象
service.interceptors.request.use((config) => {
    return config
}, (error) => {
    //请求失败的返回，后面的then或者catch回调随便写不写
    return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    // Nprogress.done()
    //响应失败的返回
    return Promise.reject(error)
})

//导出axios实例
export default service