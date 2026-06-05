'use client';

import { useSession } from 'next-auth/react';
import User from './user';

const Account = () => {
  const { data: session } = useSession();
  return <User id={session?.user.id as string} />;
};

export default Account;