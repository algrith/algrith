import Account from '@/components/dashboard/account';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account - Dashboard',
};

const Page = () => (
  <Account />
);

export default Page;