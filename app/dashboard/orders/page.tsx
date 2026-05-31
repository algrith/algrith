import Orders from '@/components/dashboard/orders';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders - Dashboard',
};

const Page = () => (
  <Orders />
);

export default Page;