'use client';

import { UploadProps as AntUploadProps, UploadFile, Upload, InputLabelProps } from 'antd';
import Dragger, { DraggerProps } from 'antd/es/upload/Dragger';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ChangeEvent, useRef, useState } from 'react';

import { FileUploadWrapper, LabelWrapper } from './styled';
import { FileUploadButtonProps } from '@/types';
import Button from '../button';

interface UploadProps extends Omit<AntUploadProps, 'onChange' | 'onRemove'>, InputLabelProps {
  onChange?: (e: ChangeEvent<Element>) => void;
  onRemove?: (file: UploadFile) => void;
  multiple?: boolean;
}

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
        id={props.id}
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

const FileUpload = (props: UploadProps) => {
  const { accept = '*', onChange, onRemove, multiple = false, required, label, size, ...rest } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const format = accept.replaceAll('.', '').toUpperCase();
  const showFormat = format && format !== '*';
  const isFiles = Boolean(fileList.length);
  const id = props.id ?? '';
  
  const handleChange: DraggerProps['onChange'] = (info) => {
    const data = props.multiple ? info.fileList : info.fileList.slice(0, 1);
    setFileList(data);
    onChange?.({
      target: {
        value: data,
        id
      }
    } as unknown as ChangeEvent<Element>);
  };

  const handleRemove = (file: UploadFile) => {
    const files = fileList.filter(({ uid }) => uid !== file.uid);
    const data = props.multiple ? files : files.slice(0, 1);
    if (onRemove) onRemove(file);
    setFileList(data);
    onChange?.({
      target: {
        value: data,
        id
      }
    } as unknown as ChangeEvent<Element>);
  };

  return (
    <FileUploadWrapper>
      {label && (
        <LabelWrapper className={required ? 'required' : ''} id={rest.id}>
          {label}
        </LabelWrapper>
      )}

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

export default FileUpload;
