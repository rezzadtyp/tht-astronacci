'use client';

import AuthGuardUser from '@/hoc/AuthGuardUser';

const DashboardUser = () => {
  return <div>Dashboard User</div>;
};

export default AuthGuardUser(DashboardUser);
