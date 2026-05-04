import NextAuth, { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { CredentialsSignin } from '@auth/core/errors';
import Google from 'next-auth/providers/google';
import { Provider } from 'next-auth/providers';
import { decodeJwt } from 'jose';

import { BaseObject, OAuthProvider } from '@/types';
import { inProduction } from '@/utils';
import { Fetch } from '@/utils/api';

class ConflictingProviderError extends CredentialsSignin {
  message = 'OAuth user verification  due to conflicting provider.';
  code = 'conflicting_provider';
  static type = 'Verification';
}

class DeactivatedAccountError extends CredentialsSignin {
  message = 'This account has been deactivated.';
  code = 'account_inactive';
}

class CredentialsSignInError extends CredentialsSignin {
  message = 'Invalid login credentials provided.';
  code = 'invalid_credentials';
}

class UnverifiedAccountError extends CredentialsSignin {
  message = 'Please verify your account to sign in.';
  code = 'email_not_verified';
}

class OAuthSignInError extends CredentialsSignin {
  message = 'OAuth user verification failed.';
  static type = 'Verification';
  code = 'verification_failed';
}

const providers: Provider[] = [
  Credentials({
    authorize: async (credentials: BaseObject) => {
      if (!(credentials?.email && credentials?.password)) throw new CredentialsSignInError();

      const { success, code, data } = await Fetch({
        path: `/users/login`,
        body: credentials,
        isSecure: false,
        method: 'POST'
      });
      
      if (!success) {
        console.log('Credentials auth failed with response code --> ', code);
        if (code === 'email_not_verified') throw new UnverifiedAccountError();
        if (code === 'account_inactive') throw new DeactivatedAccountError();
        throw new CredentialsSignInError();
      }
      
      console.log('Credentials auth successful --> ', data?.user);

      return {
        ...(data?.token ?? {}),
        ...(data?.user ?? {}),
        auth_method: 'email',
      } satisfies User;
    }
  }),
  Google({
    clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    clientId: process.env.AUTH_GOOGLE_CLIENT_ID
  })
];

export const OAuthProviders = providers.map((provider) => {
  if (typeof provider !== 'function') return {
    name: provider.name,
    id: provider.id
  };

  const providerData = provider();
  
  return {
    name: providerData.name,
    id: providerData.id
  };
}).filter((provider) => provider.id !== 'credentials') as Array<OAuthProvider>;

const callbacks: NextAuthConfig['callbacks'] = {
  async jwt({ token, user, trigger, session }) {
    // When session is updated.
    if (trigger === 'update') {
      console.log('Session update triggered with session --> ', session);
      token.user = {
        ...token.user,
        ...session.user
      };
    }
    
    // First time of sign in
    if (user) {
      console.log('User data received in JWT callback --> ', user);
      const decodedToken = decodeJwt(user.access_token as string);
      token.refresh_token = user.refresh_token;
      token.serverTokenExp = decodedToken.exp;
      token.access_token = user.access_token;
      token.user = user;
    }

    // Flag the token as expired if server token has expired
    if (Date.now() > (token.serverTokenExp as number) * 1000) {
      return null;
    }

    return token;
  },
  async session({ session, token }) {
    return {
      ...session,
      refresh_token: token.refresh_token,
      access_token: token.access_token,
      user: token.user ?? session.user
    };
  },
  async signIn({ user, account }) {
    if (account?.provider === 'google') {
      const { success, code, data } = await Fetch({
        body: { token: account.id_token },
        path: `/users/login`,
        isSecure: false,
        method: 'POST'
      });

      if (!success) {
        console.log('Google authentication failed with response code --> ', code);
        if (code === 'conflicting_provider') throw new ConflictingProviderError();
        if (code === 'email_not_verified') throw new UnverifiedAccountError();
        if (code === 'account_inactive') throw new DeactivatedAccountError();
        throw new OAuthSignInError();
      }

      console.log('Google authentication successful --> ', data.user);

      user.refresh_token = data?.token?.refresh_token;
      user.access_token = data?.token?.access_token;
      user.email = data?.user?.email;
      user.auth_provider = 'google';
      user.name = data?.user?.name;
      user.id = data?.user?.id;
    }

    return true;
  }
};

const pages = {
  signOut: '/auth/sign-out',
  signIn: '/auth',
  error: '/auth'
};

export const { handlers, signOut, signIn, auth } = NextAuth({
  useSecureCookies: inProduction,
  session: { strategy: 'jwt' },
  callbacks,
  providers,
  pages
});
