'use client';

import { Switch, Tooltip } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MetadataWrapper } from './styled';
import Prompt from '../feedback/prompt';
import { setMessage } from './reducer';
import TypingIndicator from './typing';
import { OrderModel } from '@/types';

const Metadata = () => {
  const { profile: { data: authUser } } = useAppSelector((state) => state.dashboard);
  const { message, typing, ...chat } = useAppSelector((state) => state.chat);
  const { data: conversation } = chat.conversation;
  const order = conversation?.order as OrderModel;
  const isFiles = message.attachments?.length;
  const { type } = conversation ?? {};
  const dispatch = useAppDispatch();
  
  const isTyping = Boolean(typing && conversation?.id === typing.conversationId);
  const isStaff = ['moderator', 'admin'].includes(authUser?.role as string);
  const canDeliverOrder = type === 'order' && order?.status === 'pending';
  const canCloseCase = type === 'support';

  const markOrderAsDelivered = () => {
    const newMessage = { ...message };
    if ('metadata' in message) delete newMessage['metadata'];
    else newMessage.metadata = {
      order_status_info: `Order delivered by ${authUser?.email}`
    };

    dispatch(setMessage(newMessage));
  };

  if (isStaff && !canDeliverOrder && !canCloseCase && !isTyping) return null;

  return (
    <MetadataWrapper className={isTyping ? 'typing' : ''}>
      <TypingIndicator isTyping={isTyping} typing={typing} />

      {canDeliverOrder && (
        <div className="order-update">
          <small>Mark order as delivered</small>
          <Prompt
            description="Do you wish to proceed?"
            onConfirmed={markOrderAsDelivered}
            title="Confirm Action"
            target="deliverOrder"
          >
            <Tooltip title={!isFiles ? 'Add files to mark order as delivered' : ''} color="red">
              <Switch
                checked={Boolean(message.metadata?.order_status_info)}
                disabled={!isFiles}
                size="small"
              />
            </Tooltip>
          </Prompt>
        </div>
      )}
    </MetadataWrapper>
  );
};

export default Metadata;