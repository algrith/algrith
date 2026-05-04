'use client';

import { UploadProps, UploadFile, Upload } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { useRef, useState } from 'react';

import { FileUploadButtonProps } from '@/types';
import { FileUploadWrapper } from './styled';
import Button from '../button';

const FileUpload = (props: UploadProps & { multiple?: boolean }) => {
  const { accept = '*', onUpload, onRemove, multiple = false, required, label, size, ...rest } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const isFiles = Boolean(fileList.length);

  const format = accept.replaceAll('.', '').toUpperCase();
  const showFormat = format && format !== '*';
  
  const handleChange: UploadProps['onChange'] = (info) => {
    const data = props.multiple ? info.fileList : info.fileList.slice(0, 1);
    if (onUpload) onUpload(data);
    setFileList(data);
  };

  const handleRemove = (file: UploadFile) => {
    const files = fileList.filter(({ uid }) => uid !== file.uid);
    const data = props.multiple ? files : files.slice(0, 1);
    if (onUpload) onUpload(data);
    if (onRemove) onRemove(file);
    setFileList(data);
  };

  return (
    <FileUploadWrapper>
      {/* {label && (
        <label
          floatLabel={floatLabel}
          required={required}
          label={label}
          id={rest.id}
          size={size}
        />
      )} */}

      {isFiles ? (
        <Upload defaultFileList={fileList} onRemove={handleRemove} listType="picture" />
      ) : (
        <Dragger
          {...rest}
          beforeUpload={() => false}
          onChange={handleChange}
          showUploadList={false}
          multiple={multiple}
          accept={accept}
        >
          <p className="icon">
            <CloudUploadOutlined />
          </p>

          <p className="hint-text">Click to upload or drag and drop</p>

          {showFormat && (
            <p className="format-text">
              Supported file formats {format}.
            </p>
          )}
        </Dragger>
      )}
    </FileUploadWrapper>
  );
};

export const FileUploadButton = (props: FileUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        multiple={props.multiple || false}
        accept={props.accept || '*'}
        style={{ display: 'none' }}
        onChange={props.onChange}
        onClick={props.onClick}
        ref={fileInputRef}
        type="file"
      />

      <Button
        onClick={() => fileInputRef?.current?.click()}
        icon={props.icon ?? <CloudUploadOutlined />}
        htmlType={props.htmlType || 'button'}
        rounded={props.rounded ?? true}
        className={props.className}
      >
        {props.children}
      </Button>
    </>
  );
};

export default FileUpload;
