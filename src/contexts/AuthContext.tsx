import {
  createContext,
  ReactNode,
  FC,
  useState,
  useCallback,
  useMemo,
} from 'react';
import EncryptedSecureStorage from 'src/config/encryptedStorage';
import ResponseAxiosError from 'src/lib/ResponseAxiosError';
import AuthService from 'src/services/authService';
import {Auth, AuthContextValue, singInGeneric} from 'src/types/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [singInLoading, setSingInLoading] = useState<boolean>(false);

  const login: singInGeneric<void> = useCallback(
    async (username, password, config) => {
      try {
        setSingInLoading(true);
        const dataResponse = await AuthService.login(
          username,
          password,
          config,
        );
        setAuth(dataResponse);
        await EncryptedSecureStorage.setItem(
          'AUTH_TOKEN',
          JSON.stringify(dataResponse.token),
        );
      } catch (e) {
        if (e instanceof ResponseAxiosError) {
          console.log(e.message, e.status, e.errors);
        }
      } finally {
        setSingInLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setAuth(null);
    await EncryptedSecureStorage.removeItem('AUTH_TOKEN');
  }, []);
  const memovalues = useMemo(() => {
    return {
      auth,
      login,
      logout: () => {},
      singInLoading,
    };
  }, [auth, login, logout, singInLoading]);
  return (
    <AuthContext.Provider value={memovalues}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
