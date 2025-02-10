'use client';

import { useEffect, useState } from 'react';

import useBrowserTab from '@/hooks/browser-tab';
import { useAppDispatch } from '@/store/hooks';
import { showFeedback } from './reducer';
import useOnline from '@/hooks/online';

const OnlineIndicator = () => {
  const [isInitialRender, setInitialRender] = useState(true);
  const [displayQueue, setDisplayQueue] = useState(0);
  const isActiveTab = useBrowserTab();
  const dispatch = useAppDispatch();
  const isOnline = useOnline();

  const handleOnlineChange = () => !isInitialRender && dispatch(showFeedback({
    message: !isOnline ? 'You are currently offline!' : `You're back online!`,
    type: isOnline ? 'success' : 'error',
    feedbackType: 'alert'
  }));

  useEffect(() => {
    if (!isActiveTab) return setDisplayQueue(1);
    handleOnlineChange();
  }, [isOnline]);
  
  useEffect(() => {
    if (isActiveTab && displayQueue) {
      handleOnlineChange();
      setDisplayQueue(0);
    }
  }, [isActiveTab]);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  return <></>
};

export default OnlineIndicator;