import { FetchPayload, FetchResponse } from 'api';

export const Fetch = async (props: FetchPayload): Promise<FetchResponse | any> => {
  const {
    contentType = 'application/json',
    isExternalApi = false,
    body = undefined,
    method = 'GET',
    path,
    url,
  } = props;

	if (!url && !path) throw new Error('One of url or path parameters must be provided');
	const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api${path}`;

  const config: RequestInit = {
    headers: {
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

    if (!response.ok) console.error(data.message, response.status);

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
    } as FetchResponse;
  }
};