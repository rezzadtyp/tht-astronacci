'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const AuthGuard = (Component: any) => {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);
    const session = useSession();
    const id = session.data?.user.id;

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      if (!id && !isLoading) {
        redirect('/login');
      }
    }, [id, isLoading]);

    if (isLoading || !id) {
      return (
        <h1 className="container flex h-screen justify-center px-4 text-4xl pt-24 font-extrabold">
          Loading...
        </h1>
      );
    }

    return <Component {...props} />;
  };
};

export default AuthGuard;
