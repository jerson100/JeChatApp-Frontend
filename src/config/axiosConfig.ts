import axios, {AxiosError} from 'axios';
import ResponseAxiosError from 'src/lib/ResponseAxiosError';
import EncryptedSecureStorage from './encryptedStorage';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3504/api/v1',
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await EncryptedSecureStorage.getItem('AUTH_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    console.log(error.code);
    if (error.response) {
      const {
        response: {data, status},
      } = error;
      const {message} = data as {
        message: string;
      };
      return Promise.reject(new ResponseAxiosError(message, status));
    }
    return Promise.reject(
      new ResponseAxiosError(
        'Ocurrió un error',
        error.code === 'ERR_CANCELED' ? 0 : 1,
      ),
    );
  },
);

export default axiosInstance;
