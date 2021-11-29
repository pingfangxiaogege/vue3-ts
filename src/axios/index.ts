import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({
  timeout: 1000 * 30,
  // withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    return Promise.resolve(data);
  },
  (err: AxiosError) => {
    Promise.reject(err);
  }
);

export default instance;