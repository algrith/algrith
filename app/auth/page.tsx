import Auth from '@/components/auth';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

const Page = () => (
  <Auth authType="signIn" />
);

export default Page;