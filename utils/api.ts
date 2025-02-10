import { getSession, signOut } from 'next-auth/react';

import { FetchPayload, FetchResponse } from 'api';

export const Fetch = async ({
  contentType = 'application/json',
  isExternalApi = false,
  removeToken = false,
  body = undefined,
  method = 'GET',
	path,
  url,
}: FetchPayload) => {
	if (!url && !path) throw new Error('One of url or path parameters must be provided');
	const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api${path}`;
  const session = await getSession();
  
  const config: RequestInit = {
    headers: {
      Authorization: !removeToken ? `Bearer ${session?.accessToken}` : '',
      'Content-Type': contentType,
    },
    redirect: 'follow',
    cache: 'no-cache',
    mode: 'cors',
    method,
  };

  if (!['DELETE', 'GET'].includes(method)) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url ?? apiUrl, config);

    const data = await response.json();

    if (!response.ok) {
      const isExpiredTokenError = ['authentication_failed', 'token_not_valid'].includes(data?.data?.response_code);
      console.error(data.message, response.status);
      
      if (isExpiredTokenError) {
        localStorage.intendedRoute = location.pathname;
        signOut({ callbackUrl: '/auth' }).finally(() => {
          // Perform any reset here
        });
      }
    }

    if (isExternalApi) return data;

    return data as FetchResponse;
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      // JSON parsing error
      console.error('JSON parsing error:', error.message);
    } else if (error instanceof TypeError) {
      // Network error or CORS issue
      console.error('Network error:', error.message);
    } else if (error instanceof Error) {
      // Other types of errors
      console.error('Other error:', error.message);
    } else {
      // Catch-all for other types of errors
      console.error('Unknown error:', error);
    }

    return {
      message: error?.message ?? 'An error occurred',
      success: false,
      data: null,
    };
  }
};