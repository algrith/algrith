declare module 'api' {
	interface FetchPayload {
    method?: 'DELETE' | 'PATCH' | 'POST' | 'PUT' | 'GET';
    body?: BodyInit | BaseObject | null | undefined;
    url?: string | URL | Request;
		access_token?: string;
    contentType?: string;
    isSecure?: boolean;
    path?: string;
	}
	
	interface FetchResponse {
		data: null | Array<any> | BaseObject;
		success: boolean;
		message: string;
		code: string;
	}
}