const messages: Record<string, string> = {
  conflicting_provider: 'An account with this email already exists. Please login with your password.',
  signup_successful: 'Sign up successful! A verification email has been sent to you inbox.',
  account_inactive: 'This account has been deactivated. Contact support.',
  email_not_verified: 'Please verify your account before signing in.',
  verification_failed: 'OAuth verification failed. Please try again.',
  invalid_input: 'Invalid inputs provided. Check and try again.',
  invalid_credentials: 'Invalid email or password provided.',
  password_reset_successful: 'Password reset successfully!',
  invalid_token: 'Invalid token provided. Please restart',
  password_reset_email_sent: 'Password reset link sent!',
  account_already_verified: 'Account already verified!',
  default: 'Something went wrong. Please try again.',
  token_expired: 'Expired token provided. Try again',
  account_verified: 'Account verified successfully!',
  account_already_exists: 'Account already exists!',
  verification_resent: 'Verification email resent',
  password_mismatch: 'Passwords do not match',
  missing_token: 'Token missing in payload.',
  signin_successful: 'Login successful!',
  user_not_found: 'User not found.'
};

export const getMessage = (key: string) => {
  return messages[key] ?? 'Unknown error';
};