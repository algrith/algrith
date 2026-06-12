import { Image } from 'antd';

import useVideoThumbnail from '@/hooks/thumbnail';
import { Attachment, Message } from '@/types';
import { getPreview } from './preview';

const VideoFile = (props: { message: Message; file: Attachment }) => {
  const { message, file } = props;

  const { thumbnail } = useVideoThumbnail({
    videoUrl: `/images/placeholder-white.webp?original=${file.url}`
  });
  
  return (
    <Image
      preview={getPreview(file, message)}
      fallback="Error"
      alt={file.name}
      src={thumbnail}
    />
  );
};

export default VideoFile;