import { authorization } from '@/middleware';
import { NextRequest } from 'next/server';
import { uploadFile } from '@/utils/gcs';

export const POST = authorization(async (req: NextRequest) => {
  const formData = await req.formData();
  
  try {
    const url = await uploadFile(formData);
    
    return Response.json({
      message: 'File uploaded successfully.',
      code: 'file_upload_successful',
      success: true,
      data: { url }
    });
  } catch (error) {
    console.error('Error uploading file --> ', error);

    return Response.json({
      message: 'Server error.',
      code: 'server_error',
      success: false,
      data: null
    }, { status: 500 });
  }
});