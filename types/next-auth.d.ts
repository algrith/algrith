import NextAuth, { AuthError, DefaultSession, DefaultUser, RequestInternal } from 'next-auth';
import { BaseObject, UserProfile, UserQuota } from '@/types';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		isFirstLogin: boolean;
		refreshToken?: string;
		accessToken?: string;
		user: {
			authProvider: 'google' | 'email';
			firstName: string;
			location?: string;
			lastName: string;
			userName: string;
			company?: string;
			photo?: string;
			id: string;
		} & DefaultSession['user']
	}

	interface User extends DefaultUser {
		authProvider: 'google' | 'email';
		isFirstLogin?: boolean;
		refreshToken?: string;
		accessToken?: string;
		error?: BaseObject;
		firstName?: string;
		lastName?: string;
		userName?: string;
		location?: string;
		company?: string;
		photo?: string;
	}
	
	interface AuthResponse {
		success: boolean;
		message: string;
		data: {
			is_first_time_login: boolean;
		  response_code: string;
		  profile: UserProfile;
      quota: UserQuota;
		  token: {
				refresh_token: string;
				access_token: string;
		  };
		}
	};	  
};

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		isFirstSocialLogin?: boolean;
		isFirstLogin?: boolean;
		refreshToken?: string;
		accessToken?: string;
		user: User;
	}
};