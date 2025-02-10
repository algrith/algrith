import { useEffect, useState } from 'react';

const useBrowserTab = () => {
  const [isActiveTab, setIsActiveTab] = useState(true);
  const setInactiveTab = () => setIsActiveTab(false);
  const setActiveTab = () => setIsActiveTab(true);

  useEffect(() => {
    window.addEventListener('blur', setInactiveTab);
    window.addEventListener('focus', setActiveTab);

    return () => {
      window.removeEventListener('blur', setInactiveTab);
      window.removeEventListener('focus', setActiveTab);
    }
  }, []);

  return isActiveTab;
};

export default useBrowserTab;