import axiosConfig from 'config/axiosConfig';
import {
  Auth,
  singInGeneric,
  singUpGeneric,
  verifyAccount,
} from 'src/types/auth';

export default class AuthService {
  static login: singInGeneric<Auth> = async (username, password, config) => {
    const response = await axiosConfig.post(
      '/auth/signin',
      {username, password},
      config,
    );
    return response.data;
  };
  static singUp: singUpGeneric<Auth> = async (data, config) => {
    const response = await axiosConfig.post('/auth/signup', data, config);
    return response.data;
  };
  static verify: verifyAccount = async config => {
    const response = await axiosConfig.get('/auth/verify', config);
    return response.data;
  };
}
