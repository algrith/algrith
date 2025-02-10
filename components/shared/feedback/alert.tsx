'use client';

import { useEffect } from 'react';
import { message } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AlertFeedbackAPIs } from '@/types';
import { clearFeedback } from './reducer';

const Alert = () => {
	const { message: alertMessage, feedbackType, type } = useAppSelector((state) => state.feedback);
	const [api, contextHolder] = message.useMessage();
	const dispatch = useAppDispatch();

	message.config({
		maxCount: 1
	});

	useEffect(() => {
		if (feedbackType === 'alert' && alertMessage) {
			const apiType = {
				warning: api.warning,
				success: api.success,
				error: api.error,
				info: api.info
			}[type as keyof AlertFeedbackAPIs];

			apiType({
        onClose: () => dispatch(clearFeedback()),
				// style: { marginTop: '88vh' },
				content: alertMessage
			});
		}
	}, [feedbackType, alertMessage]);

	return contextHolder;
};

export default Alert;
