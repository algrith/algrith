import Auth from '@/components/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

const Page = () => (
  <Auth authType="forgotPassword" />
);

export default Page;