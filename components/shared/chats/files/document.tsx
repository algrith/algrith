
import { MouseEvent, useState } from 'react';
import { Avatar } from 'antd';

import { DocumentWrapper } from '@/components/shared/chats/files/styled';
import FileIcon from '@/components/shared/chats/files/icon';
import { useAppDispatch } from '@/store/hooks';
import { Attachment, Message } from '@/types';
import { formatFileSize } from '@/utils';
import Mask from './mask';

const Document = ({ message, file }: { message: Message; file: Attachment }) => {
  const [showMask, setShowMask] = useState(false);
  const dispatch = useAppDispatch();

  const selectFile = (file: Attachment) => (e: MouseEvent) => {
    // open modale to view file
  };

  const toggleMask = () => setShowMask(!showMask);

  return (
    <DocumentWrapper onClick={selectFile(file)} onMouseEnter={toggleMask} onMouseLeave={toggleMask} href={undefined}>
      <span className="file-icon-wrapper">
        <Avatar src={<FileIcon file={file} />} shape="square" />
      </span>
      
      <div className="details">
        <span>{file.name}</span>
        <span>{formatFileSize(file.size)}</span>
      </div>
      
      {showMask && <Mask message={message} file={file} />}
    </DocumentWrapper>
  );
};

export default Document;