'use client';

import { useRef, useEffect } from 'react';

export const usePreviousState = (value: any) => {
  const ref = useRef(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};