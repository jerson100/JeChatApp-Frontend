import {useState, useMemo, useRef, useEffect} from 'react';
import {Auth, singUpGeneric} from 'src/types/auth';
// import {User} from 'src/types/user';
import ResponseAxiosError from 'src/lib/ResponseAxiosError';
import AuthService from 'src/services/authService';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<Auth | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const signup: singUpGeneric<Auth | null> = async user => {
    try {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError('');
      const response = await AuthService.singUp(user, {
        signal: abortControllerRef.current.signal,
      });
      setData(response);
      return response;
    } catch (error) {
      if (error instanceof ResponseAxiosError) {
        console.log(error.status);
        if (error.status !== 0) {
          setError(error.message);
          throw error.message;
        }
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return useMemo(
    () => ({
      loading,
      error,
      data,
      signup,
    }),
    [loading, error, data, signup],
  );
};

export default useSignUp;
