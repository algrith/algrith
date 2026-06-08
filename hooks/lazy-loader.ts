import { lazyLoader } from '@/utils';
import { useEffect } from 'react';

const useLazyLoader = () => {
  useEffect(() => {
    const cleaup = lazyLoader();
    return cleaup;
  }, []);
};

export default useLazyLoader;