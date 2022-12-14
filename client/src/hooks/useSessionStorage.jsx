import { useState } from 'react';

const useSessionStorage = (key, val) => {
  const [storedValue, setStoredValue] = useState(() => {

    try {
      const value = sessionStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      else {
        sessionStorage.setItem(key, JSON.stringify(val));
        return val;
      }
    }
    catch (error) {
      return val;
    }
  });

  const setValue = (newVal) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(newVal));
    }
    catch (error) { /* empty */ }
    setStoredValue(newVal);
  };
  return [storedValue, setValue];
};

export default useSessionStorage;