'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const userRole = session?.user?.role;

    if (userRole === 'TEACHER') {
      router.push('/dashboard/teacher');
    } else {
      router.push('/dashboard/user');
    }
  }, [router, session]);

  return <div>Loading...</div>;
};

export default Dashboard;
