'use client';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CustomNotificationProps } from '@/types';
import { NotificationWrapper } from './styled';
import { clearFeedback } from './reducer';

const CustomNotification = ({ message, type }: CustomNotificationProps) => {
  useEffect(() => {
    // Inspect element in browser and use these to reset default element styles
    const wrappers = document.querySelectorAll('.ant-notification-notice-wrapper');
		wrappers.forEach((wrapper: Element) => {
			const notification = wrapper as HTMLElement;
			const message = notification.querySelector('.ant-notification-notice-message') as HTMLElement;
			if (notification) notification.style.borderRadius = '1rem';
			if (message) message.style.margin = '0';
		});
  }, []);

  return (
    <NotificationWrapper>
      <Button className={type} icon={type === 'success' ? <CheckOutlined /> : <CloseOutlined />} />
      <p>{message}</p>
    </NotificationWrapper>
  );
};

const Notification = () => {
  const { feedbackType, placement, message, type } = useAppSelector((state) => state.feedback);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message && feedbackType === 'notification') {
      api.open({
        message: <CustomNotification message={message} type={type} />,
        onClose: () => dispatch(clearFeedback()),
        style: { padding: 0 },
        closeIcon: null,
        placement
      });
    }
  }, [message]);

  return <>{contextHolder}</>;
};

export default Notification;