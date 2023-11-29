// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cosmos-api-delta.vercel.app/'
  // headers: {
  //   'Access-Control-Allow-Origin': 'http://localhost:5173',
  //   // Other headers...
  // },
});

export default axiosInstance;
