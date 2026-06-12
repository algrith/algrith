import { EyeFilled, LoadingOutlined, PictureFilled, RedoOutlined, YoutubeFilled } from '@ant-design/icons';
import { MouseEvent } from 'react';

import { MaskWrapper } from '@/components/shared/chats/files/styled';
import { useAppDispatch } from '@/store/hooks';
// import { retryFileUpload } from '../../slices';
import useClassName from '@/hooks/class-name';
import { Attachment, Message } from '@/types';
import { formatFileSize } from '@/utils';

const Mask = (props: { message: Message; file: Attachment }) => {
  const { message, file } = props;

  // const showPreviewAction = ['uploaded', 'pending'].includes(file.status);
  const isVideo = file.mime_type.startsWith('video/');
  const isImage = file.mime_type.startsWith('image/');
  const isDocument = !isImage && !isVideo;
  const size = formatFileSize(file.size);
  const dispatch = useAppDispatch();
  
  const actionClassName = useClassName([
    // !showPreviewAction ? 'icon-only' : '',
    'action'
  ]);

  // const actionIcon = {
  //   uploading: <LoadingOutlined />,
  //   failed: <RedoOutlined />,
  //   uploaded: <EyeFilled />,
  //   pending: <EyeFilled />
  // }[file.status];

  const handleRetry = (e: MouseEvent) => {
    // if (file.status === 'failed' && message) {
    //   e.stopPropagation();
    //   e.preventDefault();

    //   dispatch(retryFileUpload(message, file));
    // }
  };
  
  return (
    <MaskWrapper className={isDocument ? 'document-file' : ''} onClick={handleRetry}>
      <span className={actionClassName}>
        {/* {actionIcon} */}
        {/* {showPreviewAction && 'Preview'} */}
      </span>

      {isVideo && <span className="mime-type-icon"><YoutubeFilled /></span>}
      {isImage && <span className="mime-type-icon"><PictureFilled /></span>}
      {!isDocument && <small className="file-size">{size}</small>}
    </MaskWrapper>
  );
};

export default Mask;