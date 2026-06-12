import { Fragment, useEffect, useState } from 'react';
import { Image } from 'antd';

import GroupHeader from '@/components/shared/chats/files/group-header';
import { Attachment, GroupedFiles, Message } from '@/types';
import { getGroupPreview, getPreview } from './preview';
import { ChatFilesWrapper } from './styled';
import Document from './document';
import VideoFile from './video';

const { PreviewGroup } = Image;

const Files = (props: { message: Message; inMessage?: boolean; }) => {
  const [groupedFiles, setGroupedFiles] = useState<GroupedFiles>({});
  const hasMultipleGroups = Object.keys(groupedFiles).length > 1;
  const { inMessage = false, message } = props;
  const files = message?.attachments ?? [];

  const getNonDocumentFileClassName = (isMultipleFiles = false) => {
    const layout = isMultipleFiles ? 'double-view' : 'single-file';
  
    return [
      inMessage ? 'in-message' : '',
      inMessage ? layout : '',
      'images files'
    ].join(' ')
    .trim();
  };
  
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
    <ChatFilesWrapper>
      {Object.entries(groupedFiles).map(([groupType, files]) => (
        <Fragment key={groupType}>
          {groupType === 'document' && (
            <div className="group">
              <GroupHeader
                hasMultipleGroups={hasMultipleGroups}
                pluralize={files.length > 1}
                groupType={groupType}
              />

              <div className="documents files">
                {files.map((file: Attachment) => (
                  <Document
                    message={message}
                    key={file.url}
                    file={file}
                  />
                ))}
              </div>
            </div>
          )}
          
          {groupType === 'video' && (
            <div className="group">
              <GroupHeader
                hasMultipleGroups={hasMultipleGroups}
                pluralize={files.length > 1}
                groupType="video"
              />
              
              <div className={getNonDocumentFileClassName(files.length > 1)}>
                <PreviewGroup preview={getGroupPreview(message, true)}>
                  {files.map((file: Attachment) => (
                    <VideoFile
                      message={message}
                      key={file.url}
                      file={file}
                    />
                  ))}
                </PreviewGroup>
              </div>
            </div>
          )}

          {groupType === 'image' && (
            <div className="group">
              <GroupHeader
                hasMultipleGroups={hasMultipleGroups}
                pluralize={files.length > 1}
                groupType={groupType}
              />
              
              <div className={getNonDocumentFileClassName(files.length > 1)}>
                <PreviewGroup preview={getGroupPreview(message)}>
                  {files.map((file: Attachment) => (
                    <Image
                      src={`/images/placeholder-white.webp?original=${file.url}`}
                      preview={getPreview(file, message)}
                      alt={file.name}
                      key={file.url}
                    />
                  ))}
                </PreviewGroup>
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </ChatFilesWrapper>
  );
};

export default Files;