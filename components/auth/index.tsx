'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { resendVerificationEmail, sendPasswordResetEmail, resetPassword, signIn, signUp, verifyEmail } from './slices';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import PasswordRequirements from './password-requirement';
import { Input, Password } from '../shared/input';
import { Spinner } from '../shared/icon/spinner';
import { OAuthProviders } from '@/libs/auth';
import { useRouter } from 'next/navigation';
import { updateAuthModel } from './reducer';
import OAuthButton from './oauth-button';
import Link from '../shared/button/link';
import { AuthWrapper } from './styled';
import Button from '../shared/button';
import useRoute from '@/hooks/route';
import { AuthTypes } from '@/types';

const Auth = ({ authType }: { authType: AuthTypes }) => {
  const { isVerifying, isLoading, model } = useAppSelector((state) => state.auth);
  const { data: session, status } = useSession();
  const [error, setError] = useState('');
  const { searchParams } = useRoute();
  const dispatch = useAppDispatch();
  const token = searchParams.get('token') || '';
  const router = useRouter();

  const buttonText = {
    resendVerification: 'Resend Email',
    emailVerification: 'Verify Email',
    passwordReset: 'Reset Password',
    forgotPassword: 'Send Email',
    signUp: 'Sign Up',
    signIn: 'Sign In'
  }[authType];

  const title = {
    resendVerification: 'Resend Verification Email',
    emailVerification: 'Email Verification',
    forgotPassword: 'Forgot Password',
    passwordReset: 'Password Reset',
    signUp: 'Sign Up',
    signIn: 'Sign In'
  }[authType];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id: prop } = e.target;
    dispatch(updateAuthModel({
      [prop]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (authType === 'resendVerification') return dispatch(resendVerificationEmail());
    if (authType === 'forgotPassword') return dispatch(sendPasswordResetEmail());
    if (authType === 'passwordReset') return dispatch(resetPassword(token));
    if (authType === 'signIn') return dispatch(signIn('credentials'));
    if (authType === 'signUp') return dispatch(signUp());
  };

  const handleVerification = async () => {
    if (authType !== 'emailVerification' || !token) return;
    const message = await dispatch(verifyEmail(token));
    setError(message);
  };
  
  useEffect(() => {
    if (status === 'authenticated' && session.user) {
      const intendedRoute = localStorage.lastVisitedRoute ?? '/';
      localStorage.removeItem('lastVisitedRoute');
      console.log('Removed intended route.');
      router.replace(intendedRoute);
    }
  }, [session, status]);

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <AuthWrapper>
      {authType === 'emailVerification' ? (
        <div className="content verifying">
          <h1>{title}</h1>

          {isVerifying ? (
            <>
              Verifying email address...
              <Spinner />
            </>
          ) : !error ? (
            <>
              <p>Account verified.</p>
              <span>
                You can now <Link href="/auth">login</Link>.
              </span>
            </>
          ) : (
            <>
              <span className="error">{error}</span>
              <Link href="/auth/resend-verification">Restart verification</Link>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="content">
          <h1>{title}</h1>

          <div className="fields">
            {authType === 'signUp' && (
              <Input
                onChange={handleChange}
                placeholder="John Doe"
                value={model.name}
                label="Full Name"
                id="name"
                required
              />
            )}
            
            {authType !== 'passwordReset' && (
              <Input
                placeholder="johndoe@email.com"
                onChange={handleChange}
                label="Email Address"
                value={model.email}
                type="email"
                id="email"
                required
              />
            )}
            
            {(authType !== 'forgotPassword' && authType !== 'resendVerification') && (
              <Password
                helpText={authType === 'signIn' && <Link href="/auth/forgot-password">Forgot password</Link>}
                onChange={handleChange}
                placeholder="********"
                value={model.password}
                label="Password"
                id="password"
                required
              />
            )}

            {authType === 'passwordReset' && (
              <Password
                value={model.confirm_password}
                label="Confirm Password"
                onChange={handleChange}
                placeholder="********"
                id="confirm_password"
                required
              />
            )}
            
            {(authType === 'passwordReset' || authType === 'signUp') && (
              <PasswordRequirements password={model.password} />
            )}
          </div>

          <div className="footer">
            <Button
              loading={isLoading}
              htmlType="submit"
              type="primary"
              block
            >
              {buttonText}
            </Button>

            {OAuthProviders.map((provider) => (
              <OAuthButton
                isLoading={status === 'loading'}
                name={provider.name}
                authType={authType}
                key={provider.id}
                id={provider.id}
              />
            ))}

            <span>
              {authType === 'signIn' ? (
                <>
                  Don't have an account? <Link href="/auth/sign-up">Sign up</Link>.
                </>
              ) : (
                <>
                  Already have an account? <Link href="/auth">Sign in</Link>.
                </>
              )}
            </span>
          </div>
        </form>
      )}
    </AuthWrapper>
  );
};

export default Auth;