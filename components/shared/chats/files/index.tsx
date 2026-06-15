import { useEffect, useState } from 'react';
import { Image } from 'antd';

import GroupHeader from '@/components/shared/chats/files/group-header';
import { Attachment, GroupedFiles, Message } from '@/types';
import { getGroupPreview } from './preview';
import { ChatFilesWrapper } from './styled';
import Document from './document';
import File from './file';

const { PreviewGroup } = Image;

const Files = (props: { onRemove?: (fileId: string) => void; message: Message; inMessage?: boolean; }) => {
  const [groupedFiles, setGroupedFiles] = useState<GroupedFiles>({});
  const hasMultipleGroups = Object.keys(groupedFiles).length > 1;
  const { inMessage = false, onRemove, message } = props;
  const files = message?.attachments ?? [];

  const getFilesClassName = (files: Array<Attachment>, groupType: string) => {
    const fileLength = files.length;
    let layout = '';

    if (groupType !== 'document') {
      if (inMessage) {
        layout = fileLength > 1 ? 'double-view' : 'single-view';
      } else {
        if (fileLength === 2) layout = 'double-view';
        if (fileLength === 1) layout = 'single-view';
      }
    }

    return [layout, groupType, 'files'].join(' ').trim();
  };

  const handleFileRemoval = (fileId: string) => () => onRemove?.(fileId)
  
  const groupFiles = () => {
    const groupedFiles: GroupedFiles = {};

    for (const file of files) {
      const fileType = file.mime_type.split('/')[0] as keyof GroupedFiles;
      const nonDocumentGroups = ['video', 'image'];
      const newFile = { ...file };
      
      const groupKey = nonDocumentGroups.includes(fileType) ? fileType : 'document';
      if (!groupedFiles[groupKey]) groupedFiles[groupKey] = [];
      groupedFiles[groupKey].push(newFile);
    }

    setGroupedFiles(groupedFiles);
  };

  useEffect(() => {
    groupFiles();
  }, [files]);

  if (!files?.length) return null;

  return (
    <ChatFilesWrapper className={inMessage ? 'in-message' : ''}>
      {Object.entries(groupedFiles).map(([groupType, files]) => (
        <div className={`${groupType} group`} key={groupType}>
          <GroupHeader
            groupType={groupType as keyof GroupedFiles}
            hasMultipleGroups={hasMultipleGroups}
            pluralize={files.length > 1}
          />
          
          <div className={getFilesClassName(files, groupType)}>
            {groupType === 'document' ? (
              files.map((file: Attachment) => (
                <Document
                  onRemove={handleFileRemoval(file.id)}
                  message={message}
                  key={file.url}
                  file={file}
                />
              ))
            ) : (
              <PreviewGroup preview={getGroupPreview(files, groupType === 'video')}>
                {files.map((file: Attachment) => (
                  <File
                    onRemove={handleFileRemoval(file.id)}
                    message={message}
                    key={file.url}
                    file={file}
                  />
                ))}
              </PreviewGroup>
            )}
          </div>
        </div>
      ))}
    </ChatFilesWrapper>
  );
};

export default Files;