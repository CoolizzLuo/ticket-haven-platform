import axios from 'axios';
import { getSession } from 'next-auth/react';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://ticket-haven-dev.onrender.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const conf = { ...config };
    const session = await getSession();

    conf.headers.Authorization = session?.token && `Bearer ${session.token}`;
    return conf;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
