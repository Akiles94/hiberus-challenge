import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getToken } from './authStore';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  async config => {
    const token = getToken();
    config.headers = {
      Accept: 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  data => data,
  e => {
    const { code, config, isAxiosError, message, name, request, response } = e as AxiosError;

    let newMessage = message;

    newMessage = newMessage || '¡Oh no! Ocurrió un error inesperado.';

    toast.error(newMessage);

    const newError = new Error(newMessage) as AxiosError;

    newError.code = code;
    newError.config = config;
    newError.isAxiosError = isAxiosError;
    newError.name = name;
    newError.request = request;
    newError.response = response;

    return Promise.reject(newError);
  }
);

export default api;
