import NextAuth, { AuthError, DefaultSession, DefaultUser, RequestInternal } from 'next-auth';
import { BaseObject, UserProfile, UserQuota } from '@/types';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		refresh_token?: string;
		access_token?: string;
		user: {
			auth_provider: 'google' | 'email';
			location?: string;
			company?: string;
			photo?: string;
			id: string;
		} & DefaultSession['user']
	}

	interface User extends DefaultUser {
		auth_provider: 'google' | 'email';
		refresh_token?: string;
		access_token?: string;
		error?: BaseObject;
		location?: string;
		company?: string;
		photo?: string;
	}
};

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		refresh_token?: string;
		access_token?: string;
		user: User;
	}
};