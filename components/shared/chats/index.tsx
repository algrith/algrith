'use client';

import { ArrowsAltOutlined, CaretLeftOutlined, CheckOutlined, CloseOutlined, ExclamationCircleOutlined, MinusOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Avatar, Badge, Spin } from 'antd';
import { User } from 'next-auth';

import { Attachment, Conversation as ConversationModel, Message as MessageModel, OrderModel } from '@/types';
import { ChatsWrapper, ChatWrapper, EmptyWrapper, MessageWrapper, ConversationWrapper } from './styled';
import { createOrderConversation, fetchMessages, fetchConversations, sendMessage } from './slices';
import { setConversation, setMessages, setShowConversations } from './reducer';
import { getDateFormat, getFileFormData, randomId } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useScrollToLastChild from '@/hooks/scroll-to-view';
import { Input } from '@/components/shared/input';
import { FileUploadButton } from '../input/file';
import Button from '@/components/shared/button';
import useRoute from '@/hooks/route';
import { Fetch } from '@/utils/api';
import Files from './files';

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

          <div className="container">
            <Files message={message} inMessage />
            
            {message.text && (
              <div
                dangerouslySetInnerHTML={{ __html: message.text }}
                className="text"
              />
            )}
          </div>

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files, value, id } = e.target;
    let newValue = value as string | Array<Attachment>;

    if (id === 'attachments' && files) {
      const attachments = [...(message?.attachments || [])];

      for (const file of files) {
        const url = URL.createObjectURL(file);

        attachments.push({
          created_at: new Date().toISOString(),
          name: file.name.replaceAll(' ', '-'),
          mime_type: file.type,
          size: file.size,
          url
        });
      }

      newValue = attachments;
    }
    
    setMessage((prev) => ({
      ...prev,
      [id]: newValue
    }));
  };

  const uploadAttachments = async (message: MessageModel) => {
    if (!message.attachments.length) return message;
    const attachments = [...message.attachments];
    
    for (const [index, file] of message.attachments.entries()) {
      const formData = await getFileFormData(file, `orders/chat`);
      
      const { success, data } = await Fetch({
        method: 'POST',
        path: '/files',
        body: formData
      });
      
      attachments[index] = {
        ...file,
        url: success ? data.url : file.url
      };
    }

    return { ...message, attachments };
  };

  const handleSendOrderMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    let newMessage = {
      sender: { role, user },
      ...message
    } as MessageModel;
    
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

    newMessage = await uploadAttachments(newMessage);
    dispatch(sendMessage(newMessage));
    setSendingMessage(false);
  };

  useScrollToLastChild({
		parentRef: messagesContainerRef,
		targetSelector: '.message',
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
        <Files message={message as MessageModel} />

        <div className="controls">
          <FileUploadButton
            onChange={handleChange}
            disabled={loading}
            id="attachments"
            multiple
          />

          <Input
            placeholder="Type your message..."
            onChange={handleChange}
            value={message.text}
            size="small"
            autoFocus
            id="text"
          />
          
          <Button
            icon={<SendOutlined />}
            disabled={loading}
            htmlType="submit"
            size="small"
            rounded
          />
        </div>
      </form>
    </ChatWrapper>
  );
};

export default Chats;