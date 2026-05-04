import { signIn as NextAuthSignIn, SignInOptions, SignInResponse } from 'next-auth/react';
import { ProviderId } from 'next-auth/providers';

import { showFeedback } from '@/components/shared/feedback/reducer';
import { setIsLoading, setIsVerifying } from './reducer';
import { AppDispatch, store } from '@/store';
import { getMessage } from '@/libs/messages';
import { Fetch } from '@/utils/api';

export const signIn = (provider: ProviderId) => async (dispatch: AppDispatch) => {
  const isCredentialsLogin = provider === 'credentials';
  const { model } = store.getState().auth;
  dispatch(setIsLoading(true));

  const options = { ...model, redirect: !isCredentialsLogin, redirectTo: '/auth' };
  
  const response: SignInResponse = await NextAuthSignIn(
    provider, options as SignInOptions<false>
  );

  if (!isCredentialsLogin) return;
  dispatch(setIsLoading(false));

  const message = getMessage(response.code ?? 'signin_successful');
  const success = !!response?.ok && !response?.error;

  dispatch(showFeedback({
    type: !success ? 'error' : 'success',
    feedbackType: 'alert',
    message
  }));
};

export const resetPassword = (token: string) => async (dispatch: AppDispatch) => {
  const { model } = store.getState().auth;
  dispatch(setIsLoading(true));

  const { success, code } = await Fetch({
    path: `/users/password-reset`,
    isSecure: false,
    method: 'POST',
    body: {
      confirm_password: model.confirm_password,
      password: model.password,
      token
    }
  });

  const message = getMessage(code);

  dispatch(
    showFeedback({
      type: success ? 'success' : 'error',
      feedbackType: 'alert',
      message
    })
  );

  dispatch(setIsLoading(false));
  return success;
};

export const verifyEmail = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsVerifying(true));

  const { success, code } = await Fetch({
    path: `/users/verify`,
    isSecure: false,
    body: { token },
    method: 'POST',
  });

  const message = getMessage(code);

  dispatch(
    showFeedback({
      type: success ? 'success' : 'error',
      feedbackType: 'alert',
      duration: 100,
      message
    })
  );

  dispatch(setIsVerifying(false));

  return !success ? message : '';
};

export const resendVerificationEmail = () => async (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true));

  const { model } = store.getState().auth;

  const { success, code } = await Fetch({
    path: `/users/verify/send-email`,
    body: { email: model.email },
    isSecure: false,
    method: 'POST'
  });

  const message = getMessage(code);

  dispatch(
    showFeedback({
      type: success ? 'success' : 'error',
      feedbackType: 'alert',
      message
    })
  );

  return success;
};

export const sendPasswordResetEmail = () => async (dispatch: AppDispatch) => {
  const { model } = store.getState().auth;
  dispatch(setIsLoading(true));
  
  const { success, code } = await Fetch({
    path: `/users/password-reset/send-email`,
    body: { email: model.email },
    isSecure: false,
    method: 'POST'
  });

  const message = getMessage(code);

  dispatch(
    showFeedback({
      type: success ? 'success' : 'error',
      feedbackType: 'alert',
      message
    })
  );
  
  dispatch(setIsLoading(false));
  return success;
};

export const signUp = () => async (dispatch: AppDispatch) => {
  const { model } = store.getState().auth;
  dispatch(setIsLoading(true));

  const { success, code } = await Fetch({
    path: '/users/register',
    isSecure: false,
    method: 'POST',
    body: {
      password: model.password,
      email: model.email,
      name: model.name
    }
  });
  
  const message = getMessage(code);

  dispatch(
    showFeedback({
      type: success ? 'success' : 'error',
      feedbackType: 'alert',
      duration: 100,
      message
    })
  );

  dispatch(setIsLoading(false));
  return success;
};