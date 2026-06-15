import { CloseOutlined } from '@ant-design/icons';
import { MouseEvent, useState } from 'react';
import { Avatar } from 'antd';

import { DocumentWrapper } from '@/components/shared/chats/files/styled';
import FileIcon from '@/components/shared/chats/files/icon';
import { useAppDispatch } from '@/store/hooks';
import { Attachment, Message } from '@/types';
import { formatFileSize } from '@/utils';
import Button from '../../button';
import Mask from './mask';

const Document = (props: { onRemove?: (fileId: string) => void; message: Message; file: Attachment }) => {
  const [showMask, setShowMask] = useState(false);
  const { onRemove, message, file } = props;
  const dispatch = useAppDispatch();

  const selectFile = (file: Attachment) => (e: MouseEvent) => {
    // open modale to view file
  };

  const toggleMask = () => setShowMask(!showMask);
  const removeFile = () => onRemove?.(file.id);

  return (
    <DocumentWrapper
      onClick={selectFile(file)}
      onMouseEnter={toggleMask}
      onMouseLeave={toggleMask}
      className="file-wrapper"
      href={undefined}
    >
      <Button
        icon={<CloseOutlined />}
        className="close-btn"
        onClick={removeFile}
        type="error"
        size="small"
        rounded
      />
      
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