import axios from 'axios'

export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        // 旧接口地址
        // baseURL: 'http://123.207.32.32:8000',
        // 最新接口地址
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    // 2.axios的拦截器
    // 2.1 request请求拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err);
    })

    // 2.2 response响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    // 3.发送真正的网络请求
    return instance(config)

}