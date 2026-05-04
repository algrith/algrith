import Auth from '@/components/auth';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resend Verification Email',
};

const Page = () => (
  <Auth authType="resendVerification" />
);

export default Page;