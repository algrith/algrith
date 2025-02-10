declare module 'api' {
	interface FetchPayload {
    method?: 'DELETE' | 'PATCH' | 'POST' | 'PUT' | 'GET';
    body?: BodyInit | BaseObject | null | undefined;
    url?: string | URL | Request;
    shouldStringify?: boolean;
    isExternalApi?: boolean;
    removeToken?: boolean;
    contentType?: string;
    accessToken?: string;
    path?: string;
	}
	
	interface FetchResponse {
		data: null | Array<any> | BaseObject;
		success: boolean;
		message: string;
	}
}