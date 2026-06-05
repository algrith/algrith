import Users from '@/components/dashboard/users';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users - Dashboard',
};

const Page = () => (
  <Users />
);

export default Page;