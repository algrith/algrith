import Auth from '@/components/auth';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const Page = () => (
  <Auth authType="signUp" />
);

export default Page;