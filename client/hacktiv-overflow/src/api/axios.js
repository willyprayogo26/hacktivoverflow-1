import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'http://overflow-server.willyprayogo26.xyz',
});

export default axiosInstance;
