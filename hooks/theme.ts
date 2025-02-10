import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';

const useTheme = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const [inDarkMode, setDarkMode] = useState(false);
  
  const inDarkThemeMode = () => {
    const deviceIsInDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const inDarkMode = localStorage?.themeMode === 'dark';
    return (deviceIsInDarkMode && mode !== 'light') || inDarkMode;
  };

  useEffect(() => {
    setDarkMode(inDarkThemeMode());
  }, [mode]);
  
  return { inDarkMode };
};

export default useTheme;