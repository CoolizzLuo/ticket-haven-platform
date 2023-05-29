import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://ticket-haven-dev.onrender.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const isServer = typeof window === 'undefined';

axiosClient.interceptors.request.use(
  async (config) => {
    const conf = { ...config };
    const session = isServer ? await getServerSession(authOptions) : await getSession();

    conf.headers.Authorization = session?.token && `Bearer ${session.token}`;
    return conf;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
