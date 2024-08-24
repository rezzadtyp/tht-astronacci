'use client';

import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DashboardHeader = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full py-2 bg-white">
      <div className="container px-0 mx-auto">
        <div className="flex items-center justify-between py-2">
          <h1
            className="cursor-pointer text-xl pl-2 font-bold"
            onClick={() => router.push('/')}
          >
            Skill Up
          </h1>

          <div className="flex cursor-pointer items-center gap-8">
            {session.data?.user.id ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/profile">{session.data.user.name}</Link>
                <h3 onClick={() => signOut()}>Logout</h3>
              </>
            ) : (
              <>
                <Button variant="default" className="rounded-full px-6">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
