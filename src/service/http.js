import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'develepment' ? 'http://localhost:3001' : 'https://www.wangjiquan.cn:3000'

const http = axios.create({
  baseURL: BASE_URL,
});

http.interceptors.request.use(config => {
  return config
}, err => {
  return err
})

http.interceptors.response.use(res => {
  return res
}, err => {
  return err
})

export default http;