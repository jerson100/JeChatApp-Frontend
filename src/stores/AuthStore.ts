import {Auth, singInGeneric} from 'src/types/auth';
import {create} from 'zustand';
import AuthService from 'src/services/authService';
import ResponseAxiosError from 'src/lib/ResponseAxiosError';
import EncryptedSecureStorage from 'src/config/encryptedStorage';
import {Socket, io} from 'socket.io-client';

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
  socket: Socket;
  changeUrlImageProfile: (url: string) => void;
};

const useAuthStore = create<AuthStore>((set, get) => ({
  auth: null,
  signInLoading: false,
  isAuthenticated: false,
  errorSignIn: '',
  initialized: false,
  socket: io('http://localhost:3504', {
    autoConnect: false,
  }),
  init: async () => {
    const token = await EncryptedSecureStorage.getItem('AUTH_TOKEN');
    if (token) {
      try {
        const auth = await AuthService.verify();
        const socket = get().socket;
        socket.auth = {user: token};
        socket.connect();
        socket.on('connect_error', err => {
          console.log(`${err.message}`);
        });
        set({auth, isAuthenticated: true, socket});
      } catch (e) {
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
      const socket = get().socket;
      socket.auth = {user: response.token};
      socket.connect();
      set({
        signInLoading: false,
        isAuthenticated: true,
        auth: response,
        socket,
      });
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
    const socket = get().socket;
    socket.disconnect();
    set({isAuthenticated: false, auth: null, socket});
  },
  updateAuth: auth => {
    if (auth) {
      set({auth, isAuthenticated: true});
    } else {
      set({auth: null, isAuthenticated: false});
    }
  },
  changeUrlImageProfile: (url: string) => {
    set(state => ({
      auth: state.auth
        ? {
            token: state.auth.token,
            user: {
              ...state.auth.user,
              urlImageProfile: url,
            },
          }
        : null,
    }));
  },
  //   connectSocket: () => {
  //     const auth = get().auth;
  //     const socket = get().socket;
  //     if (auth) {
  //       socket.auth = auth;
  //       socket.connect();
  //       set({socket});
  //     }
  //   },
}));

export default useAuthStore;
