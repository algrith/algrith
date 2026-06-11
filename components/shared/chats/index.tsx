'use client';

import { ArrowsAltOutlined, CaretLeftOutlined, CheckOutlined, CloseOutlined, ExclamationCircleOutlined, MinusOutlined, PaperClipOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Avatar, Badge, Spin } from 'antd';
import { User } from 'next-auth';

import { ChatsWrapper, ChatWrapper, EmptyWrapper, MessageWrapper, ConversationWrapper } from './styled';
import { createOrderConversation, fetchMessages, fetchConversations, sendMessage } from './slices';
import { Conversation as ConversationModel, Message as MessageModel, OrderModel } from '@/types';
import { setConversation, setMessages, setShowConversations } from './reducer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useScrollToLastChild from '@/hooks/scroll-to-view';
import { Input } from '@/components/shared/input';
import { getDateFormat, randomId } from '@/utils';
import Button from '@/components/shared/button';
import useRoute from '@/hooks/route';

const defaultMessage: Partial<MessageModel> = {
  temp_id: randomId(),
  attachments: [],
  text: ''
};

const Conversation = (props: { conversation: ConversationModel; inChatHeader?: boolean }) => {
  const { conversation, inChatHeader = false } = props;
  const order = conversation.order as OrderModel;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleBackToConversations = () => {
    dispatch(setConversation({ data: undefined }));
  };
  
  const selectConversation = () => {
    if (inChatHeader) return;
    dispatch(setConversation({ data: conversation }));
  };
  
  const openOrder = () => {
    if (!inChatHeader || !order || conversation.type !== 'order') return;
    router.push(`/dashboard/orders/${order.id}`);
  };

  return (
    <ConversationWrapper className={inChatHeader ? 'in-chat-header' : ''} onClick={selectConversation}>
      {inChatHeader && <Button icon={<CaretLeftOutlined onClick={handleBackToConversations} />} />}
      <span><Avatar icon={<UserOutlined />} size="small" /></span>
      
      <span className="text" onClick={openOrder}>
        <span className="title">
          {conversation.type === 'order' ? (
            `${order.plan.name} • #${order.reference}`
          ) : (
            `Support • #${order.reference}`
          )}
        </span>

        {(!inChatHeader && conversation.last_message) && (
          <span className="message">
            {conversation.last_message.text}
            {' '}•{' '}
            <small>
              {getDateFormat(conversation.last_message.createdAt).time}
            </small>
          </span>
        )}
      </span>
    </ConversationWrapper>
  );
};

const Message = ({ message }: { message: MessageModel }) => {
  const sender = (message.sender.user as User);
  const { data: session } = useSession();

  const isSender = sender?.id === session?.user.id;

  const statusIcon = {
    failed: <ExclamationCircleOutlined />,
    delivered: <CheckOutlined />,
    read: <CheckOutlined />,
    sent: <CheckOutlined />,
    pending: ''
  }[message.status];
  
  return (
    <MessageWrapper className={isSender ? 'sender' : ''}>
      <div className="message">
        {!isSender && <span><Avatar icon={<UserOutlined />} /></span>}
        
        <div className="details">
          {!isSender && <h3>{sender.name}</h3>}

          <span className="text">
            {message.text}
          </span>

          <small className="metadata">
            <span>{getDateFormat(message.createdAt).time}</span>
            {statusIcon && (
              <span className={message.status}>
                {statusIcon}
              </span>
            )}
          </small>
        </div>
      </div>
    </MessageWrapper>
  );
};

const Chats = () => {
  const { order: { data: order } } = useAppSelector((state) => state.dashboard);
  const { showConversations, ...rest } = useAppSelector((state) => state.chat);
  const { list: conversations, total_unread } = rest.conversations;
  const { data: conversation } = rest.conversation;
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { routes } = useRoute();
  
  const isMinimized = conversation && !showConversations;
  
  const handleSetupOrderChat = () => {
    if (!order || !session?.user) return;
    const { user } = session;
    
    dispatch(setConversation({
      data: {
        participants: [{ role: user.role || 'customer', user }],
        id: 'NEW_CONVERSATION',
        order: order.id,
        type: 'order'
      }
    }));
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
    dispatch(fetchConversations());
  }, []);

  return (
    <ChatsWrapper className={showConversations ? 'show' : ''}>
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
        ) : Boolean(conversations.length) ? (
          conversations.map((conversation) => (
            <Conversation
              conversation={conversation}
              key={conversation.id}
            />
          ))
        ) : (
          <EmptyWrapper>
            <p>
              You do not have any conversations yet!
              <br />
              Start a conversation for this order.
            </p>
            
            {routes.order && (
              <Button onClick={handleSetupOrderChat} type="primary" size="small">
                Create Chat
              </Button>
            )}
          </EmptyWrapper>
        )}
      </div>
    </ChatsWrapper>
  );
};

const Chat = () => {
  const [sendingMessage, setSendingMessage] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const chat = useAppSelector((state) => state.chat);
  const { loading, list: messages } = chat.messages;
  const { data: conversation } = chat.conversation;
  const messagesContainerRef = useRef(null);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const user = session?.user;

  const role = user?.role || 'customer';

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setMessage((prev) => ({
      ...prev, text: value
    }));
  };

  const handleSendOrderMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const newMessage = { sender: { role, user }, ...message } as MessageModel;

    setMessage(defaultMessage);
    setSendingMessage(true);

    dispatch(setMessages({
      list: [
        ...messages,
        newMessage
      ]
    }));
    
    if (conversation?.id === 'NEW_CONVERSATION') {
      const customerId = !['moderator', 'admin'].includes(role) ? user.id : '';

      await dispatch(createOrderConversation(
        conversation.order as string,
        customerId
      ));
    }
    
    dispatch(sendMessage(newMessage));
    setSendingMessage(false);
  };

  useScrollToLastChild({
		targetSelector: '.message-wrapper',
		parentRef: messagesContainerRef,
		dependencies: [messages]
	});

  useEffect(() => {
    if (!conversation || conversation.id === 'NEW_CONVERSATION' || conversation.temp_id) return;
    dispatch(fetchMessages(conversation.id));
  }, [conversation?.id]);
  
  return (
    <ChatWrapper className={loading ? 'loading' : ''} ref={messagesContainerRef}>
      <div className="messages">
        {loading ? (
          <Spin />
        ) : Boolean(messages.length) ? (
          messages.map((message) => (
            <Message
              key={message?.id || message?.temp_id}
              message={message}
            />
          ))
        ) : (
          <EmptyWrapper>
            Send your first message.
          </EmptyWrapper>
        )}
      </div>

      <form onSubmit={handleSendOrderMessage} className="input">
        <Button
          icon={<PaperClipOutlined />}
          disabled={loading}
          htmlType="button"
          size="small"
          rounded
        />

        <Input
          placeholder="Type your message..."
          onChange={handleTextChange}
          size="small"
          autoFocus
        />
        
        <Button
          icon={<SendOutlined />}
          disabled={loading}
          htmlType="submit"
          size="small"
          rounded
        />
      </form>
    </ChatWrapper>
  );
};

export default Chats;