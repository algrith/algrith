'use server';

import { Storage } from '@google-cloud/storage';

interface GCSFilePayload {
  byteArray: Uint8Array | null;
  url: string | null;
  blob: Blob | null;
}

const bucket = process.env.GCS_BUCKET_NAME as string;

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GCS_CLIENT_EMAIL
  }
});

export const getFileKeyFromUrl = async (fileUrl: string): Promise<string> => {
  const url = new URL(fileUrl);
  return url.pathname.slice(1).replace(`${bucket}/`, '');
};

export const getSignedFileUrl = async (fileUrl: string): Promise<string> => {
  if (!fileUrl) return '';

  const key = await getFileKeyFromUrl(fileUrl);

  try {
    const [url] = await storage.bucket(bucket).file(key).getSignedUrl({
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000, // 1 hour
    });
    return url;
  } catch (error) {
    console.error('Error getting signed URL:', error);
    return '';
  }
};

export const getFile = async (fileUrl: string): Promise<GCSFilePayload> => {
  const key = await getFileKeyFromUrl(fileUrl);

  let payload: GCSFilePayload = { byteArray: null, blob: null, url: null };

  try {
    const [buffer] = await storage.bucket(bucket).file(key).download();
    const byteArray = new Uint8Array(buffer);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    payload = { byteArray, blob, url };
  } catch (error) {
    console.error('Error fetching file:', error);
  }

  return payload;
};

export const uploadFile = async (formData: FormData): Promise<string> => {
  if (!formData) throw new Error('formData parameter is required.');

  try {
    const fileName = formData.get('fileName') as string;
    const dirName = formData.get('dirName') as string;
    const file = formData.get('file') as File;
    console.log('FILEY: ', file);
    

    const buffer = Buffer.from(await file.arrayBuffer());
    const baseName = fileName.replace(/\.[^/.]+$/, '');
    const ext = file.type.split(';')[0].split('/')[1];
    const key = `${dirName}/${baseName}.${ext}`;

    const bucketFile = storage.bucket(bucket).file(key);

    await bucketFile.save(buffer, {
      resumable: file.size > 5 * 1024 * 1024,
      contentType: file.type,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    return `https://storage.googleapis.com/${bucket}/${key}`;
  } catch (error) {
    console.error('An error occurred while uploading file --> ', error);
    return '';
  }
};

export const deleteFile = async (key: string): Promise<boolean> => {
  try {
    await storage.bucket(bucket).file(key).delete();
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

export const fileExists = async (key: string): Promise<boolean> => {
  try {
    const [exists] = await storage.bucket(bucket).file(key).exists();
    return exists;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
};