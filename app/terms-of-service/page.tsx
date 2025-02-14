import TermsOfService from '@/components/terms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

const Page = () => (
  <TermsOfService />
);

export default Page;