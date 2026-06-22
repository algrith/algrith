'use client';

import { ArrowsAltOutlined, CaretLeftOutlined, CheckOutlined, CloseOutlined, ExclamationCircleOutlined, MinusOutlined, PaperClipOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Avatar, Badge, Spin, Switch, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { Socket } from 'socket.io-client';
import { User } from 'next-auth';

import { resetMessage, setConversation, setMessage, setMessages, setShowConversations, setShowOrdersModal, updateMessage } from './reducer';
import { createOrderConversation, fetchMessages, fetchConversations, sendMessage, deliverOrder, setupOrderChat } from './slices';
import { Attachment, Conversation as ConversationModel, Message as MessageModel, OrderModel } from '@/types';
import { ChatsWrapper, ChatWrapper, MessageWrapper, ConversationWrapper, MetadataWrapper } from './styled';
import { getDateFormat, getFileFormData, randomId } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useScrollToLastChild from '@/hooks/scroll-to-view';
import { EmptyWrapper, Overlay } from '../layout/styled';
import { TextArea } from '@/components/shared/input';
import { FileUploadButton } from '../input/file';
import Button from '@/components/shared/button';
import useClassName from '@/hooks/class-name';
import OrdersModal from './modals/orders';
import Prompt from '../feedback/prompt';
import useSocket from '@/hooks/socket';
import useRoute from '@/hooks/route';
import { Fetch } from '@/utils/api';
import Link from '../button/link';
import Files from './files';

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
    // Update conversation index in case
    // of deletion, reordering, etc.
    dispatch(setConversation({ index }));
  }, [index]);

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

const Message = ({ message }: { message: MessageModel }) => {
  const { profile: { data: authUser } } = useAppSelector((state) => state.dashboard);
  const sender = (message.sender.user as User);
  const isSender = sender?.id === authUser?.id;
  
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

const Chat = ({ socket }: { socket: Socket | null }) => {
  const { profile: { data: authUser } } = useAppSelector((state) => state.dashboard);
  const { message, ...chat } = useAppSelector((state) => state.chat);
  const { loading, list: messages } = chat.messages;
  const { data: conversation } = chat.conversation;
  const [isTyping, setTyping] = useState(false);
  const isFiles = message.attachments?.length;
  const messagesContainerRef = useRef(null);
  const role = authUser?.role || 'customer';
  const dispatch = useAppDispatch();
  const disabled = !authUser;

  const className = useClassName([
    isFiles ? 'has-files' : '',
    'input'
  ]);

  const uploadAttachments = async (message: MessageModel) => {
    const attachments = message.attachments.map((file): Attachment => ({
      ...file,
      status: 'uploading'
    }));

    dispatch(updateMessage({
      ...message,
      attachments: [...attachments]
    }));

    let successful = true;
    
    for (const [index, file] of attachments.entries()) {
      const formData = await getFileFormData(file, `orders/chat`);

      const { success, data } = await Fetch({
        method: 'POST',
        path: '/files',
        body: formData
      });

      if (!success) successful = false;

      attachments[index] = {
        ...file,
        status: success ? 'uploaded' : 'failed',
        url: success ? data.url : file.url
      };

      dispatch(updateMessage({
        ...message,
        attachments: [...attachments]
      }));
    }

    return successful ? { ...message, attachments } : undefined;
  };

  const handleSendOrderMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!authUser) return;

    let newMessage = {
      sender: { role, user: authUser },
      ...message
    } as MessageModel;
    
    dispatch(resetMessage());
    
    dispatch(setMessages({
      list: [
        ...messages,
        newMessage
      ]
    }));

    if (isFiles) {
      const updatedMessage = await uploadAttachments(newMessage);
      if (updatedMessage) newMessage = updatedMessage;
    }

    if (!newMessage) return;

    if (newMessage.metadata?.order_status_info) return dispatch(deliverOrder(newMessage));

    if (conversation?.id === 'NEW_CONVERSATION') {
      const customerId = (!['moderator', 'admin'].includes(role) ? authUser.id : '') as string;
      return await dispatch(createOrderConversation(
        (conversation.order as OrderModel).id,
        customerId,
        newMessage
      ));
    }
    
    dispatch(sendMessage(newMessage));
  };

  const handleChange = (e: ChangeEvent<HTMLElement>) => {
    const { files, value, id } = e.target as HTMLInputElement;
    let newValue = value as string | Array<Attachment>;

    if (id === 'text' && value && !isTyping) setTyping(true);

    if (id === 'attachments' && files) {
      const attachments = [...(message?.attachments || [])];

      for (const file of files) {
        const url = URL.createObjectURL(file);

        attachments.push({
          created_at: new Date().toISOString(),
          name: file.name.replaceAll(' ', '-'),
          mime_type: file.type,
          status: 'pending',
          size: file.size,
          id: randomId(),
          url
        });
      }

      newValue = attachments;
    }
    
    dispatch(setMessage({
      [id]: newValue
    }));
  };

  const removeFile = (fileId: string) => {
    const attachments = message.attachments?.filter((file) => file.id !== fileId);
    dispatch(setMessage({ attachments }));
  };

  const handleBlur = () => {
    socket?.emit(`typing:stop`, conversation?.id);
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

  useEffect(() => {
    if (!isTyping) return;

    socket?.emit(`typing:start`, conversation?.id);
    setTimeout(() => {
      setTyping(false);
    }, 10000);
  }, [isTyping]);
  
  return (
    <ChatWrapper className={loading ? 'loading' : ''} ref={messagesContainerRef}>
      <div className="messages">
        {loading ? (
          <Spin />
        ) : disabled ? (
          <EmptyWrapper>
            Your session has expired.
            <br />
            <Link type="primary" href="/auth" size="small" asButton>
              Login
            </Link>
          </EmptyWrapper>
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

      <form onSubmit={handleSendOrderMessage} className={className}>
        <Files onRemove={removeFile} message={message as MessageModel} />
        <Metadata />

        <div className="controls">
          <FileUploadButton
            onChange={handleChange}
            disabled={disabled}
            id="attachments"
            multiple
          />
          
          <TextArea
            placeholder="Type your message..."
            onChange={handleChange}
            value={message.text}
            onBlur={handleBlur}
            size="small"
            autoFocus
            id="text"
            autoSize
            rows={1}
          />
          
          <Button
            icon={<SendOutlined />}
            disabled={disabled}
            htmlType="submit"
            size="small"
            rounded
          />
        </div>
      </form>
    </ChatWrapper>
  );
};

const Metadata = () => {
  const { profile: { data: authUser } } = useAppSelector((state) => state.dashboard);
  const { message, typing, ...chat } = useAppSelector((state) => state.chat);
  const { data: conversation } = chat.conversation;
  const order = conversation?.order as OrderModel;
  const isFiles = message.attachments?.length;
  const { type } = conversation ?? {};
  const dispatch = useAppDispatch();
  
  const canDeliverOrder = type === 'order' && order?.status === 'pending';
  const isTyping = typing && conversation?.id === typing.conversationId;
  const canCloseCase = type === 'support';

  const markOrderAsDelivered = () => {
    const newMessage = { ...message };
    if ('metadata' in message) delete newMessage['metadata'];
    else newMessage.metadata = {
      order_status_info: `Order delivered by ${authUser?.email}`
    };

    dispatch(setMessage(newMessage));
  };

  if (authUser?.role !== 'admin' || (!canDeliverOrder && !canCloseCase)) return null;

  return (
    <MetadataWrapper className={isTyping ? 'typing' : ''}>
      {isTyping && (
        <small className="typing-indicator">
          {typing?.participant || 'User'} is typing...
        </small>
      )}
      
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
      
      {/* {(type === 'support') && ()} */}
    </MetadataWrapper>
  );
};

const Chats = () => {
  const { profile: { data: authUser }, order: { data: order } } = useAppSelector((state) => state.dashboard);
  const { showConversations, showOrdersModal, ...rest } = useAppSelector((state) => state.chat);
  const { list: conversations, total_unread, loading } = rest.conversations;
  const { data: conversation } = rest.conversation;
  const dispatch = useAppDispatch();
  const { routes } = useRoute();
  const socket = useSocket();
  
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
            <Chat socket={socket} />
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