import { CSSProperties, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { InlineFeedbackWrapper } from './styled';
import { InlineFeedbackProps } from '@/types';
import { clearFeedback } from './reducer';
import colors from '@/libs/colors';

const InlineFeedback = (props: InlineFeedbackProps) => {
  const { message, target: feedbackTarget, feedbackType, duration, type, show } = useAppSelector((state) => state.feedback);
	const { withBlockMargin = false, icon, children, target } = props;

	const childrenContent = feedbackType === 'inline' && feedbackTarget === target && show && children;
	const textContent = feedbackType === 'inline' && feedbackTarget === target && message;
	const dispatch = useAppDispatch();
	
	const style: CSSProperties = {
		color: type ? colors.theme[type] : 'initial'
	};

	const className = [
		withBlockMargin ? 'add-block-margin' : '',
		icon ? 'with-icon' : '',
		props.className
	].join(' ').trim();

	useEffect(() => {
		if ((message || show) && duration) {
			const clearContent = setTimeout(() => {
				dispatch(clearFeedback());
				clearTimeout(clearContent);
			}, duration * 1000);
		}
	}, [message, show]);

	if (!(show && (textContent || childrenContent)) && !textContent) return null;

	return (
		<InlineFeedbackWrapper className={className} style={style}>
			{icon}
			{childrenContent || textContent}
		</InlineFeedbackWrapper>
	);
};

export default InlineFeedback;