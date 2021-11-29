import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const instance: AxiosInstance = axios.create({
  timeout: 1000 * 30,
  // withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  baseURL: process.env.VUE_APP_BASE_URL
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    if (data.code !== '100000' && response.config.responseType !== 'blob') {
      ElMessage({ message: data.message, type: 'warning' })
      return Promise.reject(data.message)
    }
    return Promise.resolve(data)
  },
  (err: AxiosError) => {
    Promise.reject(err)
  }
);

export default instance