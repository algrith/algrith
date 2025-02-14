import RefundPolicy from '@/components/refund-policy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy',
};

const Page = () => (
  <RefundPolicy />
);

export default Page;