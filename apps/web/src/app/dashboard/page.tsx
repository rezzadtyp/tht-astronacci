'use client';

import AuthGuard from '@/hoc/AuthGuard';

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default AuthGuard(Dashboard);
