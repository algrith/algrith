'use client';

import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import { ChangeEvent, useEffect, useState } from 'react';
import { AvatarProps, Avatar } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showFeedback } from '../feedback/reducer';
import { FileUploadButton } from '../input/file';
import { FileUploadButtonProps } from '@/types';
import useClassName from '@/hooks/class-name';
import { AvatarContainer } from './styled';
import { Spinner } from '../icon/spinner';
// import { uploadFile } from '@/utils/aws';
import { filterObject } from '@/utils';

const UserAvatar = (props: AvatarProps) => {
  const { user, model } = useAppSelector((state) => state.auth);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const { canUploadProfilePhoto, size = 'small' } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [photo, setPhoto] = useState(user?.image);
  const userAvatar = model.image || user?.image;
  const initial = user?.name?.[0]?.toUpperCase();
  const dispatch = useAppDispatch();
  const isLoading = isUploading;

  const avatarProps = filterObject({
    filters: ['canUploadProfilePhoto'],
    target: props
  });

  const className = useClassName([
    (props?.size as string) ?? 'small',
    props.className ?? ''
  ]);

  const uploadProfilePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileName = user?.name?.replaceAll(' ', '-') ?? '';
    const input = event.target as HTMLInputElement;
    const maxSizeInBytes = 1 * 1024 * 1024;
    const file = input?.files?.[0];
    input.files = null;
    if (!file) return;

    if (file.size > maxSizeInBytes) {
      return dispatch(
        showFeedback({
          message: 'Oops! File too large — please upload an image smaller than 1MB (JPG or PNG).',
          feedbackType: 'alert',
          type: 'error'
        })
      );
    }

    setUploadedFileUrl(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      // const url = await uploadFile({ dirName: 'account-profile-photos', formData, fileName });
      // dispatch(updateUserModel({ avatar: url }));
      // dispatch(updateUserProfile());
    } catch (error) {
      console.error('User avatar upload error: ', error);
      dispatch(
        showFeedback({
          message: 'Upload failed. Please retry or contact support at support@propulse.app',
          feedbackType: 'alert',
          type: 'error'
        })
      );
    }

    setIsUploading(false);
  };

  useEffect(() => {
    setPhoto(uploadedFileUrl || userAvatar);
  }, [userAvatar]);

  return (
    <AvatarContainer className={className}>
      <Avatar
        {...avatarProps}
        icon={isLoading && <Spinner color="white" />}
        className={!photo ? 'add-background' : ''}
        src={(!isLoading && photo) || undefined}
      >
        {initial ?? <UserOutlined />}
      </Avatar>

      {canUploadProfilePhoto && (
        <FileUploadButton
          onChange={uploadProfilePhoto as FileUploadButtonProps['onChange']}
          icon={<CameraOutlined />}
          className="upload-icon"
          accept="image/*"
        />
      )}
    </AvatarContainer>
  );
};

export default UserAvatar;
