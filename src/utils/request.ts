import axios from "axios";
import { Notify } from "react-vant";

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': `${localStorage.getItem('token') || null}`
  }
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    switch (response.data.code) {
      // 后端业务逻辑处理成功
      case 200:
        return response.data;
      default: {
        const { message = '系统错误' } = response.data;
        Notify.show(message)
      }
    }
  },
  (error) => {
    // 失败回调，处理http网络错误
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = '无效token'
        window.location.href = '/login'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器错误'
        break
      default:
        message = '网络出现问题'
    }
    Notify.show(message)
    return Promise.reject(error)
  },
);

export default request