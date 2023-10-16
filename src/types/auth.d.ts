import {AxiosRequestConfig} from 'axios';
import {User} from './user';

interface Auth {
  token: string;
  user: User;
}

interface AuthContextValue {
  auth: Auth | null;
  login: loginfn;
  logout: logoutfn;
  singInLoading?: boolean;
}

type singInGeneric<T> = (
  username: string,
  password: string,
  config?: AxiosRequestConfig,
) => Promise<T>;

type verifyAccount = (config?: AxiosRequestConfig) => Promise<Auth>;

type singUpGeneric<T> = (
  user: Pick<User, 'email' | 'username'> & {
    password: string;
    confirmPassword: string;
  },
  config?: AxiosRequestConfig,
) => Promise<T>;

type logoutfn = () => void;

export {
  Auth,
  AuthContextValue,
  logoutfn,
  IAuthService,
  singUpGeneric,
  singInGeneric,
  verifyAccount,
};
