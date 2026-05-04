import { getSession, signOut } from 'next-auth/react';
import { FetchPayload, FetchResponse } from 'api';

export const Fetch = async (props: FetchPayload) => {
  const { contentType, isSecure = true, body = undefined, method = 'GET', path, url } = props;
	if (!url && !path) throw new Error('One of url or path parameter must be provided');
  const accessToken = isSecure ? (await getSession() || props)?.access_token : null;
	const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  
  let json: FetchResponse = {
    message: 'An error occurred',
    code: 'unknow_error',
    success: false,
    data: null
  };

  const config = {
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      'Content-Type': contentType ?? 'application/json'
    },
    redirect: 'follow',
    cache: 'no-cache',
    mode: 'cors',
    method,
  } as RequestInit;

  if (!['DELETE', 'GET'].includes(method)) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url ?? apiUrl, config);
    const data = await response.json();
    const success = response.ok;

    if (!success) {
      const isExpiredTokenError = ['token_invalid', 'token_not_valid'].includes(data?.code);
      console.error(`API Client: ${response.status} --> `, data.message ?? data);
      const isUserNotFoundError = data?.errors?.code === 'user_not_found';
      
      if (accessToken && (isExpiredTokenError || isUserNotFoundError)) {
        localStorage.lastVisitedRoute = location.pathname;
        signOut({ redirectTo: '/auth' });
      }
    }

    if (url) {
      json.message = data.message ?? (`Operation ${success ? 'successful' : 'failed'}`);
      json.code = success ? 'okay' : 'failed';
      json.success = success;
      json.data = data;
    } else {
      json = data;
    }
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

    json.message = error?.message ?? 'An error occurred';
  }

  return json;
};