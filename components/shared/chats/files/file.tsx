'use client';

import { CloseOutlined } from '@ant-design/icons';
import { Image } from 'antd';

import { Attachment, GroupedFiles, Message } from '@/types';
import useVideoThumbnail from '@/hooks/thumbnail';
import { getPreview } from './preview';
import Button from '../../button';

const File = ({ onRemove, message, file }: { onRemove?: (fileId: string) => void; message: Message; file: Attachment }) => {
  const fileType = file.mime_type.split('/')[0] as keyof GroupedFiles;
  const src = `/images/placeholder-white.webp?original=${file.url}`;
  const isVideoFile = fileType === 'video';
  const { thumbnail } = useVideoThumbnail({
    videoUrl: isVideoFile ? src : ''
  });

  const removeFile = () => onRemove?.(file.id);
  
  return (
    <div className="file-wrapper">
      <Button
        icon={<CloseOutlined />}
        className="close-btn"
        onClick={removeFile}
        type="error"
        size="small"
        rounded
      />

      <Image
        preview={getPreview(file, message)}
        src={isVideoFile ? thumbnail : src}
        fallback="Error"
        alt={file.name}
      />
    </div>
  );
};

export default File;