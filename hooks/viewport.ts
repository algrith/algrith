'use client';

import { useState, useEffect } from 'react';

const getViewport = (width: number) => {
  const breakpoints = {
    '2xl': 1536,
    lg: 1024,
    xl: 1280,
    sm: 640,
    md: 768,
  };

  if (width <= breakpoints.sm) return 'sm';
  if (width <= breakpoints.md) return 'md';
  if (width <= breakpoints.lg) return 'lg';
  if (width <= breakpoints.xl) return 'xl';
  if (width <= breakpoints['2xl']) return '2xl';
  return '';
};

const getWindowDimensions = () => {
  const height = window.innerHeight ?? 0;
  const width = window.innerWidth ?? 0;
  return { width, height };
};

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
  const handleResize = () => setDimensions(getWindowDimensions());
  const viewport = getViewport(dimensions.width);
  const isDesktop = dimensions.width >= 1024;
  const isMobile = dimensions.width < 768;

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    dimensions,
    isDesktop,
    isTablet,
    viewport,
    isMobile
  };
};

export default useWindowDimensions;