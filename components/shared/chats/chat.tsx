'use client';

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { createOrderConversation, fetchMessages, sendMessage, deliverOrder } from './slices';
import { resetMessage, setMessage, setMessages, updateMessage } from './reducer';
import { Attachment, Message as MessageModel, OrderModel } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useScrollToLastChild from '@/hooks/scroll-to-view';
import { TextArea } from '@/components/shared/input';
import { getFileFormData, randomId } from '@/utils';
import { useSocketContext } from '../layout/context';
import { FileUploadButton } from '../input/file';
import Button from '@/components/shared/button';
import { EmptyWrapper } from '../layout/styled';
import useClassName from '@/hooks/class-name';
import { ChatWrapper } from './styled';
import { Fetch } from '@/utils/api';
import Link from '../button/link';
import Metadata from './metadata';
import Message from './message';
import Files from './files';

const Chat = () => {
  const { profile: { data: authUser } } = useAppSelector((state) => state.dashboard);
  const { message, ...chat } = useAppSelector((state) => state.chat);
  const { loading, list: messages } = chat.messages;
  const { data: conversation } = chat.conversation;
  const [isTyping, setTyping] = useState(false);
  const isFiles = message.attachments?.length;
  const messagesContainerRef = useRef(null);
  const role = authUser?.role || 'customer';
  const socket = useSocketContext();
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
    if (isTyping) socket?.emit(`typing:stop`, conversation?.id);
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
      socket?.emit(`typing:stop`, conversation?.id);
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

export default Chat;