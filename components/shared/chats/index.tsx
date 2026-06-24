'use client';

import { ArrowsAltOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { Badge, Spin } from 'antd';
import { useEffect } from 'react';

import { setConversation, setShowConversations, setShowOrdersModal } from './reducer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchConversations, setupOrderChat } from './slices';
import { EmptyWrapper, Overlay } from '../layout/styled';
import Button from '@/components/shared/button';
import useClassName from '@/hooks/class-name';
import Conversation from './conversation';
import OrdersModal from './modals/orders';
import { ChatsWrapper } from './styled';
import useRoute from '@/hooks/route';
import Chat from './chat';

const Chats = () => {
  const { profile: { data: authUser }, order: { data: order } } = useAppSelector((state) => state.dashboard);
  const { showConversations, showOrdersModal, ...rest } = useAppSelector((state) => state.chat);
  const { list: conversations, total_unread, loading } = rest.conversations;
  const { data: conversation } = rest.conversation;
  const dispatch = useAppDispatch();
  const { routes } = useRoute();
  
  const isMinimized = conversation && !showConversations;
  const inOrderPage = routes.order;
  
  const className = useClassName([
    showConversations ? 'show' : '',
    loading ? 'loading' : ''
  ]);
  
  const handleSetupOrderChat = () => {
    if (!inOrderPage) return dispatch(setShowOrdersModal(true));
    dispatch(setupOrderChat(order, authUser))
  };

  const toggleChatsWidget = () => {
    if (conversation) return;
    dispatch(setShowConversations(!showConversations));
  };

  const toggleChatWidget = () => {
    dispatch(setShowConversations(!showConversations));
  };

  const closeChatWidget = () => {
    dispatch(setShowConversations(!showConversations));
    dispatch(setConversation({ data: undefined }));
  };

  useEffect(() => {
    if (showConversations) dispatch(fetchConversations());
  }, [showConversations]);

  if (routes.auth || !authUser) return null;

  return (
    <>
      {showConversations && <Overlay onClick={toggleChatWidget} />}
      <OrdersModal />

      <ChatsWrapper className={className}>
        <div className="header" onClick={toggleChatsWidget}>
          {conversation ? (
            <>
              <Conversation conversation={conversation} inChatHeader />

              <div className="controls">
                <Button
                  icon={isMinimized ? <ArrowsAltOutlined /> : <MinusOutlined />}
                  onClick={toggleChatWidget}
                />
                
                <Button
                  onClick={closeChatWidget}
                  icon={<CloseOutlined />}
                />
              </div>
            </>
          ) : (
            <>
              Chats
              {Boolean(total_unread) && <Badge count={total_unread} />}
            </>
          )}
        </div>

        <div className="conversations">
          {conversation ? (
            <Chat />
          ) : loading ? (
            <Spin />
          ) : Boolean(conversations.length) ? (
            conversations.map((conversation, index) => (
              <Conversation
                conversation={conversation}
                key={conversation.id}
                index={index}
              />
            ))
          ) : (
            <EmptyWrapper>
              <p>
                You do not have any conversations yet!
                <br />
                Start a conversation{inOrderPage ? 'for this order' : ''}.
              </p>
              
              <Button onClick={handleSetupOrderChat} type="primary" size="small">
                Create Chat
              </Button>
            </EmptyWrapper>
          )}
        </div>
      </ChatsWrapper>
    </>
  );
};

export default Chats;