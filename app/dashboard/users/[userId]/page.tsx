import User from '@/components/dashboard/user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User - Dashboard',
};

const Page = async ({ params }: { params: Promise<{ userId: string; }> }) => {
  const { userId } = await params;
  return <User id={userId} />
};

export default Page;