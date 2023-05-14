import axios from 'axios';
import { getTokenFromLS } from '@/api/auth';

export const axiosClient = axios.create({
  baseURL: process?.env?.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : 'https://ticket-haven-dev.onrender.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const conf = { ...config };
    conf.headers.Authorization = getTokenFromLS();
    return conf;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
