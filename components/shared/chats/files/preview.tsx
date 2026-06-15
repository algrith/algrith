import { TransformType } from 'rc-image/lib/hooks/useImageTransform';
import { ReactElement, ReactNode } from 'react';
import { ImgInfo } from 'rc-image';
import { ImageProps } from 'antd';

import { ImagePreviewWrapper } from '@/components/shared/chats/files/styled';
import { Attachment, Message } from '@/types';
import Mask from './mask';

interface Info {
  transform: TransformType;
  current: number;
  image: ImgInfo;
}

const getGroupPreview = (attachments: Array<Attachment>, isVideo = false) => {
  const toolbarRender = (toolbarRender: ReactNode) => isVideo ? null : toolbarRender;

  return {
    destroyOnClose: true,
    toolbarRender,
    imageRender: (previewImage: ReactElement, info: Info) => {
      const file = attachments[info.current] as Attachment;
      if (!file) return null;

      return (
        <ImagePreviewWrapper>
          {isVideo ? (
            <video src={`/images/placeholder-white.webp?original=${file.url}`} controls muted />
          ) : (
            previewImage
          )}
          
          <span className="file-name">
            {file.name}
          </span>
        </ImagePreviewWrapper>
      );
    }
  };
};

const getPreview = (file: Attachment, message: Message) => {
  const mask = <Mask message={message} file={file} />;
  const preview: ImageProps['preview'] = { mask };
  return preview;
};

export {
  getGroupPreview,
  getPreview
};