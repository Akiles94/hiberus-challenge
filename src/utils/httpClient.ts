import axios from 'axios';
import { getToken } from './authStore';

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async config => {
    const token = getToken();
    config.headers = {
      Accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default api;
