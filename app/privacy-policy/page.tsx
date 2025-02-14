import PrivacyPolicy from '@/components/privacy-policy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

const Page = () => (
  <PrivacyPolicy />
);

export default Page;