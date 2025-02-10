import { GetMessageProps, Messages } from '@/types';

const messages: Messages = {
};

export const getMessage = (props: GetMessageProps) => {
  const { responseCode, resourceType } = props;
	const message = messages[resourceType]?.[responseCode];
	return message ?? 'Unknown error';
};