'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const session = useSession();

  const userRole = session.data?.user.role;
  console.log(userRole)

  if (userRole === 'TEACHER') {
    router.push('/dashboard/teacher');
  } else {
    router.push('/dashboard/user');
  }
  
  return <div>Loading...</div>;
};

export default Dashboard;
