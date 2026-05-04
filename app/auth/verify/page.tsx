import Auth from '@/components/auth';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Email',
};

const Page = () => (
  <Auth authType="emailVerification" />
);

export default Page;