import { useEffect, RefObject } from 'react';

type CallbackType = (isOpen: boolean) => void;

const useClickAway = (ref: RefObject<HTMLElement | null>, callback: CallbackType) => {
  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (ref?.current && !ref.current.contains(event.target as Node)) callback(false);
    };

    document.addEventListener('click', handleClickAway);

    return () => document.removeEventListener('click', handleClickAway);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, callback]);
};

export default useClickAway;