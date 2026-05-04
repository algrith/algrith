import Auth from '@/components/auth';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Reset',
};

const Page = () => (
  <Auth authType="passwordReset" />
);

export default Page;