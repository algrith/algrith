import { useEffect, useState } from 'react';

const useOnline = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : false);

  const setOffline = () => setIsOnline(false);
  const setOnline = () => setIsOnline(true);

  useEffect(() => {
    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);

    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
    }
  }, []);

  return isOnline;
};

export default useOnline;