import axios from 'axios';

const http = axios.create({
  // baseURL: 'http://localhost:3001',
  baseURL: 'https://www.wangjiquan.cn:3000',
});

export default http;