'use client';

import { useAppSelector } from '@/store/hooks';
import User from './user';

const Account = () => {
  const { profile: { data: authUser } } = useAppSelector((state) => state.dashboard);
  return <User id={authUser?.id as string} />;
};

export default Account;