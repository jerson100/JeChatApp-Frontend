import {Auth, singInGeneric} from 'src/types/auth';
import {create} from 'zustand';
import AuthService from 'src/services/authService';
import ResponseAxiosError from 'src/lib/ResponseAxiosError';
import EncryptedSecureStorage from 'src/config/encryptedStorage';

type AuthStore = {
  auth: Auth | null;
  errorSignIn?: string;
  signInLoading: boolean;
  isAuthenticated: boolean;
  initialized: boolean;
  login: singInGeneric<void>;
  logout: () => Promise<void>;
  updateAuth: (auth: Auth | null) => void;
  init: () => Promise<void>;
};

const useAuthStore = create<AuthStore>(set => ({
  auth: null,
  signInLoading: false,
  isAuthenticated: false,
  errorSignIn: '',
  initialized: false,
  init: async () => {
    const token = await EncryptedSecureStorage.getItem('AUTH_TOKEN');
    if (token) {
      try {
        const auth = await AuthService.verify();
        set({auth, isAuthenticated: true});
      } catch (e) {
        console.log(e);
        if (e instanceof ResponseAxiosError) {
        }
      }
    }
    set({initialized: true});
  },
  login: async (username, password, config) => {
    try {
      set({signInLoading: true, errorSignIn: ''});
      const response = await AuthService.login(username, password, config);
      await EncryptedSecureStorage.setItem('AUTH_TOKEN', response.token);
      set({signInLoading: false, isAuthenticated: true, auth: response});
      Promise.resolve();
    } catch (e) {
      if (e instanceof ResponseAxiosError) {
        if (e.status !== 0) {
          set({errorSignIn: e.message});
          return Promise.reject(e.message);
        }
      }
    } finally {
      set({signInLoading: false});
    }
  },
  logout: async () => {
    await EncryptedSecureStorage.removeItem('AUTH_TOKEN');
    set({isAuthenticated: false, auth: null});
  },
  updateAuth: auth => {
    if (auth) {
      set({auth, isAuthenticated: true});
    } else {
      set({auth: null, isAuthenticated: false});
    }
  },
}));

export default useAuthStore;
