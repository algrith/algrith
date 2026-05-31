import Order from '@/components/dashboard/order';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order - Dashboard',
};

const Page = () => (
  <Order />
);

export default Page;