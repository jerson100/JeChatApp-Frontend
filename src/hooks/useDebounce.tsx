import {useEffect, useState} from 'react';

const useDebounce = <T,>(value: T, delay: number = 5000): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(time);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
