'use client';

import { CheckOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { User } from 'next-auth';
import { Avatar } from 'antd';

import { Message as MessageModel } from '@/types';
import { useAppSelector } from '@/store/hooks';
import { MessageWrapper } from './styled';
import Presence from '../layout/presence';
import { getDateFormat } from '@/utils';
import Files from './files';

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
          {!isSender && <h3>{sender.name} <Presence userId={sender.id as string} small /></h3>}

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

export default Message;