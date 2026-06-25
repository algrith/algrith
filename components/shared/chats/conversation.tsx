'use client';

import { CaretLeftOutlined, PaperClipOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar } from 'antd';

import { Conversation as ConversationModel, OrderModel } from '@/types';
import Button from '@/components/shared/button';
import { ConversationWrapper } from './styled';
import { useAppDispatch } from '@/store/hooks';
import { setConversation } from './reducer';
import { getDateFormat } from '@/utils';

const Conversation = (props: { conversation: ConversationModel; inChatHeader?: boolean, index?: number; }) => {
  const { conversation, inChatHeader = false, index } = props;
  const order = conversation.order as OrderModel;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleBackToConversations = () => {
    dispatch(setConversation({ data: undefined }));
  };
  
  const selectConversation = () => {
    if (inChatHeader) return;
    
    dispatch(setConversation({
      data: conversation,
      index
    }));
  };
  
  const openOrder = () => {
    if (!inChatHeader || !order || conversation.type !== 'order') return;
    router.push(`/dashboard/orders/${order.id}`);
  };

  useEffect(() => {
    // Set conversation index in case of deletion, re-ordering, or update of any kind etc.
    if (inChatHeader && typeof index === 'number') dispatch(setConversation({ index }));
  }, [inChatHeader, index]);

  return (
    <ConversationWrapper className={inChatHeader ? 'in-chat-header' : ''} onClick={selectConversation}>
      {inChatHeader && <Button icon={<CaretLeftOutlined onClick={handleBackToConversations} />} />}
      <span><Avatar icon={<UserOutlined />} size={inChatHeader ? 'small' : 'default'} /></span>
      
      <div className="text" onClick={openOrder}>
        <span className="title">
          {(conversation.type === 'order' && order) ? (
            `${order.plan.name} • #${order.reference}`
          ) : conversation.type === 'support' ? (
            `Support • #${order.reference}`
          ) : (
            conversation.type 
          )}
        </span>

        {(!inChatHeader && conversation.last_message) && (
          <div className="message">
            <p className="last-message" dangerouslySetInnerHTML={{ __html: conversation.last_message.text || <PaperClipOutlined />}} />
            <small>{getDateFormat(conversation.last_message.createdAt).time}</small>
          </div>
        )}
      </div>
    </ConversationWrapper>
  );
};

export default Conversation;