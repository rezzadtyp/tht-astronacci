'use client';

import AuthGuardTeacher from '@/hoc/AuthGuardTeacher';

const DashboardTeacher = () => {
  return <div>Dashboard teacher</div>;
};

export default AuthGuardTeacher(DashboardTeacher);
