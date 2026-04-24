import Pricing from '@/components/pricing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
};

const Page = () => (
  <Pricing />
);

export default Page;